import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Mensaje from "./Alertas/Mensaje";

export const FormularioEquipo = ({ equipo }) => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [mensaje, setMensaje] = useState({});
  const [form, setForm] = useState({
    clienteId: "",
    modelo: equipo?.modelo || "",
    marca: equipo?.marca || "",
    serie: equipo?.serie || "",
    color: equipo?.color || "",
    ingreso: equipo?.ingreso
      ? new Date(equipo.ingreso).toLocaleDateString("en-CA", {
          timeZone: "UTC",
        })
      : "",
    observaciones: equipo?.observaciones || "",
  });
  // Función para cargar la lista de clientes
  const cargarClientes = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/clientes`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.get(url, options);
      setClientes(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (
      !form.modelo ||
      !form.marca ||
      !form.serie ||
      !form.color ||
      !form.observaciones
    ) {
      setMensaje({
        respuesta: "Todos los campos obligatorios deben ser completados",
        tipo: false,
      });
      return;
    }

    // Validación de fecha de ingreso
    const fechaIngreso = new Date(form.ingreso);
    const fechaActual = new Date();

    if (fechaIngreso < fechaActual) {
      setMensaje({
        respuesta:
          "La fecha de ingreso debe ser igual o posterior a la fecha actual",
        tipo: false,
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const url = equipo?._id
        ? `${import.meta.env.VITE_BACKEND_URL}/cliente/actualizar/${equipo._id}`
        : `${import.meta.env.VITE_BACKEND_URL}/cliente/registro`;

      const method = equipo?._id ? "PUT" : "POST";

      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios(url, { ...form }, options);
      setMensaje({
        respuesta: equipo?._id
          ? "Cliente actualizado"
          : "Cliente registrado con éxito",
        tipo: true,
      });

      setTimeout(() => {
        navigate("/dashboard/listar");
      }, 3000);
    } catch (error) {
      setMensaje({
        respuesta: error.response?.data?.msg || "Error desconocido",
        tipo: false,
      });
    } finally {
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    }
  };

  return (
    <div className="p-8 w-full flex justify-center">
      <div className="xl:w-2/3 justify-center items-center">
        <form onSubmit={handleSubmit}>
          {Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )}

          <label
            htmlFor="clienteId"
            className="poppins-semibold text-black uppercase"
          >
            Cliente:
            <select
              id="clienteId"
              className="poppins-regular border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-3"
              name="clienteId"
              value={form.clienteId}
              onChange={handleChange}
            >
              <option value="">Seleccionar cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente._id} value={cliente._id}>
                  {cliente.nombre} {cliente.apellido}
                </option>
              ))}
            </select>
          </label>
          <label
            htmlFor="modelo"
            className="poppins-semibold text-black uppercase"
          >
            Modelo:
            <input
              id="modelo"
              type="text"
              className="poppins-regular border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-3"
              placeholder="Modelo del equipo"
              name="modelo"
              value={form.modelo}
              onChange={handleChange}
            />
          </label>

          <label
            htmlFor="marca"
            className="poppins-semibold text-black uppercase"
          >
            Marca:
            <input
              id="marca"
              type="text"
              className="poppins-regular border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-3"
              placeholder="Marca del equipo"
              name="marca"
              value={form.marca}
              onChange={handleChange}
            />
          </label>

          <label
            htmlFor="serie"
            className="poppins-semibold text-black uppercase"
          >
            Número de serie:
            <input
              id="serie"
              type="text"
              className="poppins-regular border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-3"
              placeholder="Número de serie del equipo"
              name="serie"
              value={form.serie}
              onChange={handleChange}
            />
          </label>

          <label
            htmlFor="color"
            className="poppins-semibold text-black uppercase"
          >
            Color del equipo:
            <input
              id="color"
              type="text"
              className="poppins-regular border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-3"
              placeholder="Color del equipo"
              name="color"
              value={form.color}
              onChange={handleChange}
            />
          </label>

          <label
            htmlFor="ingreso"
            className="poppins-semibold text-black uppercase"
          >
            Fecha de ingreso del equipo:
            <input
              id="ingreso"
              type="date"
              className="poppins-regular border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-3"
              placeholder="Fecha de ingreso del equipo"
              name="ingreso"
              value={form.ingreso}
              onChange={handleChange}
            />
          </label>

          <label
            htmlFor="observaciones"
            className="poppins-semibold text-black uppercase"
          >
            Observaciones:
            <textarea
              id="observaciones"
              type="text"
              className="poppins-regular border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-3"
              placeholder="Observaciones o daño del equipo"
              name="observaciones"
              value={form.observaciones}
              onChange={handleChange}
            />
          </label>

          <input
            type="submit"
            className="poppins-regular bg-[#5B72C3] green w-full p-3 text-white uppercase rounded-xl hover:bg-[#3D53A0] cursor-pointer transition-all"
            value={equipo?._id ? "Actualizar equipo" : "Registrar equipo"}
          />
        </form>
      </div>
    </div>
  );
};
