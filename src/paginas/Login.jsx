import axios from "axios";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Mensaje from "../componets/Alertas/Mensaje";
import AuthContext from "../context/AuthProvider";

export const Login = () => {
  const navigate = useNavigate();

  const { setAuth, setEstado } = useContext(AuthContext);
  const [mensaje, setMensaje] = useState({});

  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = form.password.includes("vet")
      ? `${import.meta.env.VITE_BACKEND_URL}/paciente/login`
      : `${import.meta.env.VITE_BACKEND_URL}/login`;
    try {
      const respuesta = await axios.post(url, form);
      localStorage.setItem("token", respuesta.data.token);
      setAuth(respuesta.data);
      navigate("/dashboard");
    } catch (error) {
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
      setform({});
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    }
  };

  return (
    <>
      <div className="w-full h-screen relative">
        {/* Fondo */}
        <div className="absolute inset-0 bg-[url('/public/images/tecnico.jpg')] bg-no-repeat bg-cover bg-center opacity-70 blur-sm"></div>

        {/* Contenido del formulario */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-auto lg:w-2/5 white p-10 rounded-xl max-w-2xl">
            {/* Mensaje de error */}
            {Object.keys(mensaje).length > 0 && (
              <Mensaje className="poppins-regular">{mensaje.respuesta}</Mensaje>
            )}

            {/* Encabezado */}
            <div className="flex items-center justify-center mb-8">
              {/* Imagen */}
              <img
                src="/public/images/logo.png"
                alt="Logo"
                className="w-40 h-auto mr-3"
              />

              {/* Texto */}
              <div className="text-center">
                <h1 className="poppins-bold uppercase text-black">
                  Electrónica
                </h1>
                <h1 className="poppins-bold uppercase text-black">Zurita</h1>
              </div>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit}>
              {/* Correo electrónico */}
              <div className="mb-3">
                <label className="poppins-semibold">Correo electrónico</label>
                <input
                  type="email"
                  placeholder="Ingrese su correo electrónico"
                  name="email"
                  value={form.email || ""}
                  onChange={handleChange}
                  className="mt-1 poppins-regular block w-full rounded-xl border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-black"
                />
              </div>

              {/* Contraseña */}
              <div className="mb-3">
                <label className="poppins-semibold">Contraseña</label>
                <input
                  type="password"
                  placeholder="********************"
                  name="password"
                  value={form.password || ""}
                  onChange={handleChange}
                  className="mt-1 poppins-regular block w-full rounded-xl border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-black"
                />
              </div>

              {/* Botón de inicio de sesión */}
              <div className="mt-4">
                <button className="poppins-regular py-2 w-full block text-center green text-white border rounded-xl hover:scale-100 duration-300 hover:bg-emerald-900 hover:text-white mb-3">
                  Iniciar sesión
                </button>
              </div>
            </form>

            {/* Olvidaste la contraseña */}
            <div className="mb-8">
              <Link
                to="/forgot"
                className="poppins-regular underline text-black hover:text-gray-700"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Registro */}
            <div className="flex justify-between items-center">
              <p className="poppins-regular text-black">
                ¿No tienes una cuenta?
              </p>
              <Link
                to="/register"
                className="poppins-regular py-2 px-5 green text-white border rounded-xl hover:scale-100 duration-300 hover:bg-emerald-900 hover:text-white"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/*
Orden de los estilos:
1. Font size (tamaño de fuente)
2. Color de texto
3. Padding (relleno)
4. Bordes
5. Margen (si es aplicable)
*/ 
