import { MdDeleteForever, MdVisibility, MdUpdate } from "react-icons/md";
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

  return (
    <>
      {clientes.length == 0 ? (
        <Mensaje tipo={"active"}>{"No existen clientes registrados"}</Mensaje>
      ) : (
        <table className="w-full mt-5 table-auto shadow-lg  bg-white">
          <thead className="bg-gray-800 text-slate-400">
            <tr>
              <th className="p-2">N°</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Email</th>
              <th className="p-2">Celular</th>
              <th className="p-2">Cédula</th>
              <th className="p-2">Frecuente</th>
              <th className="p-2">Dirección</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente, index) => (
              <tr
                className="border-b hover:bg-gray-300 text-center"
                key={cliente._id}
              >
                <td>{index + 1}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.correo}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.cedula}</td>
                <td>
                  <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    {cliente.frecuente ? "Sí" : "No"}
                  </span>
                </td>
                <td>{cliente.direccion}</td>
                <td className="py-2 text-center">
                  <MdVisibility
                    className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                    onClick={() =>
                      navigate(`/dashboard/visualizar/${cliente._id}`)
                    }
                  />
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
      )}
    </>
  );
};

export default Tabla;
