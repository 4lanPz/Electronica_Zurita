import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Mensaje from "../componets/Alertas/Mensaje";

export const Register = () => {
  const [mensaje, setMensaje] = useState({});
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones mejoradas
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Verificar si el correo electrónico es válido
    if (!form.email || !emailRegex.test(form.email)) {
      setMensaje({
        respuesta: "Por favor, ingresa un correo electrónico válido",
        tipo: false,
      });
      return;
    }

    // Verificar si la contraseña tiene al menos 6 caracteres (puedes ajustar el mínimo según tus necesidades)
    if (!form.password || form.password.length < 6) {
      setMensaje({
        respuesta: "La contraseña debe tener al menos 6 caracteres",
        tipo: false,
      });
      return;
    }

    // Verificar si el teléfono tiene exactamente 10 dígitos
    if (!form.telefono || !/^\d{10}$/.test(form.telefono)) {
      setMensaje({
        respuesta: "El teléfono debe tener exactamente 10 dígitos",
        tipo: false,
      });
      return;
    }

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/registro`;
      const respuesta = await axios.post(url, form);
      setMensaje({ respuesta: respuesta.data.msg, tipo: true });
      setForm({});
    } catch (error) {
      setMensaje({
        respuesta: error.response.data?.errors[0].msg,
        tipo: false,
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="absolute inset-0 bg-[url('/images/tecnico.jpg')] bg-no-repeat bg-cover bg-center opacity-70 blur-sm"></div>
        <div className="white p-10 rounded-xl z-10 lg:w-2/5 sm-2/5 w-auto absolute">
          
          <div className="flex items-center justify-center mb-5">
            {/* Imagen */}
            <img
              src="/images/logopag.jpg"
              alt="Logo"
              className="w-40 h-auto mr-3"
            />

            {/* Texto */}
            <div className="text-center">
              <h1 className="poppins-bold uppercase text-black">Registro</h1>
            </div>
          </div>
          <div className="text-center">
            {/* <small className="text-black block poppins-regular mb-2">
              Por favor ingrese la siguiente información
            </small> */}
          </div>
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-wrap mb-3">
              <div className="w-1/2 pr-2">
                <label className="mb-1 block poppins-semibold" htmlFor="nombre">
                  Nombre:
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={form.nombre || ""}
                  onChange={handleChange}
                  placeholder="Ingresa tu nombre"
                  className="poppins-regular block w-full rounded-xl border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-2 text-black"
                  required
                />
              </div>
              <div className="w-1/2 pl-2">
                <label
                  className="mb-1 block poppins-semibold"
                  htmlFor="apellido"
                >
                  Apellido:
                </label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={form.apellido || ""}
                  onChange={handleChange}
                  placeholder="Ingresa tu apellido"
                  className="poppins-regular block w-full rounded-xl border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-2 text-black"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-3">
              <div className="w-1/2 pr-2">
                <label className="mb-1 block poppins-semibold" htmlFor="RUC">
                  RUC:
                </label>
                <input
                  type="numer"
                  id="RUC"
                  name="RUC"
                  value={form.RUC || ""}
                  onChange={handleChange}
                  placeholder="Ingresa tu RUC"
                  className="poppins-regular block w-full rounded-xl border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-2 text-black"
                  required
                />
              </div>
              <div className="w-1/2 pl-2">
                <label
                  className="mb-1 block poppins-semibold"
                  htmlFor="telefono"
                >
                  Teléfono:
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={form.telefono || ""}
                  onChange={handleChange}
                  placeholder="Ingresa tu teléfono"
                  className="poppins-regular block w-full rounded-xl border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-2 text-black"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-3">
              <div className="w-1/2 pr-2">
                <label className="mb-1 block poppins-semibold" htmlFor="email">
                  Correo electrónico:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email || ""}
                  onChange={handleChange}
                  placeholder="Ingresa tu correo  "
                  className=" poppins-regular block w-full rounded-xl border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-2 text-black "
                  required
                />
              </div>
              <div className="w-1/2 pl-2">
                <label
                  className="mb-1 block poppins-semibold"
                  htmlFor="password"
                >
                  Contraseña:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password || ""}
                  onChange={handleChange}
                  placeholder="********************"
                  className="poppins-regular block w-full rounded-xl border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-2 text-black"
                  required
                />
              </div>
            </div>

            <button className="poppins-regular green text-white border py-2 w-full rounded-xl mt-3 hover:scale-105 duration-300 hover:bg-emerald-900 hover:text-white mb-0">
              Registrarse
            </button>
          </form>
          {Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )}

          <div className="border-black text-xs border-b-2 py-2 mt-0 opacity-20 mb-3"></div>

          <div className="poppins-regular flex justify-between items-center">
            <p>¿Ya tienes una cuenta?</p>
            <Link
              to="/"
              className="poppins-regular py-2 px-5 green text-white border rounded-xl hover:scale-105 duration-300 hover:bg-emerald-900 "
            >
              Iniciar sesión
            </Link>
            {/* <Link
              to="/login"
              className="py-2 px-5 bg-gray-500 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 "
            >
              Iniciar sesión
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};
