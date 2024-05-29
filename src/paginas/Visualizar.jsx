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
        <h1 className="poppins-bold text-4xl text-black">Generar Proforma</h1>
        <hr className="my-4" />
        <p className="poppins-regular text-black">Datos de la orden</p>
        {Object.keys(mensaje).length > 0 && (
          <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
        )}
        <div>
          <div className="m-5 flex justify-between">
            <div>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Nombre del orden:{" "}
                </span>
                {orden.numOrden}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Equipo:{" "}
                </span>
                {orden.equipo}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Modelo:{" "}
                </span>
                {orden.modelo}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Marca:{" "}
                </span>
                {orden.marca}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Serie:{" "}
                </span>
                {orden.serie}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Color:{" "}
                </span>
                {orden.color}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Fecha de ingreso:{" "}
                </span>
                {new Date(orden.ingreso).toLocaleDateString()}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Razón:{" "}
                </span>
                {orden.razon}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Fecha de salida:{" "}
                </span>
                {orden.salida
                  ? new Date(orden.salida).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Servicio:{" "}
                </span>
                {orden.servicio}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Estado:{" "}
                </span>
                {orden.estado}
              </p>
            </div>
          </div>
          <button
            className="px-5 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700"
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
