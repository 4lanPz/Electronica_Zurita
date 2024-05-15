import React from "react";
import { FormularioCliente } from "../componets/FormularioCliente";

const CrearCliente = () => {
  return (
    <div>
      <h1 className="text-center poppins-bold font-black text-4xl text-black">Registro de clientes</h1>
      <hr className="mt-4" />
      {/* <p className="poppins-regular mb-8">Ingrese los datos del cliente a registrar</p> */}
      <FormularioCliente />
    </div>
  );
};

export default CrearCliente;
