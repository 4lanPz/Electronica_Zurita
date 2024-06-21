import React, { useState, useEffect } from "react";
import axios from "axios";

const ModalVerOrden = ({ orden, onCancel }) => { 

  if (!orden) {
    return null; // Otra lógica de manejo si orden es null
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 overflow-y-scroll">
      <div className="bg-white lg:w-2/4 w-2/3 p-10 rounded-xl">
        <div className="flex justify-between items-center">
          <h2 className="poppins-bold text-2xl text-center w-full">
            Detalles de la Orden {orden.numOrden}
          </h2>
        </div>
        <div className="mb-2">
          <b className="poppins-semibold">Fecha de ingreso:</b>
          <p className="poppins-regular">
            {new Date(orden.ingreso).toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-wrap">
          <div className="w-1/2 pr-2">
            <div className="mb-2">
              <b className="poppins-semibold">Equipo:</b>
              <p className="poppins-regular">{orden.equipo}</p>
            </div>
            <div className="mb-2">
              <b className="poppins-semibold">Marca:</b>
              <p className="poppins-regular">{orden.marca}</p>
            </div>
            <div className="mb-2">
              <b className="poppins-semibold">Color:</b>
              <p className="poppins-regular">{orden.color}</p>
            </div>
          </div>
          <div className="w-1/2 pl-2">
            <div className="mb-2">
              <b className="poppins-semibold">Modelo:</b>
              <p className="poppins-regular">{orden.modelo}</p>
            </div>
            <div className="mb-2">
              <b className="poppins-semibold">Serie:</b>
              <p className="poppins-regular">{orden.serie}</p>
            </div>
          </div>
        </div>
        <div className="mb-2">
          <b className="poppins-semibold">Razón:</b>
          <p className="poppins-regular">{orden.razon}</p>
        </div>
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

export default ModalVerOrden;
