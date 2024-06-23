import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AiOutlineDelete, AiOutlineFileAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Mensaje from "../Alertas/Mensaje";
import AuthContext from "../../context/AuthProvider";
import ModalNuevoTecnico from "../Modals/ModalNuevoTecnico";
import BorrarTecnico from "../Modals/BorrarTecnico";

const TablaTecnicos = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tecnicos, setTecnicos] = useState([]);
  const [tecnicoModalVisible, setTecnicoModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedTecnico, setSelectedTecnico] = useState(null);
  const [mensaje, setMensaje] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const listarTecnicos = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/tecnicos`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.get(url, options);
      setTecnicos(respuesta.data);
    } catch (error) {
      console.error("Error al listar técnicos:", error);
      setMensaje({
        respuesta: "Hubo un problema al cargar la lista de técnicos.",
        tipo: false,
      });
    }
  };

  useEffect(() => {
    listarTecnicos();
  }, []);

  const confirmDelete = async () => {
    try {
      if (!selectedTecnico) return; // Verifica que el técnico esté seleccionado
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/tecnico/eliminar/${
        selectedTecnico._id
      }`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(url, { headers });
      listarTecnicos();
      setDeleteModalVisible(false);
      setSelectedTecnico(null);
    } catch (error) {
      setMensaje({
        respuesta: "error al eliminar",
        tipo: false,
      });
    }
  };

  const handleDelete = async (id) => {
    setSelectedTecnico(tecnicos.find((tecnico) => tecnico._id === id));
    setDeleteModalVisible(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOpenTecnicoModal = () => {
    setTecnicoModalVisible(true);
  };

  const handleCloseTecnicoModal = () => { 
    setTecnicoModalVisible(false);
    listarTecnicos()
  };

  const filteredTecnicos = tecnicos.filter((tecnico) =>
    tecnico.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between mb-5">
        <div className="poppins-regular flex items-center w-full">
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border border-black bg-white placeholder:text-black text-black rounded-xl w-2/3"
          />
        </div>
        <div className="poppins-regular flex space-x-4 items-center">
          <div className="flex items-center space-x-2">
            <AiOutlineDelete className="h-6 w-6 text-red-900" />
            <span>Eliminar</span>
          </div>
        </div>
      </div>
      <div>
        <table className="w-full mt-3 table-auto shadow-lg bg-white rounded-xl">
          <thead className="bg-[#3D53A0] text-white">
            <tr className="poppins-regular">
              <th className="p-2">Nombre</th>
              <th className="p-2">RUC</th>
              <th className="p-2">Correo electrónico</th>
              <th className="p-2">teléfono</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredTecnicos.map((tecnico) => (
              <tr
                className="poppins-regular border-b hover:bg-gray-300 text-center"
                key={tecnico._id}
              >
                <td className="p-2">
                  {tecnico.nombre} {tecnico.apellido}
                </td>
                <td className="p-2">{tecnico.ruc}</td>
                <td className="p-2">{tecnico.email}</td>
                <td className="p-2">{tecnico.telefono}</td>
                <td className="p-2">
                  {tecnico.status ? "Activo" : "Pendiente"}
                </td>
                <td className="py-2 text-center">
                  <AiOutlineDelete
                    className="h-7 w-7 text-red-900 cursor-pointer inline-block mr-2"
                    onClick={() => handleDelete(tecnico._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center">
          <button
            className="w-1/3 poppins-regular bg-[#5267b4] mt-10 text-white border py-2 rounded-xl duration-300 hover:bg-[#3D53A0] hover:text-white mb-0 "
            onClick={handleOpenTecnicoModal}
          >
            Agregar nuevo técnico
          </button>
        </div>
      </div>
      {tecnicoModalVisible && (
        <ModalNuevoTecnico
          handleCloseTecnicoModal={handleCloseTecnicoModal}
          onCancel={handleCloseTecnicoModal}
        />
      )}
      {deleteModalVisible && (
        <BorrarTecnico
          tecnico={selectedTecnico}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteModalVisible(false)}
        />
      )}
    </>
  );
};

export default TablaTecnicos;
