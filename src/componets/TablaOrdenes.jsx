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
      const url = `${import.meta.env.VITE_BACKEND_URL}/ordenes`;
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
        }/cliente/eliminar/${id}`;
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const data = {
          salida: new Date().toString(),
        };
        await axios.delete(url, { headers, data });
        listarOrdenes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Filtrar ordenes según el estado
  const ordenesMantenimiento = ordenes.filter(
    (orden) => orden.servicio === "Mantenimiento"
  );
  const ordenesReparacion = ordenes.filter(
    (orden) => orden.servicio === "Reparación"
  );
  const ordenesRevision = ordenes.filter(
    (orden) => orden.servicio === "Revisión"
  );
  const ordenesFinalizado = ordenes.filter(
    (orden) => orden.servicio === "Finalizado"
  );

  return (
    <>
      {ordenesMantenimiento.length === 0 &&
      ordenesReparacion.length === 0 &&
      ordenesRevision.length === 0 &&
      ordenesFinalizado.length === 0 ? (
        <Mensaje tipo={"active"}>{"No existen órdenes registradas"}</Mensaje>
      ) : (
        <div className="flex flex-col">
          {/* Sección de Mantenimiento */}
          {ordenesMantenimiento.length > 0 && (
            <div>
              <h2 className="poppins-semibold">Mantenimiento</h2>
              <table className="w-full mt-3 table-auto shadow-lg bg-white rounded-xl">
                {/* Table Header */}
                <thead className="bg-[#3D53A0] text-white">
                  <tr className="poppins-regular">
                    {/* Ajusta las columnas según tus necesidades */}
                    <th className="p-2">N° Orden</th>
                    <th className="p-2">Cliente</th>
                    <th className="p-2">Cedula</th>
                    <th className="p-2">Equipo</th>
                    <th className="p-2">Fecha Ingreso</th>
                    <th className="p-2">Fecha Salida</th>
                    <th className="p-2">Estado</th>
                    <th className="p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Render rows for clientesMantenimiento */}
                  {clientesMantenimiento.map((cliente, index) => (
                    <tr
                      className="poppins-regular border-b hover:bg-gray-300 text-center"
                      key={orden._id}
                    >
                      {/* Ajusta las celdas según tus necesidades */}
                      <td>{index + 1}</td> {/* numero orden */}
                      <td>{index + 1}</td> {/* cliente nombre */}
                      <td>{index + 1}</td> {/* cliente cedula */}
                      <td>{orden.equipo}</td>
                      <td>{orden.ingreso}</td>
                      <td>{orden.salida}</td>
                      <td>{cliente.estado}</td>
                      {/* <td>
                        <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                          {cliente.estado}
                        </span>
                      </td> */}
                      <td className="py-2 text-center">
                        {/* Ajusta las acciones según tus necesidades */}
                        <MdVisibility
                          className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                          onClick={() =>
                            navigate(`/dashboard/visualizar/${cliente._id}`)
                          }
                        />
                        {auth.rol === "tecnico" && (
                          <>
                            <MdUpdate
                              className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                              onClick={() =>
                                navigate(`/dashboard/actualizar/${cliente._id}`)
                              }
                            />
                            <MdDeleteForever
                              className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                              onClick={() => {
                                handleDelete(cliente._id);
                              }}
                            />
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <hr className="mt-4 border-black" />
          {/* Agrega las secciones para Reparación, Revisión y Finalizado de manera similar */}
        </div>
      )}
    </>
  );
};

export default TablaOrdenes;
