import { MdDeleteForever, MdVisibility, MdUpdate } from "react-icons/md";
import axios from "axios";
import Mensaje from "./Alertas/Mensaje";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";

const TablaOrdenes = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);

  const listarClientes = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/clientes`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.get(url, options);
      setClientes(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarClientes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmar = window.confirm(
        "Vas a eliminar a un clientes ¿Estás seguro de realizar esta acción?"
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
        listarClientes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Filtrar clientes según el estado
  const clientesMantenimiento = clientes.filter((cliente) => cliente.estado === "Mantenimiento");
  const clientesReparacion = clientes.filter((cliente) => cliente.estado === "Reparación");
  const clientesRevision = clientes.filter((cliente) => cliente.estado === "Revisión");
  const clientesFinalizado = clientes.filter((cliente) => cliente.estado === "Finalizado");

  return (
    <>
      {(clientesMantenimiento.length === 0 && clientesReparacion.length === 0 && clientesRevision.length === 0 && clientesFinalizado.length === 0) ? (
        <Mensaje tipo={"active"}>{"No existen clientes registrados"}</Mensaje>
      ) : (
        <div className="flex flex-col">
          {/* Sección de Mantenimiento */}
          {clientesMantenimiento.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Clientes en Mantenimiento</h2>
              <table className="w-full mt-5 table-auto shadow-lg bg-white">
                {/* Table Header */}
                <thead className="bg-gray-800 text-slate-400">
                  <tr>
                    {/* Ajusta las columnas según tus necesidades */}
                    <th className="p-2">N°</th>
                    <th className="p-2">Cliente</th>
                    <th className="p-2">Cedula</th>
                    <th className="p-2">Equipo</th>
                    <th className="p-2">Fecha Ingreso</th>
                    <th className="p-2">Servicio</th>
                    <th className="p-2">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Render rows for clientesMantenimiento */}
                  {clientesMantenimiento.map((cliente, index) => (
                    <tr className="border-b hover:bg-gray-300 text-center" key={cliente._id}>
                      {/* Ajusta las celdas según tus necesidades */}
                      <td>{index + 1}</td>
                      <td>{cliente.nombre}</td>
                      <td>{cliente.email}</td>
                      <td>{cliente.celular}</td>
                      <td>{cliente.cedula}</td>
                      <td>
                        <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                          {cliente.frecuente ? "Sí" : "No"}
                        </span>
                      </td>
                      <td>{cliente.direccion}</td>
                      <td className="py-2 text-center">
                        {/* Ajusta las acciones según tus necesidades */}
                        <MdVisibility
                          className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                          onClick={() => navigate(`/dashboard/visualizar/${cliente._id}`)}
                        />
                        {auth.rol === "tecnico" && (
                          <>
                            <MdUpdate
                              className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                              onClick={() => navigate(`/dashboard/actualizar/${cliente._id}`)}
                            />
                            <MdDeleteForever
                              className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                              onClick={() => { handleDelete(cliente._id); }}
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

          {/* Agrega las secciones para Reparación, Revisión y Finalizado de manera similar */}
        </div>
      )}
    </>
  );
};

export default TablaOrdenes;
