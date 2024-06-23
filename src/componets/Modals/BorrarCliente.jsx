import React, { useState } from "react";
import Mensaje from "../Alertas/Mensaje";

const BorrarCliente = ({ cliente, onConfirm, onCancel }) => {
  const [mensaje, setMensaje] = useState({});

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-gray-100 p-10 rounded-xl shadow-md">
        <h2 className="poppins-semibold text-xl text-black text-center">
          ¿Estás seguro de que deseas eliminar el cliente?
        </h2>
        <p className="poppins-bold text-center w-full  py-4">{cliente.nombre}</p>
        <div className="text-center">
          <button
            type="button"
            onClick={onConfirm}
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

export default BorrarCliente;
