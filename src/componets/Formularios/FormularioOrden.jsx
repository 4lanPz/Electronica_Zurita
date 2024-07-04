import { useState } from "react";
import axios from "axios";
import Mensaje from "../Alertas/Mensaje";
import { useFormik } from "formik";
import * as Yup from "yup";

export const FormularioOrden = ({ orden }) => {
  const [mensaje, setMensaje] = useState({});
  const [clienteInfo, setClienteInfo] = useState({
    nombre: "",
    correo: "",
    cedula: "",
    telefono: "",
  });
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      clienteId: orden?.clienteId || "",
      equipo: orden?.equipo || "",
      modelo: orden?.modelo || "",
      marca: orden?.marca || "",
      serie: orden?.serie || "",
      color: orden?.color || "",
      ingreso: orden?.ingreso || "",
      razon: orden?.razon || "",
      servicio: orden?.servicio || "Mantenimiento",
      cedula: "",
    },
    validationSchema: Yup.object({
      clienteId: Yup.string().required("Cliente es obligatorio"),
      equipo: Yup.string()
        .min(3, "Debe tener al menos 3 caracteres")
        .max(20, "No puede tener más de 30 caracteres")
        .required("Equipo es obligatorio"),
      modelo: Yup.string()
        .min(3, "Debe tener al menos 3 caracteres")
        .max(20, "No puede tener más de 30 caracteres")
        .required("Modelo es obligatorio"),
      marca: Yup.string()
        .min(3, "Debe tener al menos 3 caracteres")
        .max(20, "No puede tener más de 30 caracteres")
        .required("Marca es obligatoria"),
      serie: Yup.string()
        .max(20, "No puede tener más de 30 caracteres")
        .required("Número de serie es obligatorio"),
      color: Yup.string()
        .min(3, "Debe tener al menos 3 caracteres")
        .max(20, "No puede tener más de 30 caracteres")
        .required("Color es obligatorio"),
      ingreso: Yup.date()
        .nullable()
        .required("Fecha de ingreso es obligatoria"),
      razon: Yup.string()
        .min(3, "Debe tener al menos 10 caracteres")
        .required("Razón de ingreso es obligatoria"),
      servicio: Yup.string().required("Servicio es obligatorio"),
      cedula: Yup.string()
        .matches(/^[0-9]*$/, "La cédula solo puede contener números")
        .min(10, "La cédula debe contener al menos 10 números")
        .max(13, "El número de cédula debe tener como máximo 13 números")
        .required("El número de cédula es obligatorio"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
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
          data: values,
          ...options,
        });
        setLoading(false);
        setMensaje({
          respuesta: orden?._id
            ? "Orden Actualizada"
            : "Orden generada con éxito",
          tipo: true,
        });
        setTimeout(() => {
          setMensaje({});
        }, 5000);
        formik.resetForm(); // Resetea los valores del formulario
      } catch (error) {
        setMensaje({
          respuesta: error.response.data.msg,
          tipo: false,
        });
        setTimeout(() => {
          setMensaje({});
        }, 3000);
        setLoading(false);
        formik.resetForm(); // Resetea los valores del formulario
      }
    },
  });

  const handleBuscarCliente = async () => {
    formik.validateField("cedula");

    if (formik.errors.cedula) {
      setMensaje({
        respuesta: formik.errors.cedula,
        tipo: false,
      });
      setTimeout(() => {
        setMensaje({});
      }, 3000);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/clientes/cedula/${
        formik.values.cedula
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
        formik.setFieldValue("clienteId", cliente._id);
        setMensaje({
          respuesta: "Cliente encontrado",
          tipo: true,
        });
        setLoading(false);
        setTimeout(() => {
          setMensaje({});
        }, 3000);
      }
    } catch (error) {
      setMensaje({
        respuesta: "No existe un cliente con ese número de cédula",
        tipo: false,
      });
      setLoading(false);
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    }
  };

  return (
    <div className="p-8 w-full flex justify-center h-full">
      <div className="xl:w-2/3 justify-center items-center">
        <form onSubmit={formik.handleSubmit}>
          {Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )}
          <div className="flex flex-wrap max-[640px]:flex max-[640px]:flex-col">
            <div className="w-1/2 pr-5 max-[640px]:w-full max-[640px]:px-0">
              <label htmlFor="cedula" className="block">
                <span className="poppins-semibold text-black uppercase">
                  Número de cédula Cliente:
                </span>
                <input
                  id="cedula"
                  className="poppins-regular block w-full border-2 rounded-xl p-2 mt-2 placeholder-gray-700"
                  placeholder="Número de cédula del cliente"
                  name="cedula"
                  value={formik.values.cedula}
                  onChange={formik.handleChange}
                />
              </label>

              {formik.touched.cedula && formik.errors.cedula ? (
                <div className="text-red-500 poppins-regular">
                  {formik.errors.cedula}
                </div>
              ) : null}
              <div className="flex justify-center p-3 w-full">
                <button
                  type="button"
                  onClick={handleBuscarCliente}
                  className={`poppins-regular bg-[#5B72C3] green p-2 px-4 text-white uppercase rounded-xl hover:bg-[#3D53A0] cursor-pointer transition-all ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Buscando Cliente..." : "Buscar Cliente"}
                </button>
              </div>
            </div>
            <div className="w-1/2 pr-5 max-[640px]:w-full max-[640px]:px-0 max-[640px]:mb-3">
              <div className="  bg-white border border-slate-200 p-3 flex flex-col shadow-lg rounded-xl">
                <div className="flex items-center justify-center flex-wrap max-[800px]:flex max-[800px]:flex-col">
                  <div className="w-1/2 max-[800px]:w-full">
                    <b className="poppins-semibold">Cliente:</b>
                    <br />
                    <p className="poppins-regular">{clienteInfo.nombre}</p>
                  </div>
                  <div className="w-1/2 max-[800px]:w-full">
                    <b className="poppins-semibold">Télefono:</b>
                    <br />
                    <p className="poppins-regular">{clienteInfo.telefono}</p>
                  </div>
                </div>
                <div>
                  <b className="poppins-semibold">Correo electrónico:</b>
                  <br />
                  <p className="poppins-regular">{clienteInfo.correo}</p>
                </div>
              </div>
            </div>
          </div>

          <label htmlFor="equipo" className="poppins-semibold text-black">
            Equipo:
            <input
              id="equipo"
              type="text"
              className="poppins-regular border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-700"
              placeholder="Tipo de equipo"
              name="equipo"
              value={formik.values.equipo}
              onChange={formik.handleChange}
            />
            {formik.touched.equipo && formik.errors.equipo ? (
              <div className="text-red-500 poppins-regular">
                {formik.errors.equipo}
              </div>
            ) : null}
          </label>
          <div className="mt-2">
            <label htmlFor="modelo" className="poppins-semibold text-black ">
              Modelo:
              <input
                id="modelo"
                type="text"
                className="poppins-regular border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-700"
                placeholder="Modelo del equipo"
                name="modelo"
                value={formik.values.modelo}
                onChange={formik.handleChange}
              />
              {formik.touched.modelo && formik.errors.modelo ? (
                <div className="text-red-500 poppins-regular">
                  {formik.errors.modelo}
                </div>
              ) : null}
            </label>
          </div>
          <div className="mt-2">
            <label htmlFor="marca" className="block">
              <span className="poppins-semibold text-black uppercase">
                Marca:
              </span>
              <input
                id="marca"
                type="text"
                className="poppins-regular block w-full border-2 rounded-xl p-2 mt-2 placeholder-gray-700"
                placeholder="Marca del equipo"
                name="marca"
                value={formik.values.marca}
                onChange={formik.handleChange}
              />
              {formik.touched.marca && formik.errors.marca ? (
                <div className="text-red-500 poppins-regular">
                  {formik.errors.marca}
                </div>
              ) : null}
            </label>
          </div>
          <label htmlFor="serie" className="block mt-4">
            <span className="poppins-semibold text-black uppercase">
              Número de serie:
            </span>
            <input
              id="serie"
              type="text"
              className="poppins-regular block w-full border-2 rounded-xl p-2 mt-2 placeholder-gray-700"
              placeholder="Número de serie del equipo"
              name="serie"
              value={formik.values.serie}
              onChange={formik.handleChange}
            />
            {formik.touched.serie && formik.errors.serie ? (
              <div className="text-red-500 poppins-regular">
                {formik.errors.serie}
              </div>
            ) : null}
          </label>

          <label htmlFor="color" className="block mt-4">
            <span className="poppins-semibold text-black uppercase">
              Color del equipo:
            </span>
            <input
              id="color"
              type="text"
              className="poppins-regular block w-full border-2 rounded-xl p-2 mt-2 placeholder-gray-700"
              placeholder="Color del equipo"
              name="color"
              value={formik.values.color}
              onChange={formik.handleChange}
            />
            {formik.touched.color && formik.errors.color ? (
              <div className="text-red-500 poppins-regular">
                {formik.errors.color}
              </div>
            ) : null}
          </label>

          <label htmlFor="ingreso" className="block mt-4">
            <span className="poppins-semibold text-black uppercase">
              Fecha de ingreso del equipo:
            </span>
            <input
              id="ingreso"
              type="date"
              className="poppins-regular block w-full border-2 rounded-xl p-2 mt-2 placeholder-gray-700"
              placeholder="Fecha de ingreso del equipo"
              name="ingreso"
              value={formik.values.ingreso}
              onChange={formik.handleChange}
            />
            {formik.touched.ingreso && formik.errors.ingreso ? (
              <div className="text-red-500 poppins-regular">
                {formik.errors.ingreso}
              </div>
            ) : null}
          </label>

          <label htmlFor="razon" className="block mt-4">
            <span className="poppins-semibold text-black uppercase">
              Razón de ingreso:
            </span>
            <textarea
              id="razon"
              className="poppins-regular block w-full border-2 rounded-xl p-2 mt-2 placeholder-gray-700"
              placeholder="Razones de ingreso del equipo"
              name="razon"
              value={formik.values.razon}
              onChange={formik.handleChange}
            />
            {formik.touched.razon && formik.errors.razon ? (
              <div className="text-red-500 poppins-regular">
                {formik.errors.razon}
              </div>
            ) : null}
          </label>

          <label htmlFor="servicio" className="block mt-4">
            <span className="poppins-semibold text-black uppercase">
              Servicio:
            </span>
            <select
              id="servicio"
              className="poppins-regular block w-full border-2 rounded-xl p-2 mt-2 placeholder-gray-700"
              name="servicio"
              value={formik.values.servicio}
              onChange={formik.handleChange}
            >
              <option value="">Seleccionar servicio</option>
              <option value="Mantenimiento">Mantenimiento</option>
              <option value="Reparación">Reparación</option>
              <option value="Revisión">Revisión</option>
            </select>
            {formik.touched.servicio && formik.errors.servicio ? (
              <div className="text-red-500 poppins-regular mt-1">
                {formik.errors.servicio}
              </div>
            ) : null}
          </label>

          {Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )}

          <input
            type="submit"
            className={`poppins-regular bg-[#5B72C3] w-full p-3 text-white uppercase rounded-xl hover:bg-[#3D53A0] cursor-pointer transition-all mt-6 ${
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
