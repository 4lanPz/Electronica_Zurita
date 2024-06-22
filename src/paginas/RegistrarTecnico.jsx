import React from "react";
import { FormularioTecnico } from "../componets/Formularios/FormularioTecnico";

const Registro = () => {
  return (
    <div>
      <h1 className="poppins-bold text-center font-black text-4xl text-black">
        Registrar nuevo técnico
      </h1>
      <hr className="my-4" />
      <FormularioTecnico />
    </div>
  );
};

export default Registro;
