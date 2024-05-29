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
    (orden) => orden.servicio === "mantenimiento"
  );
  const ordenesReparacion = ordenes.filter(
    (orden) => orden.servicio === "reparación"
  );
  const ordenesRevision = ordenes.filter(
    (orden) => orden.servicio === "revisión"
  );
  const ordenesFinalizado = ordenes.filter(
    (orden) => orden.estado === "finalizado"
  );

  return (
    <>
      <div className="flex flex-col">
        {/* Sección de Mantenimiento */}
        {ordenesMantenimiento.length > 0 ? (
          <div>
            <h2 className="poppins-semibold">Mantenimiento</h2>
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
                  <th className="p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ordenesMantenimiento.map((orden) => (
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
                    <td className="py-2 text-center">
                      <MdVisibility
                        className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                        onClick={() =>
                          navigate(`/dashboard/visualizar/${orden._id}`)
                        }
                      />
                      {auth.rol === "tecnico" && (
                        <>
                          <MdUpdate
                            className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                            onClick={() =>
                              navigate(`/dashboard/actualizar/${orden._id}`)
                            }
                          />
                          <MdDeleteForever
                            className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                            onClick={() => {
                              handleDelete(orden._id);
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
        ) : (
          <Mensaje tipo={"active"}>
            {"No existen órdenes de mantenimiento registradas"}
          </Mensaje>
        )}

        {/* Sección de Reparación */}
        <hr className="mt-4 border-black" />
        {ordenesReparacion.length > 0 ? (
          <div>
            <h2 className="poppins-semibold">Reparación</h2>
            <table className="w-full mt-3 table-auto shadow-lg bg-white rounded-xl">
              <thead className="bg-[#3D53A0] text-white">
                <tr className="poppins-regular">
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
                {ordenesReparacion.map((orden) => (
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
                    <td className="py-2 text-center">
                      <MdVisibility
                        className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                        onClick={() =>
                          navigate(`/dashboard/visualizar/${orden._id}`)
                        }
                      />
                      {auth.rol === "tecnico" && (
                        <>
                          <MdUpdate
                            className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                            onClick={() =>
                              navigate(`/dashboard/actualizar/${orden._id}`)
                            }
                          />
                          <MdDeleteForever
                            className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                            onClick={() => {
                              handleDelete(orden._id);
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
        ) : (
          <Mensaje tipo={"active"}>
            {"No existen órdenes de reparación registradas"}
          </Mensaje>
        )}

        {/* Sección de Revisión */}
        <hr className="mt-4 border-black" />
        {ordenesRevision.length > 0 ? (
          <div>
            <h2 className="poppins-semibold">Revisión</h2>
            <table className="w-full mt-3 table-auto shadow-lg bg-white rounded-xl">
              <thead className="bg-[#3D53A0] text-white">
                <tr className="poppins-regular">
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
                {ordenesRevision.map((orden) => (
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
                    <td className="py-2 text-center">
                      <MdVisibility
                        className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                        onClick={() =>
                          navigate(`/dashboard/visualizar/${orden._id}`)
                        }
                      />
                      {auth.rol === "tecnico" && (
                        <>
                          <MdUpdate
                            className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                            onClick={() =>
                              navigate(`/dashboard/actualizar/${orden._id}`)
                            }
                          />
                          <MdDeleteForever
                            className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                            onClick={() => {
                              handleDelete(orden._id);
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
        ) : (
          <Mensaje tipo={"active"}>
            {"No existen órdenes de revisión registradas"}
          </Mensaje>
        )}

        {/* Sección de Órdenes Finalizadas */}
        <hr className="mt-4 border-black" />
        {ordenesFinalizado.length > 0 ? (
          <div>
            <h2 className="poppins-semibold">Finalizado</h2>
            <table className="w-full mt-3 table-auto shadow-lg bg-white rounded-xl">
              <thead className="bg-[#3D53A0] text-white">
                <tr className="poppins-regular">
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
                {ordenesFinalizado.map((orden) => (
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
                    <td className="py-2 text-center">
                      <MdVisibility
                        className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                        onClick={() =>
                          navigate(`/dashboard/visualizar/${orden._id}`)
                        }
                      />
                      {auth.rol === "tecnico" && (
                        <>
                          <MdUpdate
                            className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                            onClick={() =>
                              navigate(`/dashboard/actualizar/${orden._id}`)
                            }
                          />
                          <MdDeleteForever
                            className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                            onClick={() => {
                              handleDelete(orden._id);
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
        ) : (
          <Mensaje tipo={"active"}>
            {"No existen órdenes finalizadas registradas"}
          </Mensaje>
        )}
      </div>
    </>
  );
};

export default TablaOrdenes;
