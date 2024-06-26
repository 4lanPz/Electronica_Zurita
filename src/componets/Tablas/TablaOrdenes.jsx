import React, { useContext, useState, useEffect } from "react";
import {
  AiOutlineFileText,
  AiOutlineCheckCircle,
  AiOutlineEye,
} from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import OrdenProceso from "../Modals/OrdenProceso";
import ModalVerProforma from "../Modals/ModalVerProforma";
import ModalVerOrden from "../Modals/ModalVerOrden";
import FinalizarOrden from "../Modals/FinalizarOrden";

const TablaOrdenes = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ordenes, setOrdenes] = useState([]);
  const [selectedOrden, setSelectedOrden] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [proformaModalVisible, setProformaModalVisible] = useState(false);
  const [finalizarOrdenVisible, setFinalizarOrdenVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [verOrdenModalVisible, setVerOrdenModalVisible] = useState(false);
  const [selectedOrdenVer, setSelectedOrdenVer] = useState(null);

  const handleOpenVerOrdenModal = (orden) => {
    setSelectedOrdenVer(orden);
    setVerOrdenModalVisible(true);
  };

  const handleCloseVerOrdenModal = () => {
    setVerOrdenModalVisible(false);
  };

  const handleOpenModal = (orden) => {
    setSelectedOrden(orden);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleOpenProformaModal = (orden) => {
    setSelectedOrden(orden);
    setProformaModalVisible(true);
  };

  const handleCloseProformaModal = () => {
    setProformaModalVisible(false);
  };

  const handleOpenFinalizarOrden = (orden) => {
    setSelectedOrden(orden);
    setFinalizarOrdenVisible(true);
  };

  const handleCloseFinalizarOrden = () => {
    setFinalizarOrdenVisible(false);
  };

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
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/ordenes/finalizar/${id}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = { id };
      await axios.put(url, data, { headers });
      listarOrdenes();
      setSelectedOrden(null);
      setFinalizarOrdenVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    const onlyNums = value.replace(/[^0-9]/g, "");
    setSearchTerm(onlyNums);
  };

  const filteredOrdenes = ordenes.filter(
    (orden) =>
      orden.cliente?.cedula &&
      orden.cliente.cedula.toString().includes(searchTerm)
  );

  const Tabla = ({ titulo, data }) => (
    <div>
      <h2 className="poppins-semibold">{titulo}</h2>

      {/* Tabla completa visible en pantallas medianas y grandes */}
      <div className="hidden sm:block">
        <table className="w-full mt-2 table-auto shadow-lg bg-white rounded-xl">
          <thead className="bg-[#3D53A0] text-white">
            <tr className="poppins-regular">
              <th className="p-2">N° Orden</th>
              <th className="p-2">Cliente</th>
              <th className="p-2">Cédula</th>
              <th className="p-2">Equipo</th>
              <th className="p-2">Fecha Ingreso</th>
              {titulo === "Finalizado" && <th className="p-2">Fecha Salida</th>}
              <th className="p-2">Estado</th>
              {titulo !== "Finalizado" && <th className="1">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((orden) => (
              <tr
                className="poppins-regular border-b hover:bg-gray-300 text-center"
                key={orden._id}
              >
                <td className="p-2">{orden.numOrden}</td>
                <td className="p-2">{orden.cliente?.nombre}</td>
                <td className="p-2">{orden.cliente?.cedula}</td>
                <td className="p-2">{orden.equipo}</td>
                <td className="p-2">
                  {new Date(orden.ingreso).toLocaleDateString()}
                </td>
                {titulo === "Finalizado" && (
                  <td className="p-2">
                    {orden.salida
                      ? new Date(orden.salida).toLocaleDateString()
                      : "N/A"}
                  </td>
                )}
                <td className="p-2">{orden.estado}</td>
                {titulo !== "Finalizado" && (
                  <td className="py-2 text-center">
                    {titulo === "Mantenimiento" || titulo === "Revisión" ? (
                      <>
                        <AiOutlineFileText
                          className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-1"
                          onClick={() => handleOpenModal(orden)}
                        />
                        <AiOutlineEye
                          className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-1"
                          onClick={() => handleOpenVerOrdenModal(orden)}
                        />
                      </>
                    ) : (
                      <>
                        <AiOutlineFileText
                          className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-1"
                          onClick={() =>
                            navigate(
                              `/dashboard/registrarProforma/${orden._id}`
                            )
                          }
                        />
                        <AiOutlineEye
                          className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-1"
                          onClick={() => handleOpenProformaModal(orden)}
                        />
                      </>
                    )}
                    <AiOutlineCheckCircle
                      className="h-7 w-7 text-green-700 cursor-pointer inline-block"
                      onClick={() => handleOpenFinalizarOrden(orden)}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tabla simplificada visible en pantallas pequeñas */}
      <div className="block sm:hidden">
        {data.map((orden) => (
          <div
            className="p-4 mb-4 mt-2 shadow-lg bg-white rounded-xl border border-black"
            key={orden._id}
          >
            <div className="mb-2">
              <span className="poppins-regular font-bold">N° Orden:</span>{" "}
              {orden.numOrden}
            </div>
            <div className="mb-2">
              <span className="poppins-regular font-bold">Cliente:</span>{" "}
              {orden.cliente?.nombre}
            </div>
            <div className="mb-2">
              <span className="poppins-regular font-bold">Cédula:</span>{" "}
              {orden.cliente?.cedula}
            </div>
            <div className="mb-2">
              <span className="poppins-regular font-bold">Equipo:</span>{" "}
              {orden.equipo}
            </div>
            <div className="mb-2">
              <span className="poppins-regular font-bold">Fecha Ingreso:</span>{" "}
              {new Date(orden.ingreso).toLocaleDateString()}
            </div>
            {titulo === "Finalizado" && (
              <div className="mb-2">
                <span className="poppins-regular font-bold">Fecha Salida:</span>{" "}
                {orden.salida
                  ? new Date(orden.salida).toLocaleDateString()
                  : "N/A"}
              </div>
            )}
            <div className="mb-2">
              <span className="poppins-regular font-bold">Estado:</span>{" "}
              {orden.estado}
            </div>
            {titulo !== "Finalizado" && (
              <div className="flex justify-center mt-2">
                {titulo === "Mantenimiento" || titulo === "Revisión" ? (
                  <>
                    <AiOutlineFileText
                      className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                      onClick={() => handleOpenModal(orden)}
                    />
                    <AiOutlineEye
                      className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                      onClick={() => handleOpenVerOrdenModal(orden)}
                    />
                  </>
                ) : (
                  <>
                    <AiOutlineFileText
                      className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                      onClick={() =>
                        navigate(`/dashboard/registrarProforma/${orden._id}`)
                      }
                    />
                    <AiOutlineEye
                      className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                      onClick={() => handleOpenProformaModal(orden)}
                    />
                  </>
                )}
                <AiOutlineCheckCircle
                  className="h-7 w-7 text-green-700 cursor-pointer inline-block"
                  onClick={() => handleOpenFinalizarOrden(orden)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const ordenesMantenimiento = filteredOrdenes.filter(
    (orden) =>
      orden.servicio === "Mantenimiento" && orden.estado !== "Finalizado"
  );
  const ordenesReparacion = filteredOrdenes.filter(
    (orden) => orden.servicio === "Reparación" && orden.estado !== "Finalizado"
  );
  const ordenesRevision = filteredOrdenes.filter(
    (orden) => orden.servicio === "Revisión" && orden.estado !== "Finalizado"
  );
  const ordenesFinalizado = filteredOrdenes.filter(
    (orden) => orden.estado === "Finalizado"
  );

  return (
    <div className="flex flex-col">
      <div className="mt-3 flex justify-between min-[640px]:items-center mb-3 max-[640px]:flex max-[640px]:flex-col">
        <div className="poppins-regular flex items-center w-full pr-5 max-[640px]:mb-3">
          <input
            type="text"
            placeholder="Buscar por cédula"
            value={searchTerm || ""}
            onChange={handleSearchChange}
            className="p-2 border border-black bg-white placeholder:text-black text-black rounded-xl w-full"
          />
        </div>
        <div className="poppins-regular flex space-x-4 items-center">
          <div className="flex items-center space-x-2">
            <AiOutlineFileText className="h-6 w-6 text-black" />
            <span>Actualizar</span>
          </div>
          <div className="flex items-center space-x-2">
            <AiOutlineEye className="h-6 w-6 text-black" />
            <span>Visualizar</span>
          </div>
          <div className="flex items-center space-x-2">
            <AiOutlineCheckCircle className="h-6 w-6 text-green-700" />
            <span>Finalizar</span>
          </div>
        </div>
      </div>
      <Tabla titulo="Mantenimiento" data={ordenesMantenimiento} />
      <hr className="mt-4 mb-2 border-black" />
      <Tabla titulo="Reparación" data={ordenesReparacion} />
      <hr className="mt-4 mb-2 border-black" />
      <Tabla titulo="Revisión" data={ordenesRevision} />
      <hr className="mt-4 mb-2 border-black" />
      <Tabla titulo="Finalizado" data={ordenesFinalizado} />
      {modalVisible && (
        <OrdenProceso
          orden={selectedOrden}
          onCancel={handleCloseModal}
          onSubmit={() => {
            handleCloseModal();
          }}
        />
      )}
      {proformaModalVisible && (
        <ModalVerProforma
          orden={selectedOrden}
          onCancel={handleCloseProformaModal}
        />
      )}
      {verOrdenModalVisible && (
        <ModalVerOrden
          orden={selectedOrdenVer}
          onCancel={handleCloseVerOrdenModal}
        />
      )}
      {finalizarOrdenVisible && (
        <FinalizarOrden
          orden={selectedOrden}
          onCancel={handleCloseFinalizarOrden}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default TablaOrdenes;
