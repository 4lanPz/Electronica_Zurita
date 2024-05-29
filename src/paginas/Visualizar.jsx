import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Mensaje from "../componets/Alertas/Mensaje";
import ModalOrden from "../componets/Modals/ModalOrden"; // Cambiar el nombre del modal si es necesario
import OrdenesContext from "../context/OrdenesProvider"; // Cambiar el contexto a OrdenesProvider si lo has renombrado

const Visualizar = () => {
  const { id } = useParams();
  const [orden, setOrden] = useState({});
  const [mensaje, setMensaje] = useState({});
  const { modal, handleModal, actualizarOrden } = useContext(OrdenesContext); // Añadir la función para actualizar orden si existe en el contexto

  useEffect(() => {
    const consultarOrden = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/orden/visualizar/${id}`;
        const options = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const respuesta = await axios.get(url, options);
        setOrden(respuesta.data.ordenes); // Accede a la propiedad "ordenes" en la respuesta
      } catch (error) {
        setMensaje({ respuesta: error.response.data.msg, tipo: false });
      }
    };
    consultarOrden();
  }, []);

  // Función para manejar la actualización del orden
  const handleSubmit = async (datos) => {
    try {
      // Realizar la petición para actualizar el orden
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/orden/${id}`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(url, datos, options);
      // Actualizar la información del orden en el estado local
      setOrden((prevOrden) => ({ ...prevOrden, ...datos }));
      // Cerrar el modal
      handleModal();
      // Mostrar mensaje de éxito
      setMensaje({ respuesta: "Orden actualizado exitosamente", tipo: true });
    } catch (error) {
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
    }
  };

  return (
    <>
      <div>
        <h1 className="poppins-bold text-4xl text-black text-center">Generar Proforma</h1>
        <hr className="my-4" />
        <p className="poppins-semibold text-black text-center">Datos de la orden</p>
        {Object.keys(mensaje).length > 0 && (
          <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
        )}
        <div className="w-full flex flex-col justify-center items-center">
          <div className="poppins-regular m-2">
            <div>
              <p className="mt-3">
                <span className="text-black uppercase font-bold">
                  * Nombre del orden:{" "}
                </span>
                {orden.numOrden}
              </p>
              <p className="mt-3">
                <span className="text-black uppercase font-bold">
                  * Equipo:{" "}
                </span>
                {orden.equipo}
              </p>
              <p className="mt-3">
                <span className="text-black uppercase font-bold">
                  * Modelo:{" "}
                </span>
                {orden.modelo}
              </p>
              <p className="mt-3">
                <span className="text-black uppercase font-bold">
                  * Marca:{" "}
                </span>
                {orden.marca}
              </p>
              <p className="mt-3">
                <span className="text-black uppercase font-bold">
                  * Serie:{" "}
                </span>
                {orden.serie}
              </p>
              <p className="mt-3">
                <span className="text-black uppercase font-bold">
                  * Color:{" "}
                </span>
                {orden.color}
              </p>
              <p className="mt-3">
                <span className="text-black uppercase font-bold">
                  * Fecha de ingreso:{" "}
                </span>
                {new Date(orden.ingreso).toLocaleDateString()}
              </p>
              <p className="mt-3">
                <span className="text-black uppercase font-bold">
                  * Razón:{" "}
                </span>
                {orden.razon}
              </p>
              <p className="mt-3">
                <span className="text-black uppercase font-bold">
                  * Fecha de salida:{" "}
                </span>
                {orden.salida
                  ? new Date(orden.salida).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className="mt-3">
                <span className="text-black uppercase font-bold">
                  * Servicio:{" "}
                </span>
                {orden.servicio}
              </p>
              <p className="mt-3">
                <span className="text-black uppercase font-bold">
                  * Estado:{" "}
                </span>
                {orden.estado}
              </p>
            </div>
          </div>
          <button
            className="mt-4 px-5 py-2 bg-[#5B72C3] text-white rounded-lg hover:bg-[#3D53A0] cursor-pointer transition-all"
            onClick={handleModal}
          >
            GENERAR PROFORMA
          </button>
          {modal && <ModalOrden orden={orden} onSubmit={handleSubmit} />}
        </div>
      </div>
    </>
  );
};

export default Visualizar;
