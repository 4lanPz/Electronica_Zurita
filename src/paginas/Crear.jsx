import React from "react";
import { Formulario } from "../componets/Formulario";

const Crear = () => {
  return (
    <div>
      <h1 className="poppins-bold font-black text-4xl text-black">Registro de clientes</h1>
      <hr className="my-4" />
      <p className="poppins-regular mb-8">Ingrese los datos del cliente a registrar</p>
      <Formulario />
    </div>
  );
};

export default Crear;
