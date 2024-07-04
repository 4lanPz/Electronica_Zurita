import React from "react";
import GoogleMaps from "../GoogleMaps";

const ModalVerCliente = ({ cliente, onCancel }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-4/6 max-md:w-full p-10 rounded-xl flex flex-col overflow-y-scroll h-6/7 max-md:h-5/6">
        {/* Contenido del modal */}
        {cliente ? (
          <>
            <h2 className="poppins-bold w-full text-center">
              Datos del cliente: {cliente.nombre}
            </h2>
            <div className="flex flex-wrap mb-3 max-[500px]:flex-col max-[500px]:flex">
              <div className="w-1/2 pl-5 max-[500px]:pl-0">
                <div className="mb-2">
                  <b className="poppins-semibold">Email:</b>
                  <p className="poppins-regular">{cliente.correo}</p>
                </div>
              </div>
              <div className="w-1/2 pr-5 max-[500px]:pr-0">
                <div className="mb-2">
                  <b className="poppins-semibold">Celular:</b>
                  <p className="poppins-regular">{cliente.telefono}</p>
                </div>
              </div>
              <div className="w-1/2 pl-5 max-[500px]:pl-0">
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
            <div className="mt-[-24px] ">
              {/* Aquí mostramos el mapa con la dirección del cliente */}
              <div>
                <GoogleMaps direccion={cliente.direccion} />
              </div>
            </div>
          </>
        ) : (
          // Mostrar mensaje o componente de carga si no hay cliente
          <p className="poppins-semibold">No hay datos del cliente</p>
        )}

        {/* Botón de cerrar modal */}
        <div className="flex justify-center gap-5 mt-5">
          <button
            className="poppins-regular bg-[#9b1746] text-white p-3 rounded-xl hover:bg-[#af4369] w-2/3"
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
