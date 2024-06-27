import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Mensaje from "../componets/Alertas/Mensaje";
import AuthContext from "../context/AuthProvider";

export const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [mensaje, setMensaje] = useState({});
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const clearLocalStorage = () => {
      localStorage.removeItem("token");
    };
    clearLocalStorage();
  }, []);

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const url = `${import.meta.env.VITE_BACKEND_URL}/login`;
    try {
      const respuesta = await axios.post(url, form);
      localStorage.setItem("token", respuesta.data.token);
      setAuth(respuesta.data);
      navigate("/dashboard/registrarCliente");
    } catch (error) {
      setLoading(false);
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
      setform({});
      setTimeout(() => {
        setMensaje({});
      }, 60000);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div className="w-full h-screen relative">
        {/* Fondo */}
        <div className="absolute inset-0 bg-[url('/images/tecnico.jpg')] bg-no-repeat bg-cover bg-center opacity-70 blur-sm"></div>

        {/* Contenido del formulario */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-auto lg:w-2/5 bg-white p-10 rounded-xl max-w-2xl">
            {/* Encabezado */}
            <div className="flex items-center justify-center mb-8 max-[640px]:flex max-[640px]:flex-col">
              {/* Imagen */}
              <img
                src="/images/logopag.jpg"
                alt="Logo"
                className="w-40 h-auto mr-3"
              />

              {/* Texto */}
              <div className="text-center">
                <h1 className="poppins-bold uppercase text-black">
                  Electrónica <br /> Zurita
                </h1>
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
                  className="mt-1 poppins-regular block w-full rounded-xl border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-2 text-black"
                />
              </div>

              {/* Contraseña */}
              <div className="mb-3">
                <label className="poppins-semibold">Contraseña</label>
                <div className="flex items-center mt-2">
                  <div className="flex-grow pr-1">
                    {" "}
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="********************"
                      name="password"
                      value={form.password || ""}
                      onChange={handleChange}
                      className=" poppins-regular block w-full rounded-xl border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-2 "
                      // Quita el borde derecho del input
                    />
                  </div>
                  <div className="flex-shrink-0 ">
                    {" "}
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="flex items-center justify-center bg-[#5B72C3] rounded-full w-10 h-9 hover:scale-100 hover:bg-[#3D53A0]"
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible className="text-white text-xl" />
                      ) : (
                        <AiOutlineEye className="text-white text-xl" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Botón de inicio de sesión */}
              <div className="mt-4">
                <button
                  type="submit"
                  className={`poppins-regular py-2 w-full block text-center bg-[#5B72C3] text-white border rounded-xl hover:scale-100 duration-300 hover:bg-[#3D53A0] hover:text-white mb-2 ${
                    loading ? "animate-pulse" : ""
                  }`}
                  disabled={loading} // Deshabilitar el botón mientras carga
                >
                  {loading ? "Cargando..." : "Iniciar sesión"}
                </button>
              </div>
            </form>
            {/* Mensaje de error */}
            {Object.keys(mensaje).length > 0 && (
              <Mensaje className="poppins-regular">{mensaje.respuesta}</Mensaje>
            )}

            {/* Olvidaste la contraseña */}
            <div className="mb-1">
              <Link
                to="/recuperar"
                className="poppins-regular underline text-black hover:text-gray-700"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <div className="mb-1">
              <Link
                to="/recuperar/cliente/:token"
                className="poppins-regular underline text-black hover:text-gray-700"
              >
                ¿Cambiar contrseña de cliente?
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
