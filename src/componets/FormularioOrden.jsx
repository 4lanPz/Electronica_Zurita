import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Mensaje from "./Alertas/Mensaje";

export const FormularioOrden = ({ orden }) => {
  const navigate = useNavigate();
  const [mensajeCliente, setMensajeCliente] = useState({});
  const [mensajeFormulario, setMensajeFormulario] = useState({});
  const [clienteInfo, setClienteInfo] = useState({
    nombre: " ",
    correo: " ",
    cedula: " ",
    telefono: " ",
  });
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    clienteId: orden?.clienteId || "", //string
    equipo: orden?.equipo || "", //string
    modelo: orden?.modelo || "", //string
    marca: orden?.marca || "", //string
    serie: orden?.serie || "", //string
    color: orden?.color || "", //string
    ingreso: orden?.ingreso || "", //string o vacío
    razon: orden?.razon || "", //string
    servicio: orden?.servicio || "Mantenimiento", //string
    estado: orden?.estado || "Pendiente", //string
    cedula: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    // Validaciones básicas
    if (
      !form.equipo ||
      !form.modelo ||
      !form.marca ||
      !form.serie ||
      !form.color ||
      !form.razon
    ) {
      setMensajeFormulario({
        respuesta: "Todos los campos obligatorios deben ser completados",
        tipo: false,
      });
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const url = orden?._id
        ? `${import.meta.env.VITE_BACKEND_URL}/orden/actualizar/${orden._id}`
        : `${import.meta.env.VITE_BACKEND_URL}/orden/registro`;

      const method = orden?._id ? "PUT" : "POST";

      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios({
        url,
        method,
        data: form,
        ...options,
      });

      setMensajeFormulario({
        respuesta: orden?._id
          ? "Orden Actualizada"
          : "Orden generada con éxito",
        tipo: true,
      });
      setLoading(false);
      setTimeout(() => {
        navigate("/dashboard/listarordenes");
      }, 3000);
    } catch (error) {
      setMensajeFormulario({
        respuesta: error.response?.data?.msg || "Error desconocido",
        tipo: false,
      });
      setLoading(false);
    } finally {
      setTimeout(() => {
        setMensajeFormulario({});
      }, 3000);
      setLoading(false);
    }
  };

  const handleBuscarCliente = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/clientes/cedula/${
        form.cedula
      }`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const respuesta = await axios.get(url, options);
      const cliente = respuesta.data;

      if (cliente) {
        setClienteInfo({
          nombre: cliente.nombre,
          correo: cliente.correo,
          cedula: cliente.cedula,
          telefono: cliente.telefono,
        });
        setForm({
          ...form,
          clienteId: cliente._id,
        });
        setMensajeCliente({
          respuesta: "Cliente encontrado",
          tipo: true,
        });
        setLoading(false);
        setTimeout(() => {
          setMensajeCliente({});
        }, 5000);
      }
    } catch (error) {
      setMensajeCliente({
        respuesta: "No se ha encontrado un cliente con ese número de cédula",
        tipo: false,
      });
      setLoading(false);
      setTimeout(() => {
        setMensajeCliente({});
      }, 5000);
    }
  };

  return (
    <div className="p-8 w-full flex justify-center">
      <div className="xl:w-2/3 justify-center items-center">
        <form onSubmit={handleSubmit}>
          {Object.keys(mensajeCliente).length > 0 && (
            <Mensaje tipo={mensajeCliente.tipo}>
              {mensajeCliente.respuesta}
            </Mensaje>
          )}
          <div className="flex flex-wrap mb-3">
            <div className="w-1/2 pr-10 pl-5">
              <label
                htmlFor="cedula"
                className="poppins-semibold text-black uppercase"
              >
                Número de cédula Cliente:
                <input
                  id="cedula"
                  className="poppins-regular border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600"
                  placeholder="Número de cedula del cliente"
                  name="cedula"
                  value={form.cedula}
                  onChange={handleChange}
                ></input>
              </label>
              <div className="flex justify-center p-3">
                <button
                  type="button"
                  onClick={handleBuscarCliente}
                  className={`poppins-regular bg-[#5B72C3] green p-2 text-white uppercase rounded-xl hover:bg-[#3D53A0] cursor-pointer transition-all w-2/3 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Buscando Cliente..." : "Buscar Cliente"}
                </button>
              </div>
            </div>
            <div className="w-1/2 pl-10 pr-5">
              <div className="  bg-white border border-slate-200 p-3 flex flex-col shadow-lg rounded-xl">
                <div className="">
                  <div className="flex items-center justify-center flex-wrap md:flex-nowrap ">
                    <div className="w-1/2">
                      <b className="poppins-semibold">Cliente:</b>
                      <br />
                      <p className="poppins-regular">{clienteInfo.nombre}</p>
                    </div>
                    <div className="w-1/2 pl-2">
                      <b className="poppins-semibold">Télefono:</b>
                      <br />
                      <p className="poppins-regular">{clienteInfo.telefono}</p>
                    </div>
                  </div>
                  <div className="">
                    <b className="poppins-semibold">Correo electrónico:</b>
                    <br />
                    <p className="poppins-regular">{clienteInfo.correo}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <label
            htmlFor="equipo"
            className="poppins-semibold text-black uppercase"
          >
            Equipo:
            <input
              id="equipo"
              type="text"
              className="poppins-regular border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-3"
              placeholder="Tipo de equipo"
              name="equipo"
              value={form.equipo}
              onChange={handleChange}
            />
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
            htmlFor="razon"
            className="poppins-semibold text-black uppercase"
          >
            Razón de ingreso:
            <textarea
              id="razon"
              type="text"
              className="poppins-regular border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 "
              placeholder="Razones de ingreso del equipo"
              name="razon"
              value={form.razon}
              onChange={handleChange}
            />
          </label>

          <label
            htmlFor="servicio"
            className="poppins-semibold text-black uppercase mt-0"
          >
            Servicio:
            <select
              id="servicio"
              className="poppins-regular border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-5"
              name="servicio"
              value={form.servicio}
              onChange={handleChange}
            >
              <option value="">Seleccionar servicio</option>
              <option value="Mantenimiento">Mantenimiento</option>
              <option value="Reparación">Reparación</option>
              <option value="Revisión">Revisión</option>
            </select>
          </label>
          {Object.keys(mensajeFormulario).length > 0 && (
            <Mensaje tipo={mensajeFormulario.tipo}>
              {mensajeFormulario.respuesta}
            </Mensaje>
          )}
          <input
            type="submit"
            className={`poppins-regular bg-[#5B72C3] w-full p-3 text-white uppercase rounded-xl hover:bg-[#3D53A0] cursor-pointer transition-all mt-3 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            value={orden?._id ? "Actualizar Orden" : "Registrar Orden"}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};
