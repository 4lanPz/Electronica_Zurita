import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

export const CardPerfil = () => {
  const { auth } = useContext(AuthContext);
  return (
    <div className="bg-white border border-slate-200 h-auto p-4 flex flex-col justify-between shadow-lg rounded-xl xl:w-2/5 max-[640px]:w-full">
      <h1 className="poppins-bold font-black text-2xl text-black text-center">
        Datos del Técnico
      </h1>
      <div className="flex items-center justify-center flex-wrap md:flex-nowrap">
        <div className="w-full">
          <div className="">
            <b className="poppins-semibold">Nombre técnico:</b>
            <br />
            <p className="poppins-regular">
              {auth.nombre} {auth.apellido}
            </p>
          </div>
          <div className="">
            <b className="poppins-semibold">Correo electrónico:</b>
            <br />
            <p className="poppins-regular">{auth.email}</p>
          </div>
          <div className="flex items-center justify-center flex-wrap md:flex-nowrap">
            <div className="w-1/2">
              <b className="poppins-semibold">RUC:</b>
              <br />
              <p className="poppins-regular">{auth.ruc}</p>
            </div>
            <div className="w-1/2">
              <b className="poppins-semibold">Télefono:</b>
              <br />
              <p className="poppins-regular">{auth.telefono}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
