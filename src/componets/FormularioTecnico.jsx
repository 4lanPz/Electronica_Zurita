import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Mensaje from "../componets/Alertas/Mensaje";

export const FormularioTecnico = () => {
  const [mensaje, setMensaje] = useState({});
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    ruc: "",
    telefono: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    // Validaciones mejoradas
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Verificar si el correo electrónico es válido
    if (!form.email || !emailRegex.test(form.email)) {
      setLoading(false);
      setMensaje({
        respuesta: "Por favor, ingresa un correo electrónico válido",
        tipo: false,
      });
      return;
    }

    // Verificar si la contraseña tiene al menos 6 caracteres (puedes ajustar el mínimo según tus necesidades)
    if (!form.password || form.password.length < 6) {
      setLoading(false);
      setMensaje({
        respuesta: "La contraseña debe tener al menos 6 caracteres",
        tipo: false,
      });
      return;
    }

    // Verificar si el teléfono tiene exactamente 10 dígitos
    if (!form.telefono || !/^\d{10}$/.test(form.telefono)) {
      setLoading(false);
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
      setLoading(false);
      setTimeout(() => {
        navigate("/dashboard/registrarCliente");
      }, 3000);
    } catch (error) {
      setMensaje({
        respuesta: error.response.data?.errors[0].msg,
        tipo: false,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-4 w-full flex justify-center">
        <div className="xl:w-2/3 sm:w-3/4 justify-center items-center">
          <div className="text-center"></div>
          <form onSubmit={handleSubmit} className="mb-2">
            <div className="flex flex-wrap mb-3">
              <div className="w-1/2 pr-5">
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
              <div className="w-1/2 pl-5">
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
              <div className="w-1/2 pr-5">
                <label className="mb-1 block poppins-semibold" htmlFor="ruc">
                  Número de RUC:
                </label>
                <input
                  type="text"
                  id="ruc"
                  name="ruc"
                  value={form.ruc || ""}
                  onChange={handleChange}
                  placeholder="Ingresa tu número de RUC"
                  className="poppins-regular block w-full rounded-xl border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-2 text-black"
                  required
                />
              </div>
              <div className="w-1/2 pl-5">
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

            <div className="mt-3">
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

            <div className="mt-3 mb-3">
              <label className="mb-1 block poppins-semibold" htmlFor="password">
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
            {Object.keys(mensaje).length > 0 && (
              <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
            )}
            
              <button
                className={`w-full poppins-regular bg-[#5267b4] text-white border py-2  rounded-xl mt-3 duration-300 hover:bg-[#3D53A0] hover:text-white mb-0 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Cargando..." : "Registrar nuevo técnico"}
              </button>
            
          </form>
        </div>
      </div>
    </>
  );
};
