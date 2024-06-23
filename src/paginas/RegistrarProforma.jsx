import React from "react";
import { FormularioProforma } from "../componets/Formularios/FormularioProforma";

const Registro = () => {
  return (
    <div>
      <h1 className="poppins-bold text-center font-black text-4xl text-black">
        Registro de proforma
      </h1>
      <hr className="my-4" />
      <FormularioProforma />
    </div>
  );
};

export default Registro;
