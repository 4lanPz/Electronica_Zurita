import logoProblem from "/images/problem.jpg";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="w-full h-screen relative">
      <div className="absolute inset-0 bg-[url('/images/tecnico.jpg')] bg-no-repeat bg-cover bg-center opacity-70 blur-sm"></div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="bg-white p-10 rounded-xl z-10 lg:w-2/5 sm-2/5 w-auto absolute">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <p className="poppins-bold text-2xl md:text-2xl lg:text-4xl text-black mb-5">
                PÁGINA NO ENCONTRADA
              </p>
              <img
                class="object-cover h-80 w-80 rounded-full border-4 border-solid border-black"
                src={logoProblem}
                alt="image description"
              />
              <p className="poppins-semibold md:text-lg lg:text-xl text-black mt-8">
                Ups... No se ha encontrado la página que buscas.
              </p>

              <Link
                to="/"
                className="poppins-regular p-3 m-5 w-full text-center green text-white bg-[#5B72C3] border rounded-xl hover:scale-105 duration-300 hover:bg-[#3D53A0] hover:text-white"
              >
                Volver al inicio de sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
