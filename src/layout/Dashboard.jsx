import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  cloneElement,
  useMemo,
} from "react";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineTeam,
  AiOutlineFileAdd,
  AiOutlineBars,
  AiOutlineOrderedList,
  AiOutlineProfile,
} from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import AuthContext from "../context/AuthProvider";
import logo from "/images/logo_bw.jpg";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const urlActual = location.pathname;
  const { auth } = useContext(AuthContext);
  const autenticado = localStorage.getItem("token");
  const sidebarRef = useRef(null);
  const inactivityTimeoutRef = useRef(null);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/");
  }, [navigate]);

  const resetInactivityTimeout = useCallback(() => {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
    inactivityTimeoutRef.current = setTimeout(handleLogout, 10 * 60 * 1000);
  }, [handleLogout]);

  useEffect(() => {
    if (!auth && !autenticado) {
      navigate("/");
    }
  }, [auth, autenticado, navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (autenticado) {
      const events = ["mousemove", "keydown", "scroll", "click"];
      events.forEach((event) =>
        document.addEventListener(event, resetInactivityTimeout)
      );
      resetInactivityTimeout();

      return () => {
        events.forEach((event) =>
          document.removeEventListener(event, resetInactivityTimeout)
        );
        if (inactivityTimeoutRef.current) {
          clearTimeout(inactivityTimeoutRef.current);
        }
      };
    }
  }, [autenticado, resetInactivityTimeout]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuItems = [
    {
      text: "Ingresar Cliente",
      icon: <AiOutlineUser size={24} />,
      to: "/dashboard/registrarCliente",
    },
    {
      text: "Listar Clientes",
      icon: <AiOutlineOrderedList size={24} />,
      to: "/dashboard/listarClientes",
    },
    {
      text: "Orden de trabajo",
      icon: <AiOutlineFileAdd size={24} />,
      to: "/dashboard/registrarOrden",
    },
    {
      text: "Lista de Trabajos",
      icon: <AiOutlineOrderedList size={24} />,
      to: "/dashboard/listarOrdenes",
    },
    {
      text: "Gestión Técnicos",
      icon: <AiOutlineTeam size={24} />,
      to: "/dashboard/tecnicos",
    },
    {
      text: "Perfil Técnico",
      icon: <AiOutlineProfile size={24} />,
      to: "/dashboard/perfil",
    },
  ];

  return (
    <div className="md:flex md:min-h-screen">
      <div ref={sidebarRef} className="w-auto bg-[#3D53A0]">
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
          <div className="mx-7">
            <div className="mx-4 flex flex-col xl:flex-col md:flex-col sm:flex-row items-center justify-center max-[767px]:flex max-[767px]:flex-row">
              <img
                src={logo}
                alt="logo Electrónica Zurita"
                className="m-auto mt-3 p-1 mb-3 max-[767px]:mx-0"
                width={125}
                height={125}
                loading="lazy"
              />
              <h2 className="poppins-bold text-2xl text-white text-center">
                Electrónica <br /> Zurita
              </h2>
            </div>

            <hr className="my-5 border-slate-500" />

            <ul className="poppins-regular max-[769px]:flex max-[430px]:flex-col max-[767px]:my-0">
              {menuItems.map((item) => (
                <li
                  key={item.to}
                  className="text-center py-2 max-md:flex max-md:py-0 max-[500px]:justify-center"
                >
                  <Link
                    to={item.to}
                    className={`${
                      urlActual === item.to
                        ? "text-white bg-[#9b1746] px-3 py-2 rounded-xl flex items-center max-md:px-2 max-md:flex-col"
                        : "text-white flex items-center"
                    } block hover:text-black max-md:flex-col`}
                  >
                    {menuOpen && (
                      <>
                        {cloneElement(item.icon, { size: 20 })}{" "}
                        {/* Aquí se muestra el ícono */}
                        <span className="ml-2 max-md:ml-0 ">{item.text}</span>
                      </>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="p-6">
              <Link
                to="/"
                className="poppins-semibold text-white text-md block text-center bg-[#9b1746] hover:text-black px-3 py-1 rounded-xl"
                onClick={handleLogout}
              >
                <BiLogOut size={20} className="inline-block mr-2" />
                Salir
              </Link>
            </div>
          </div>
        )}

        {!menuOpen && ( // Mostrar solo los íconos cuando el menú está cerrado
          <div className="mx-2 mt-5 max-md:mt-0">
            <ul className="poppins-regular max-md:flex max-md:flex-row max-md:justify-center max-[767px]:mt-[-35px] max-[300px]:mt-0">
              {menuItems.map((item) => (
                <li
                  key={item.to}
                  className={`text-center py-2 my-2 max-[767px]:my-0 max-[767px]:mb-2  ${
                    urlActual === item.to
                      ? "bg-[#9b1746] rounded-xl px-2"
                      : "bg-[#3D53A0] px-2"
                  }`}
                >
                  <Link to={item.to} className={`text-white flex items-center`}>
                    {cloneElement(item.icon, { size: 20 })}{" "}
                  </Link>
                </li>
              ))}
            </ul>
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
