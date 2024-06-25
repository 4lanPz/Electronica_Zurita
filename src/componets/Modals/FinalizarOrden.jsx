import React, { useState } from "react";
import Mensaje from "../Alertas/Mensaje";

const FinalizarOrden = ({ orden, onConfirm, onCancel }) => {
  const [mensaje, setMensaje] = useState({});

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-gray-100 p-10 rounded-xl shadow-md">
        <h2 className="poppins-semibold text-xl text-black text-center">
          ¿Seguro que deseas finalizar la orden: {orden.numOrden}?
        </h2>

        <div className="text-center mt-3">
          <button
            type="button"
            onClick={() => onConfirm(orden._id)}
            className="poppins-regular bg-[#5B72C3] hover:bg-[#3D53A0] text-white p-3 rounded-md mr-2"
          >
            Confirmar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="poppins-regular bg-[#9b1746] hover:bg-[#84123a] text-white p-3 rounded-md"
          >
            Cancelar
          </button>
        </div>
        {mensaje.respuesta && (
          <Mensaje tipo={mensaje.tipo ? "success" : "error"} className="mt-4">
            {mensaje.respuesta}
          </Mensaje>
        )}
      </div>
    </div>
  );
};

export default FinalizarOrden;
