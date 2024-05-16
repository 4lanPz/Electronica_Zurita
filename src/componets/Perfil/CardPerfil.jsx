import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import Tecimage from "/images/tecprofile.jpg";

export const CardPerfil = () => {
  const { auth } = useContext(AuthContext);
  return (
    <div
      className="w-3/6 bg-white border border-slate-200 h-auto p-4 
                        flex flex-col items-center justify-between shadow-xl rounded-lg"
    >
      <h1 className="poppins-bold font-black text-2xl text-black">
        Datos del Técnico
      </h1>
      <div className="flex items-center justify-center flex-wrap md:flex-nowrap">
        <div className="w-full md:w-1/2">
          <img
            src={Tecimage}
            alt="img-técnico"
            className="m-auto"
            width={140}
            height={140}
          />
        </div>
        <div className="w-full ml-5">
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
