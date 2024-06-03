import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Mensaje from "../Alertas/Mensaje";

const OrdenProceso = ({ orden, onCancel }) => {
  const [mensaje, setMensaje] = useState({});
  const navigate = useNavigate();
  const [form, setForm] = useState({
    estado: orden?.estado || "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.estado) {
      setMensaje({
        respuesta: "Debe elegir una opción",
        tipo: false,
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/orden/actualizar/${
        orden._id
      }`;

      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(url, form, options);

      setMensaje({
        respuesta: `La orden se ha cambiado a estado: ${form.estado}`,
        tipo: true,
      });

      onCancel();

      window.location.reload();
    } catch (error) {
      setMensaje({
        respuesta: error.response?.data?.msg || "Error desconocido",
        tipo: false,
      });
      console.error("Error al actualizar la orden:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-gray-100 p-4 rounded-xl shadow-md">
        <h2 className="poppins-semibold text-xl text-black text-center mb-4">
          ¿Desea pasar la orden {orden.numOrden} a estado "En proceso"?
        </h2>
        <form onSubmit={handleSubmit} className="text-center">
          <div className="poppins-regular text-xl flex items-center justify-center mb-4">
            <label htmlFor="si" className="mr-2 ">
              ¿Sí?
            </label>
            <input
              type="radio"
              id="si"
              name="estado"
              value="En proceso"
              checked={form.estado === "En proceso"}
              onChange={handleChange}
              className="mr-4"
            />
            <label htmlFor="no" className="mr-2">
              ¿No?
            </label>
            <input
              type="radio"
              id="no"
              name="estado"
              value="Pendiente"
              checked={form.estado === "Pendiente"}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="poppins-regular bg-[#5B72C3] hover:bg-[#3D53A0] text-white px-4 py-2 rounded-md mr-2"
            >
              Enviar
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="poppins-regular bg-[#9b1746] hover:bg-[#84123a] text-white px-4 py-2 rounded-md"
            >
              Cerrar
            </button>
          </div>
        </form>
        {mensaje.respuesta && (
          <Mensaje tipo={mensaje.tipo ? "success" : "error"} className="mt-4">
            {mensaje.respuesta}
          </Mensaje>
        )}
      </div>
    </div>
  );
};

export default OrdenProceso;
