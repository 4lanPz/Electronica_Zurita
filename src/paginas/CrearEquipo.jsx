import React from "react";
import { FormularioEquipo } from "../componets/FormularioEquipo";

const CrearEquipo = () => {
  return (
    <div>
      <h1 className="text-center poppins-bold font-black text-4xl text-black">Registro de equipo</h1>
      <hr className="mt-4" />
      {/* <p className="poppins-regular mb-8">Ingrese los datos del cliente a registrar</p> */}
      <FormularioEquipo />
    </div>
  );
};

export default CrearEquipo;
