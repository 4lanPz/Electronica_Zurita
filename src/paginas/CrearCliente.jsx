import React from "react";
import { FormularioCliente } from "../componets/FormularioCliente";

const CrearCliente = () => {
  return (
    <div>
      <h1 className="text-center poppins-bold font-black text-4xl text-black">Registro de clientes</h1>
      <hr className="mt-4" />
      <FormularioCliente />
    </div>
  );
};

export default CrearCliente;
