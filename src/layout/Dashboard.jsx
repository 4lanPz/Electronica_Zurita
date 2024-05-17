import { useContext, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const Dashboard = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const urlActual = location.pathname;
  const { auth } = useContext(AuthContext);
  const autenticado = localStorage.getItem("token");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="md:flex md:min-h-screen">
      <div className="w-auto bg-[#3D53A0]">
        <button onClick={toggleMenu} className="my-2 mx-4 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {menuOpen && (
          <div className="mx-10 ">
            <h2 className="font-bold text-xl text-white text-center">
              Electrónica <br /> Zurita
            </h2>

            <img
              src="/images/logopag.jpg"
              alt="logo Electrónica Zurita"
              className="m-auto mt-3 p-1"
              width={150}
              height={150}
            />
            <p className="poppins-semibold text-white text-center mt-4">
              Bienvenido <br />
              Técnico
            </p>
            <p className="poppins-semibold text-white text-center ">{`${auth?.nombre}`}</p>
            <hr className="my-5 border-slate-500" />

            <ul className="poppins-regular">
              <li className="text-center inline-block">
                {/* <img
                  src="/images/svg/cliente.jpg"
                  alt="icono 1"
                  className="inline-block w-4 h-4"
                /> */}
                <Link
                  to="/dashboard/crearcliente"
                  className={`${
                    urlActual === "/dashboard/crearcliente"
                      ? "text-white bg-[#89C5BA] px-3 py-2 rounded-xl text-center"
                      : "text-white"
                  } block mt-2 hover:text-slate-600`}
                >
                  Ingresar Cliente
                </Link>
              </li>
              <li className="text-center">
                <Link
                  to="/dashboard/listar"
                  className={`${
                    urlActual === "/dashboard/listar"
                      ? "text-white bg-[#89C5BA] px-3 py-2 rounded-xl text-center"
                      : "text-white"
                  }  block mt-2 hover:text-slate-600`}
                >
                  Listar Clientes
                </Link>
              </li>
              <li className="text-center">
                <Link
                  to="/dashboard/crearequipo"
                  className={`${
                    urlActual === "/dashboard/crearequipo"
                      ? "text-white bg-[#89C5BA] px-3 py-2 rounded-xl text-center"
                      : "text-white"
                  }  block mt-2 hover:text-slate-600`}
                >
                  Orden de trabajo
                </Link>
              </li>
              <li className="text-center">
                <Link
                  to="/dashboard/listarreparacion"
                  className={`${
                    urlActual === "/dashboard/listarreparacion"
                      ? "text-white bg-[#89C5BA] px-3 py-2 rounded-xl text-center"
                      : "text-white"
                  }  block mt-2 hover:text-slate-600`}
                >
                  Estados de reparación
                </Link>
              </li>

              <li className="text-center">
                <Link
                  to="/dashboard/perfil"
                  className={`${
                    urlActual === "/dashboard/perfil"
                      ? "text-white bg-[#89C5BA] px-3 py-2 rounded-xl text-center"
                      : "text-white"
                  }  block mt-2 hover:text-white`}
                >
                  Perfil Técnico
                </Link>
              </li>
            </ul>
            <div className="p-4 mt-10">
              <Link
                to="/"
                className="poppins-regular text-xl text-white text-md block hover:bg-red-900 text-center bg-red-800 px-4 py-1 rounded-xl"
                onClick={() => {
                  localStorage.removeItem("token");
                }}
              >
                Salir
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 bg-gray-100 p-10">
        {/* <div className="overflow-y-scroll p-8"> */}
        <div className="">{autenticado ? <Outlet /> : <Navigate to="/" />}</div>
      </div>
    </div>
  );
};

export default Dashboard;
