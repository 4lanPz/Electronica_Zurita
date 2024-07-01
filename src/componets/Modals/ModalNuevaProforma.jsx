import React from "react";
import { FiX } from "react-icons/fi";

const ModalProforma = ({ orden, piezas, total, handleClose, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm(); // Realiza el registro
    handleClose(); // Cierra el modal después del registro
  };
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-8 max-w-lg w-full">
        <h2 className="poppins-bold text-xl mb-4 w-full text-center">
          Datos de la proforma
        </h2>
        <div className="mb-4">
          <p className="poppins-regular mb-3">
            <span className="poppins-semibold">Cliente: </span>
            {orden.cliente.nombre}
          </p>
          <p className="poppins-regular mb-3">
            <span className="poppins-semibold">Equipo: </span>
            {orden.equipo}
          </p>
          <p className="poppins-regular mb-3">
            <span className="poppins-semibold">Marca: </span>
            {orden.marca}
          </p>
          <p className="poppins-regular mb-3">
            <span className="poppins-semibold">Modelo: </span>
            {orden.modelo}
          </p>
          <p className="poppins-regular mb-3">
            <span className="poppins-semibold">Razón: </span>
            {orden.razon}
          </p>
          <table className="w-full mt-2 table-auto bg-white rounded-xl border-collapse">
            <thead className="bg-[#3D53A0] text-white poppins-semibold">
              <tr>
                <th className="w-80 p-2 border border-gray-300">Pieza</th>
                <th className="w-20 p-2 border border-gray-300">Precio</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 poppins-regular">
              {piezas.map((pieza, index) => (
                <tr key={index}>
                  <td className="p-2 border border-gray-300">{pieza.pieza}</td>
                  <td className="p-2 border border-gray-300 text-center">
                    ${pieza.precio}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mt-4 poppins-semibold w-full text-center">
            Total estimado: ${total.toFixed(2)}
          </p>
        </div>
        <div className="flex flex-row w-full text-center max-md:flex-col max-md:flex">
          <div className="w-2/3 max-md:w-full">
            <button
              onClick={handleConfirm}
              className="bg-[#5267b4] hover:bg-[#3D53A0] text-white px-4 py-2 rounded-xl poppins-regular"
            >
              Confirmar Registro
            </button>
          </div>
          <div className="w-1/2 max-md:w-full">
            <button
              onClick={handleClose}
              className="text-white bg-[#9b1746] hover:bg-[#af4369] px-4 py-2 rounded-xl poppins-regular"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalProforma;
