import React from "react";
import { FormularioCliente } from "../componets/Formularios/FormularioCliente";

const RegistrarCliente = () => {
  return (
    <div className="">
      <h1 className="poppins-bold text-center font-black text-4xl text-black">Registro de clientes</h1>
      <hr className="mt-4" />
      <FormularioCliente />
    </div>
  );
};

export default RegistrarCliente;
