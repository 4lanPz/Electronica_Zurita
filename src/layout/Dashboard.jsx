import { useContext, useState, useEffect } from "react";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const urlActual = location.pathname;
  const { auth } = useContext(AuthContext);
  const autenticado = localStorage.getItem("token");

  useEffect(() => {
    if (!auth && !autenticado) {
      navigate("/");
    }
  }, [auth, autenticado, navigate]);

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
          <div className="mx-10">
            <div className="mx-4 flex flex-col xl:flex-col md:flex-col sm:flex-row items-center justify-center max-[767px]:flex max-[767px]:flex-row">
              <img
                src="/images/logo_bw.jpg"
                alt="logo Electrónica Zurita"
                className="m-auto mt-3 p-1 mb-3 max-[767px]:mx-0"
                width={125}
                height={125}
              />
              <h2 className="poppins-bold text-2xl text-white text-center">
                Electrónica <br /> Zurita
              </h2>
            </div>

            {/* <p className="poppins-regular text-white text-center mt-2">
              Técnico: {`${auth?.nombre}`}
            </p> */}
            <hr className="my-5 border-slate-500" />

            <ul className="poppins-regular max-[769px]:flex max-[520px]:flex-col max-[520px]:flex-col">
              <li className="text-center">
                <Link
                  to="/dashboard/registrarCliente"
                  className={`${
                    urlActual === "/dashboard/registrarCliente"
                      ? "text-white bg-[#9b1746] px-3 py-2 rounded-xl text-center"
                      : "text-white"
                  } block mt-2 hover:text-black`}
                >
                  Ingresar Cliente
                </Link>
              </li>
              <li className="text-center">
                <Link
                  to="/dashboard/listarClientes"
                  className={`${
                    urlActual === "/dashboard/listarClientes"
                      ? "text-white bg-[#9b1746] px-3 py-2 rounded-xl text-center"
                      : "text-white"
                  }  block mt-2 hover:text-black`}
                >
                  Listar Clientes
                </Link>
              </li>
              <li className="text-center">
                <Link
                  to="/dashboard/registrarOrden"
                  className={`${
                    urlActual === "/dashboard/registrarOrden"
                      ? "text-white bg-[#9b1746] px-3 py-2 rounded-xl text-center"
                      : "text-white"
                  }  block mt-2 hover:text-black`}
                >
                  Orden de trabajo
                </Link>
              </li>
              <li className="text-center">
                <Link
                  to="/dashboard/listarOrdenes"
                  className={`${
                    urlActual === "/dashboard/listarOrdenes"
                      ? "text-white bg-[#9b1746] px-3 py-2 rounded-xl text-center"
                      : "text-white"
                  }  block mt-2 hover:text-black`}
                >
                  Lista de Trabajos
                </Link>
              </li>

              <li className="text-center">
                <Link
                  to="/dashboard/tecnicos"
                  className={`${
                    urlActual === "/dashboard/tecnicos"
                      ? "text-white bg-[#9b1746] px-3 py-2 rounded-xl text-center"
                      : "text-white"
                  }  block mt-2 hover:text-black`}
                >
                  Gestión Técnicos
                </Link>
              </li>

              <li className="text-center">
                <Link
                  to="/dashboard/perfil"
                  className={`${
                    urlActual === "/dashboard/perfil"
                      ? "text-white bg-[#9b1746] px-3 py-2 rounded-xl text-center"
                      : "text-white"
                  }  block mt-2 hover:text-black`}
                >
                  Perfil Técnico
                </Link>
              </li>
            </ul>
            <div className="p-4">
              <Link
                to="/"
                className="poppins-semibold text-white text-md block text-center bg-[#9b1746] hover:text-black px-3 py-1 rounded-xl"
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
      <div className="flex-1 flex flex-col h-screen overflow-y-scroll bg-gray-100 p-8">
        {autenticado ? <Outlet /> : <Navigate to="/" />}
      </div>
    </div>
  );
};

export default Dashboard;
