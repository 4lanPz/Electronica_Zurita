import React from "react";
import { FormularioOrden } from "../componets/FormularioOrden";

const CrearOrden = () => {
  return (
    <div>
      <h1 className="text-center poppins-bold font-black text-4xl text-black">
        Orden de trabajo
      </h1>
      <hr className="mt-4" />
      <FormularioOrden />
    </div>
  );
};

export default CrearOrden;
