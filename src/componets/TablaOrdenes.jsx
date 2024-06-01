import { MdDeleteForever, MdVisibility, MdUpdate } from "react-icons/md";
import axios from "axios";
import Mensaje from "./Alertas/Mensaje";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";

const TablaOrdenes = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ordenes, setOrdenes] = useState([]);

  const listarOrdenes = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/ordenes/listar`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.get(url, options);
      setOrdenes(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarOrdenes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmar = window.confirm(
        "Vas a finalizar la orden ¿Estás seguro de realizar esta acción?"
      );
      if (confirmar) {
        const token = localStorage.getItem("token");
        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/ordenes/finalizar/${id}`;
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const data = {
          id,
        };
        await axios.put(url, data, { headers });
        listarOrdenes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Tabla = ({ titulo, data }) => (
    <div>
      <h2 className="poppins-semibold">{titulo}</h2>
      <table className="w-full mt-3 table-auto shadow-lg bg-white rounded-xl">
        {/* Table Header */}
        <thead className="bg-[#3D53A0] text-white">
          <tr className="poppins-regular">
            <th className="p-2">N° Orden</th>
            <th className="p-2">Cliente</th>
            <th className="p-2">Cedula</th>
            <th className="p-2">Equipo</th>
            <th className="p-2">Fecha Ingreso</th>
            <th className="p-2">Fecha Salida</th>
            <th className="p-2">Estado</th>
            {titulo !== "Finalizado" && <th className="p-2">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((orden) => (
            <tr
              className="poppins-regular border-b hover:bg-gray-300 text-center"
              key={orden._id}
            >
              <td>{orden.numOrden}</td>
              <td>{orden.cliente?.nombre}</td>
              <td>{orden.cliente?.cedula}</td>
              <td>{orden.equipo}</td>
              <td>{new Date(orden.ingreso).toLocaleDateString()}</td>
              <td>
                {orden.salida
                  ? new Date(orden.salida).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>{orden.estado}</td>
              {titulo !== "Finalizado" && (
                <td className="py-2 text-center">
                  {titulo === "Reparación" ? (
                    <MdVisibility
                      className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                      onClick={() =>
                        navigate(`/dashboard/visualizar/${orden._id}`)
                      }
                    />
                  ) : (
                    <MdVisibility
                      className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                      onClick={() =>
                        navigate(`/dashboard/actualizarorden/${orden._id}`)
                      }
                    />
                  )}
                  <MdDeleteForever
                    className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                    onClick={() => {
                      handleDelete(orden._id);
                    }}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const ordenesMantenimiento = ordenes.filter(
    (orden) =>
      orden.servicio === "Mantenimiento" && orden.estado !== "Finalizado"
  );
  const ordenesReparacion = ordenes.filter(
    (orden) => orden.servicio === "Reparación" && orden.estado !== "Finalizado"
  );
  const ordenesRevision = ordenes.filter(
    (orden) => orden.servicio === "Revisión" && orden.estado !== "Finalizado"
  );
  const ordenesFinalizado = ordenes.filter(
    (orden) => orden.estado === "Finalizado"
  );

  return (
    <div className="flex flex-col">
      <Tabla titulo="Mantenimiento" data={ordenesMantenimiento} />
      <hr className="mt-4 border-black" />
      <Tabla titulo="Reparación" data={ordenesReparacion} />
      <hr className="mt-4 border-black" />
      <Tabla titulo="Revisión" data={ordenesRevision} />
      <hr className="mt-4 border-black" />
      <Tabla titulo="Finalizado" data={ordenesFinalizado} />
    </div>
  );
};

export default TablaOrdenes;
