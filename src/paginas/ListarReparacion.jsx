import React from "react";
import TablaReparaciones from "../componets/TablaReparaciones";

const CrearEquipo = () => {
  return (
    <div>
      <h1 className="text-center poppins-bold font-black text-4xl text-black">Listado de Reparaciones</h1>
      <hr className="mt-4" />
      <TablaReparaciones />
    </div>
  );
};

export default CrearEquipo;
