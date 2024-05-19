import { MdDeleteForever, MdUpdate } from "react-icons/md";
import axios from "axios";
import Mensaje from "./Alertas/Mensaje";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";

const Tabla = () => {
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
        "Vas a eliminar a un cliente. ¿Estás seguro de realizar esta acción?"
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
        await axios.delete(url, { headers });
        listarClientes();
      }
    } catch (error) {
      setMensaje({
        respuesta: error.response.data?.errors[0].msg,
        tipo: false,
      });
    }
  };

  const clientesFrecuentes = clientes.filter((cliente) => cliente.frecuente);
  const clientesNoFrecuentes = clientes.filter((cliente) => !cliente.frecuente);

  return (
    <>
      {clientesFrecuentes.length === 0 && clientesNoFrecuentes.length === 0 ? (
        <Mensaje tipo={"active"}>{"No existen clientes registrados"}</Mensaje>
      ) : (
        <div className="flex flex-col">
          {clientesFrecuentes.length > 0 && (
            <div>
              <h2 className="poppins-semibold">Clientes Frecuentes</h2>
              <table className="w-full mt-3 table-auto shadow-lg bg-white rounded-xl">
                <thead className="bg-[#3D53A0] text-white">
                  <tr className="poppins-regular">
                    <th className="p-2">N°</th>
                    <th className="p-2">Nombre</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Celular</th>
                    <th className="p-2">Cédula</th>
                    <th className="p-2">Dirección</th>
                    <th className="p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clientesFrecuentes.map((cliente, index) => (
                    <tr
                      className="poppins-regular border-b hover:bg-gray-300 text-center"
                      key={cliente._id}
                    >
                      <td>{index + 1}</td>
                      <td>{cliente.nombre}</td>
                      <td>{cliente.correo}</td>
                      <td>{cliente.telefono}</td>
                      <td>{cliente.cedula}</td>

                      <td>{cliente.direccion}</td>
                      <td className="py-2 text-center">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <hr className="mt-4 border-black" />
          {clientesNoFrecuentes.length > 0 && (
            <div>
              <h2 className="poppins-semibold mt-2">Clientes no Frecuentes</h2>
              <table className="w-full mt-3 table-auto shadow-lg bg-white rounded-xl">
                <thead className="bg-[#3D53A0] text-white">
                  <tr className="poppins-regular">
                    <th className="p-2">N°</th>
                    <th className="p-2">Nombre</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Celular</th>
                    <th className="p-2">Cédula</th>
                    <th className="p-2">Dirección</th>
                    <th className="p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clientesNoFrecuentes.map((cliente, index) => (
                    <tr
                      className="poppins-regular border-b hover:bg-gray-300 text-center"
                      key={cliente._id}
                    >
                      <td>{index + 1}</td>
                      <td>{cliente.nombre}</td>
                      <td>{cliente.correo}</td>
                      <td>{cliente.telefono}</td>
                      <td>{cliente.cedula}</td>
                      <td>{cliente.direccion}</td>
                      <td className="py-2 text-center">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Tabla;
