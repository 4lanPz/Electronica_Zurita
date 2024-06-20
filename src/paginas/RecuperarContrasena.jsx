import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Mensaje from "../componets/Alertas/Mensaje";

export const RecuperarContrasena = () => {
  const [mensaje, setMensaje] = useState({});
  const [mail, setMail] = useState("");
  const [loading, setLoading] = useState(false); // Estado para controlar la carga

  const handleChange = (e) => {
    setMail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Activar la animación de carga

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/recuperar-password`;
      const respuesta = await axios.post(url, { email: mail });
      setMail("");
      setMensaje({ respuesta: respuesta.data.msg, tipo: true });
    } catch (error) {
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
    } finally {
      setLoading(false); // Desactivar la animación de carga
    }

    // El mensaje se ocultará después de 6 segundos
    setTimeout(() => {
      setMensaje({});
    }, 6000);
  };

  return (
    <>
      <div className="w-full h-screen relative">
        <div className="absolute inset-0 bg-[url('/images/tecnico.jpg')] bg-no-repeat bg-cover bg-center opacity-70 blur-sm"></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-auto lg:w-2/5 bg-white p-10 rounded-xl">
            <div>
              <div className="flex items-center justify-center mb-5">
                {/* Imagen */}
                <img
                  src="/images/logopag.jpg"
                  alt="Logo"
                  className="w-40 h-auto mr-3"
                />

                {/* Texto */}
                <div className="text-center">
                  <h1 className="poppins-bold uppercase text-black">
                    !Olvidé mi
                  </h1>
                  <h1 className="poppins-bold uppercase text-black">
                    contraseña¡
                  </h1>
                </div>
              </div>
              <div className="text-center">
                <small className="poppins-regular text-black block mt-4 ">
                  !Tranquilo técnico!
                </small>
                <small className="poppins-regular text-black block mb-4 ">
                  Le ayudamos a recuperar su contraseña
                </small>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-1">
                  <label className="mb-1 block poppins-semibold">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    placeholder="Ingrese su correo electrónico"
                    className="poppins-regular block w-full rounded-xl border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-2 text-black"
                    name="email"
                    onChange={handleChange}
                    value={mail}
                  />
                </div>

                <div className="mb-3">
                  <button
                    type="submit"
                    className={`poppins-regular bg-[#5267b4] text-white border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-[#3D53A0] hover:text-white ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading} // Deshabilita el botón mientras se carga
                  >
                    {loading ? "Cargando..." : "Enviar correo de recuperación"}
                  </button>
                </div>
              </form>
              {mensaje.respuesta && (
                <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
              )}

              <div className="border-black mt-1 text-xs border-b-2 py-2 opacity-20"></div>

              <div className="poppins-regular mt-3 text-sm flex justify-between items-center">
                <p>¿Recordaste tu contraseña?</p>
                <Link
                  to="/"
                  className="poppins-regular py-2 px-5 bg-[#5267b4] text-white border rounded-xl hover:scale-110 duration-300 hover:bg-[#3D53A0] hover:text-white"
                >
                  Iniciar sesión
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
