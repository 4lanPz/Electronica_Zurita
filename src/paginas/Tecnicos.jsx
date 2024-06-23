import React from "react";
import TablaTecnicos from "../componets/Tablas/TablaTecnicos";

const Registro = () => {
  return (
    <div>
      <h1 className="poppins-bold text-center font-black text-4xl text-black">
        Gestión de técnicos
      </h1>
      <hr className="my-4" />
      <TablaTecnicos />
    </div>
  );
};

export default Registro;
