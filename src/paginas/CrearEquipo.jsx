import React from "react";
import { FormularioEquipo } from "../componets/FormularioEquipo";

const CrearEquipo = () => {
  return (
    <div>
      <h1 className="text-center poppins-bold font-black text-4xl text-black">Orden de trabajo</h1>
      <hr className="mt-4" />
      <FormularioEquipo />
    </div>
  );
};

export default CrearEquipo;
