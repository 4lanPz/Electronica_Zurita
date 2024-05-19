import React from "react";
import TablaOrdenes from "../componets/TablaOrdenes";

const ListarOrdenes = () => {
  return (
    <div>
      <h1 className="text-center poppins-bold font-black text-4xl text-black">Listado de Trabajos</h1>
      <hr className="mt-4" />
      <TablaOrdenes />
    </div>
  );
};

export default ListarOrdenes;
