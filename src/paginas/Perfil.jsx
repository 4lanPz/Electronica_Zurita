import React from "react";
import { CardPerfil } from "../componets/Perfil/CardPerfil";
import FormularioPerfil from "../componets/Perfil/FormularioPerfil";
import Password from "../componets/Perfil/Password";
import AuthContext from "../context/AuthProvider";
import { useContext } from "react";

const Perfil = () => {
  const { auth } = useContext(AuthContext);
  return (
    <>
      <div className="flex justify-center">
      <CardPerfil />
      </div>
      <div className="flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap">
        <div className="w-full md:w-1/2">
          <FormularioPerfil />
        </div>
        <div className="w-full md:w-1/2">
          <Password />
        </div>
      </div>
    </>
  );
};

export default Perfil;
