import { useContext } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const Dashboard = () => {
  const location = useLocation();
  const urlActual = location.pathname;
  const { auth } = useContext(AuthContext);
  const autenticado = localStorage.getItem("token");

  return (
    <div className="md:flex md:min-h-screen">
      <div className="md:min-h-screen md:w-2/7 bg-gray-800 flex flex-col justify-between">
        <div className="px-5 py-4">
          <h2 className="poppins-bold text-2xl font-black text-center text-white">
            Electrónica
          </h2>
          <h2 className="poppins-bold text-2xl font-black text-center text-white">
            Zurita
          </h2>

          <img
            src="/images/logopag.jpg"
            alt="logo Electrónica Zurita"
            className="m-auto mt-3 p-1 "
            width={150}
            height={150}
          />
          <p className="poppins-regular text-white text-center mt-4 ">
            {" "}
            Bienvenido Técnico
          </p>
          <p className="poppins-regular text-white text-center  ">
            {" "}
            {auth?.nombre}
          </p>
          {/* <p className='text-slate-400 text-center my-4 text-sm'>Tipo de rol: {auth?.rol}</p> */}
          <hr className="my-5 border-slate-500" />

          <ul className="mt-2">
            <li className="text-center">
              <Link
                to="/dashboard/crear"
                className={`${
                  urlActual === "/dashboard/crear"
                    ? "text-slate-100 bg-gray-900 px-3 py-2 rounded-md text-center"
                    : "text-slate-600"
                } text-xl block mt-2 hover:text-slate-600`}
              >
                Ingresar Cliente
              </Link>
            </li>

            <li className="text-center">
              <Link
                to=""
                className={`${
                  urlActual === "/dashboard/listar"
                    ? "text-slate-200 bg-gray-900 px-3 py-2 rounded-md text-center"
                    : "text-slate-600"
                } text-xl block mt-2 hover:text-slate-600`}
              >
                Ingresar Equipo
              </Link>
            </li>

            <li className="text-center">
              <Link
                to="/dashboard/listar"
                className={`${
                  urlActual === "/dashboard/listar"
                    ? "text-slate-200 bg-gray-900 px-3 py-2 rounded-md text-center"
                    : "text-slate-600"
                } text-xl block mt-2 hover:text-slate-600`}
              >
                Listar Equipos
              </Link>
            </li>

            <li className="text-center">
              <Link
                to="/dashboard"
                className={`${
                  urlActual === "/dashboard"
                    ? "text-slate-200 bg-gray-900 px-3 py-2 rounded-md text-center"
                    : "text-slate-600"
                } text-xl block mt-2 hover:text-slate-600`}
              >
                Perfil Técnico
              </Link>
            </li>
          </ul>
          <div className="px-5 py-4 mt-auto">
            <Link
              to="/"
              className=" text-white  text-md block hover:bg-red-900 text-center
                        bg-red-800 px-4 py-1 rounded-lg"
              onClick={() => {
                localStorage.removeItem("token");
              }}
            >
              Salir
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between h-screen bg-gray-100">
        {/* <div className='bg-gray-800 py-2 flex md:justify-end items-center gap-5 justify-center'>
                    <div className='text-md font-semibold text-slate-100'>
                        Bienvenido - {auth?.nombre}
                    </div>
                    <div>
                        <img src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" alt="img-client" className="border-2 border-green-600 rounded-full" width={50} height={50} />
                    </div>

                    

                </div> */}

        <div className="overflow-y-scroll p-8">
          {autenticado ? <Outlet /> : <Navigate to="/login" />}
        </div>

        {/* <div className="bg-gray-800 h-12">
          <p className="text-center  text-slate-100 leading-[2.9rem] underline">
            Todos los derechos reservados
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
