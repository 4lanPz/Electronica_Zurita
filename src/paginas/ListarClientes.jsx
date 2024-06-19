import React from "react";
import TablaClientes from "../componets/TablaClientes";

const Listar = () => {
  return (
    <div>
      <h1 className="poppins-bold text-center font-black text-4xl text-black">
        Listado de clientes
      </h1>
      <hr className="my-4" />
      <TablaClientes />
    </div>
  );
};

export default Listar;
