import React, { useState, useEffect } from "react";
import GoogleMaps from "../GoogleMaps";

const ModalVerCliente = ({ cliente, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-5/6 sm:w-3/5 p-10 rounded-xl flex flex-col overflow-y-scroll sm:h-5/6 h-5/6">
        {loading && (
          <p className="poppins-semibold">Cargando datos del cliente...</p>
        )}
        {error && <p>{error}</p>}
        {!loading && !cliente && (
          <p className="poppins-semibold">No hay datos del cliente</p>
        )}
        {cliente && (
          <>
            <h2 className="poppins-bold w-full text-center mb-3">
              Datos del cliente
            </h2>
            <div className="flex flex-wrap mb-3 max-[500px]:flex-col max-[500px]:flex">
              <div className="w-1/2 pr-5">
                <div className="mb-2">
                  <b className="poppins-semibold">Nombre:</b>
                  <p className="poppins-regular">{cliente.nombre}</p>
                </div>
              </div>
              <div className="w-1/2 pl-5">
                <div className="mb-2">
                  <b className="poppins-semibold">Email:</b>
                  <p className="poppins-regular">{cliente.correo}</p>
                </div>
              </div>
              <div className="w-1/2 pr-5">
                <div className="mb-2">
                  <b className="poppins-semibold">Celular:</b>
                  <p className="poppins-regular">{cliente.telefono}</p>
                </div>
              </div>
              <div className="w-1/2 pl-5">
                <div className="mb-2">
                  <b className="poppins-semibold">Cédula:</b>
                  <p className="poppins-regular">{cliente.cedula}</p>
                </div>
              </div>
              <div className="">
                <b className="poppins-semibold">Dirección:</b>
                <p className="poppins-regular">{cliente.direccion}</p>
              </div>
            </div>
            <div className="w-full h-auto">
              <div>
                <GoogleMaps direccion={cliente.direccion} />
              </div>
            </div>
          </>
        )}
        <div className="flex justify-center gap-5 mt-5">
          <button
            className="poppins-regular bg-[#5B72C3] text-white p-3 rounded-xl hover:bg-[#3D53A0] w-2/3"
            onClick={onCancel}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalVerCliente;
