import React, { useState } from "react";
import axios from "axios";
import Mensaje from "../Alertas/Mensaje";

const OrdenProceso = ({ orden, onCancel }) => {
  const [mensaje, setMensaje] = useState({});
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

    // Validaciones básicas
    if (!form.estado) {
      setMensaje({
        respuesta: "Debe elegir una opción",
        tipo: false,
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/orden/actualizar/${orden._id}`;

      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(url, form, options);

      setMensaje({
        respuesta: "Orden: en estado en proceso",
        tipo: true,
      });
      setTimeout(() => {
        // Aquí llamas a la función de cancelar cuando se ha completado el proceso
        onCancel();
      }, 3000);
    } catch (error) {
      setMensaje({
        respuesta: error.response?.data?.msg || "Error desconocido",
        tipo: false,
      });
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="poppins-semibold text-black">
        ¿Desea pasar esta orden a estado "En proceso"?
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mt-4">
          <label htmlFor="si" className="mr-2">
            ¿Sí?
          </label>
          <input
            type="radio"
            id="si"
            name="estado"
            value="en proceso"
            checked={form.estado === "en proceso"}
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
            value="pendiente"
            checked={form.estado === "pendiente"}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Enviar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Cerrar
          </button>
        </div>
      </form>
      {mensaje.respuesta && (
        <Mensaje tipo={mensaje.tipo ? "success" : "error"}>
          {mensaje.respuesta}
        </Mensaje>
      )}
    </div>
  );
};

export default OrdenProceso;
