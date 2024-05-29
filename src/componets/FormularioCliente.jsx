import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Mensaje from "./Alertas/Mensaje";
import GoogleMaps from "./GoogleMaps";

export const FormularioCliente = ({ cliente }) => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({});
  const [form, setForm] = useState({
    nombre: cliente?.nombre || "", // string
    correo: cliente?.correo || "", // email
    telefono: cliente?.telefono || "", // number
    cedula: cliente?.cedula || "", // number
    frecuente: cliente?.frecuente || "", // boolean
    direccion: cliente?.direccion || "", // string
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "frecuente" ? value === "true" : value;
    setForm({
      ...form,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const url = cliente?._id
        ? `${import.meta.env.VITE_BACKEND_URL}/cliente/actualizar/${
            cliente._id
          }`
        : `${import.meta.env.VITE_BACKEND_URL}/cliente/registro`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = cliente?._id
        ? await axios.put(url, form, options)
        : await axios.post(url, form, options);

      if (response && response.data) {
        setMensaje({
          respuesta: cliente?._id
            ? "Cliente actualizado con éxito"
            : "Cliente registrado con éxito y correo enviado",
          tipo: true,
        });
        setTimeout(() => {
          navigate("/dashboard/listar");
        }, 3000);
      } else {
        setLoading(false);
        console.error("La respuesta no contiene 'data'");
      }
    } catch (error) {
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
      setLoading(false);
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    }
  };

  const setDireccion = (direccion) => {
    setForm({ ...form, direccion });
  };

  return (
    <div className="p-8 w-full flex justify-center">
      <div className="xl:w-2/3 justify-center items-center">
        <form onSubmit={handleSubmit}>
          {Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )}
          <div className="poppins-regular">
            <label
              htmlFor="nombre:"
              className="poppins-semibold text-black uppercase"
            >
              Nombre cliente:
            </label>
            <input
              id="nombre"
              type="text"
              className="border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-3"
              placeholder="Nombre y apellido del cliente"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-wrap">
            <div className="w-1/2 pr-2">
              <label
                htmlFor="telefono:"
                className="poppins-semibold text-black uppercase"
              >
                Teléfono / celular:
              </label>
              <input
                id="telefono"
                type="tel"
                className="border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-3"
                placeholder="Teléfono / celular del cliente"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
              />
            </div>
            <div className="w-1/2 pl-2">
              <label
                htmlFor="cedula:"
                className="poppins-semibold text-black uppercase"
              >
                Cédula:
              </label>
              <input
                id="cedula"
                type="tel"
                className="border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-3"
                placeholder="Cédula del cliente"
                name="cedula"
                value={form.cedula}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="correo:"
              className="poppins-semibold text-black uppercase"
            >
              Correo Electrónico:
            </label>
            <input
              id="correo"
              type="text"
              className="border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-3"
              placeholder="Correo electrónico del cliente"
              name="correo"
              value={form.correo}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="frecuente:"
              className="poppins-semibold text-black uppercase"
            >
              Cliente frecuente
            </label>
            <select
              id="frecuente"
              className="border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-3"
              name="frecuente"
              value={form.frecuente}
              onChange={handleChange}
            >
              <option value="">Seleccionar</option>
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="direccion:"
              className="poppins-semibold text-black uppercase"
            >
              Dirección
            </label>
            <input
              id="direccion"
              type="text"
              className="border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600"
              placeholder="Dirección"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
            />
          </div>

          <GoogleMaps setDireccion={setDireccion} />

          <input
            type="submit"
            className={`poppins-regular bg-[#5B72C3] w-full p-3 text-white uppercase rounded-xl hover:bg-[#3D53A0] cursor-pointer transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            value={
              loading
                ? "Cargando..."
                : cliente?._id
                ? "Actualizar cliente"
                : "Registrar cliente"
            }
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};
