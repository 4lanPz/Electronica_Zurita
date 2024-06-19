import { AiOutlineFileText, AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import Mensaje from "./Alertas/Mensaje";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";

const Tabla = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [mensaje, setMensaje] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.cedula && cliente.cedula.toString().includes(searchTerm)
  );
  
  const cleanAddress = (address) => {
    const suffix= ", Ecuador";
    return address.endsWith(suffix) ? address.slice(0, -suffix.length) : address;
  };

  const TablaClientes = ({ titulo, data }) => (
    <div>
      <h2 className="poppins-semibold">{titulo}</h2>
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
          {data.map((cliente, index) => (
            <tr
              className="poppins-regular border-b hover:bg-gray-300 text-center"
              key={cliente._id}
            >
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{cliente.nombre}</td>
              <td className="p-2">{cliente.correo}</td>
              <td className="p-2">{cliente.telefono}</td>
              <td className="p-2">{cliente.cedula}</td>
              <td className="p-2">{cleanAddress(cliente.direccion)}</td>
              <td className="py-2 text-center">
                <>
                  <AiOutlineFileText
                    className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                    onClick={() =>
                      navigate(`/dashboard/actualizar/${cliente._id}`)
                    }
                  />
                  <AiOutlineDelete
                    className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                    onClick={() => handleDelete(cliente._id)}
                  />
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const clientesFrecuentes = filteredClientes.filter(
    (cliente) => cliente.frecuente
  );
  const clientesNoFrecuentes = filteredClientes.filter(
    (cliente) => !cliente.frecuente
  );

  return (
    <>
      <div className="flex flex-col mb-5">
        <div className="flex justify-between items-center ">
          <div className="poppins-regular flex items-center w-full">
            <input
              type="text"
              placeholder="Buscar por cédula"
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 border border-black bg-[#5B72C3] placeholder:text-white text-white rounded-xl w-2/3"
            />
          </div>
          <div className="poppins-regular flex space-x-4 items-center">
            <div className="flex items-center space-x-2">
              <AiOutlineFileText className="h-6 w-6 text-slate-800" />
              <span>Actualizar</span>
            </div>
            <div className="flex items-center space-x-2">
              <AiOutlineDelete className="h-6 w-6 text-red-900" />
              <span>Finalizar</span>
            </div>
          </div>
        </div>
      </div>
      {clientesFrecuentes.length === 0 && clientesNoFrecuentes.length === 0 ? (
        <Mensaje tipo={"active"}>{"No existen clientes registrados"}</Mensaje>
      ) : (
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <h2 className="poppins-semibold">Clientes Frecuentes</h2>
          </div>
          {clientesFrecuentes.length > 0 && (
            <TablaClientes titulo="" data={clientesFrecuentes} />
          )}
          <hr className="mt-4 border-black" />
          {clientesNoFrecuentes.length > 0 && (
            <TablaClientes
              titulo="Clientes no Frecuentes"
              data={clientesNoFrecuentes}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Tabla;
