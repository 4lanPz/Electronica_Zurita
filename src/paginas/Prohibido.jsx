import logoProblem from "/images/problem.jpg";

export const Prohibido = () => {
  return (
    <div className="text-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="poppins-bold max-md:text-2xl text-4xl mb-10 mt-10 text-red-700">
          Acesso Denegado
        </h1>
        <div className="relative">
          <img
            className="object-cover h-80 w-80 border-4 border-transparent"
            src={logoProblem}
            alt="image description"
          />
          <div className="absolute inset-0 border-4 border-black rounded-md blur-md"></div>
        </div>
        <p className="poppins-semibold md:text-lg lg:text-xl text-black mt-8">
          Lo siento, no tienes permiso para ingresar a esta página.
        </p>
      </div>
    </div>
  );
};
