import logoDog from "/images/problem.jpg";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="w-full h-screen relative">
      {/* Fondo */}
      <div className="absolute inset-0 bg-[url('/images/tecnico.jpg')] bg-no-repeat bg-cover bg-center opacity-70 blur-sm"></div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <img
            class="object-cover h-80 w-80 rounded-full border-4 border-solid border-black"
            src={logoDog}
            alt="image description"
          />

          <div className="flex flex-col items-center justify-center">
            <p className="poppins-bold text-3xl md:text-4xl lg:text-5xl text-black mt-12">
              PÁGINA NO ENCONTRADA
            </p>

            <p className="poppins-semibold md:text-lg lg:text-xl text-black mt-8">
              Lo siento... No se ha encontrado la página que buscas.
            </p>

            <Link
              to="/"
              className="poppins-regular p-3 m-5 w-full text-center green text-white  border rounded-xl hover:scale-105 duration-300 border-black hover:bg-emerald-900 hover:text-white"
            >
              Volver al inicio de sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
