import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  AiOutlineFileText,
  AiOutlineDelete,
  AiOutlineEye,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import ModalVerCliente from "../Modals/ModalVerCliente";
import BorrarCliente from "../Modals/BorrarCliente";
import Mensaje from "../Alertas/Mensaje";

const Tabla = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [clienteModalVisible, setClienteModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
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
    setSelectedCliente(clientes.find((cliente) => cliente._id === id));
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/cliente/eliminar/${
        selectedCliente._id
      }`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(url, { headers });
      listarClientes();
      setDeleteModalVisible(false);
      setSelectedCliente(null);
    } catch (error) {
      setMensaje({
        respuesta: error.response.data.msg,
        tipo: false,
      });
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    const onlyNums = value.replace(/[^0-9]/g, "");
    setSearchTerm(onlyNums);
  };

  const cleanAddress = (address) => {
    const suffix = ", Ecuador";
    return address.endsWith(suffix)
      ? address.slice(0, -suffix.length)
      : address;
  };

  const handleOpenClienteModal = (cliente) => {
    setSelectedCliente(cliente);
    setClienteModalVisible(true);
  };

  const handleCloseClienteModal = () => {
    setSelectedCliente(null);
    setClienteModalVisible(false);
  };

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.cedula && cliente.cedula.toString().includes(searchTerm)
  );

  const TablaClientes = ({ titulo, data }) => (
    <div>
      <h2 className="poppins-semibold">{titulo}</h2>
      <div className="hidden sm:block">
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
                  <AiOutlineFileText
                    className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                    onClick={() =>
                      navigate(`/dashboard/actualizarCliente/${cliente._id}`)
                    }
                  />
                  <AiOutlineEye
                    className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                    onClick={() => handleOpenClienteModal(cliente)}
                  />
                  <AiOutlineDelete
                    className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                    onClick={() => handleDelete(cliente._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="block sm:hidden poppins-regular">
        {data.map((cliente, index) => (
          <div
            className="p-4 my-2 shadow-lg bg-white rounded-xl border border-black hover:bg-gray-300 "
            key={cliente._id}
          >
            <div className="mb-2">
              <span className="poppins-regular font-bold">
                Cliente N°{index + 1}:{" "}
              </span>{" "}
              {cliente.nombre}
            </div>
            <div className="w-full flex flex-row">
              <div className="mb-2 w-1/2 pr-2">
                <span className="poppins-regular font-bold">Celular:</span>{" "}
                {cliente.telefono}
              </div>
              <div className="mb-2 w-1/2 pl-2">
                <span className="poppins-regular font-bold">Cédula:</span>{" "}
                {cliente.cedula}
              </div>
            </div>
            <div className="mb-2">
              <span className="poppins-regular font-bold">Email:</span>{" "}
              {cliente.correo}
            </div>
            <div className="mb-2">
              <span className="poppins-regular font-bold">Dirección:</span>{" "}
              {cleanAddress(cliente.direccion)}
            </div>

            <div className="flex justify-center">
              <AiOutlineFileText
                className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                onClick={() =>
                  navigate(`/dashboard/actualizarCliente/${cliente._id}`)
                }
              />
              <AiOutlineEye
                className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                onClick={() => handleOpenClienteModal(cliente)}
              />
              <AiOutlineDelete
                className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                onClick={() => handleDelete(cliente._id)}
              />
            </div>
          </div>
        ))}
      </div>
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
      <div className="flex flex-col">
        <div className="mt-3 flex justify-between min-[640px]:items-center mb-3 max-[640px]:flex max-[640px]:flex-col">
          <div className="poppins-regular flex items-center w-full pr-5 max-[640px]:mb-3">
            <input
              type="text"
              placeholder="Buscar por cédula"
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 border border-black bg-white placeholder:text-black text-black rounded-xl w-full"
            />
          </div>
          <div className="poppins-regular flex space-x-4">
            <div className="flex items-center space-x-2">
              <AiOutlineFileText className="h-6 w-6 text-slate-800" />
              <span>Actualizar</span>
            </div>
            <div className="flex items-center space-x-2">
              <AiOutlineEye className="h-6 w-6 text-slate-800" />
              <span>Visualizar</span>
            </div>
            <div className="flex items-center space-x-2">
              <AiOutlineDelete className="h-6 w-6 text-red-900" />
              <span>Eliminar</span>
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
          <hr className="mt-4 border-black mb-2" />
          {clientesNoFrecuentes.length > 0 && (
            <TablaClientes
              titulo="Clientes no Frecuentes"
              data={clientesNoFrecuentes}
            />
          )}
          {clienteModalVisible && (
            <ModalVerCliente
              cliente={selectedCliente}
              onCancel={handleCloseClienteModal}
            />
          )}
          {deleteModalVisible && (
            <BorrarCliente
              cliente={selectedCliente}
              onConfirm={confirmDelete}
              onCancel={() => setDeleteModalVisible(false)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Tabla;
