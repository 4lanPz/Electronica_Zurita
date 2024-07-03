import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Mensaje from "../Alertas/Mensaje";
import GoogleMaps from "../GoogleMaps";

export const FormularioCliente = ({ cliente }) => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({});
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      nombre: cliente?.nombre || "",
      correo: cliente?.correo || "",
      telefono: cliente?.telefono || "",
      cedula: cliente?.cedula || "",
      frecuente: cliente?.frecuente || "",
      direccion: cliente?.direccion || "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "El nombre no puede contener números")
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .required("El nombre es obligatorio"),
      correo: Yup.string()
        .email("Correo electrónico no válido")
        .required("El correo electrónico es obligatorio"),
      telefono: Yup.string()
        .matches(/^[0-9]*$/, "El teléfono solo puede contener números")
        .min(6, "El teléfono debe tener al menos 6 números")
        .max(10, "El teléfono debe tener 10 números")
        .required("El teléfono es obligatorio"),
      cedula: Yup.string()
        .matches(/^[0-9]*$/, "La cédula solo puede contener números")
        .min(10, "La cédula debe contener al menos 10 números")
        .max(13, "El número de cédula debe tener como máximo 13 números")
        .required("El número de cédula es obligatorio"),
      frecuente: Yup.boolean().required(
        "La frecuencia del cliente es obligatoria"
      ),
      direccion: Yup.string().required("La dirección es obligatoria"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
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
          ? await axios.put(url, values, options)
          : await axios.post(url, values, options);

        if (response && response.data) {
          setMensaje({
            respuesta: cliente?._id
              ? "Cliente actualizado con éxito"
              : "Cliente registrado con éxito y correo enviado",
            tipo: true,
          });
          setTimeout(() => {}, 3000);
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
    },
  });

  const setDireccion = (direccion) => {
    formik.setFieldValue("direccion", direccion);
  };

  return (
    <div className="p-8 w-full flex justify-center">
      <div className="xl:w-2/3 justify-center items-center">
        <form onSubmit={formik.handleSubmit}>
          <div className="poppins-regular">
            <label
              htmlFor="nombre"
              className="poppins-semibold text-black uppercase"
            >
              Nombre cliente:
            </label>
            <input
              id="nombre"
              type="text"
              className="border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 "
              placeholder="Nombre y apellido del cliente"
              name="nombre"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.nombre && formik.errors.nombre ? (
              <div className="text-red-500 poppins-regular">
                {formik.errors.nombre}
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap mt-3 max-[640px]:flex max-[640px]:flex-col">
            <div className="w-1/2 pr-2 max-[640px]:w-full max-[640px]:px-0">
              <label
                htmlFor="telefono"
                className="poppins-semibold text-black uppercase"
              >
                Teléfono / celular:
              </label>
              <input
                id="telefono"
                type="tel"
                className="border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600"
                placeholder="Teléfono / celular del cliente"
                name="telefono"
                value={formik.values.telefono}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.telefono && formik.errors.telefono ? (
                <div className="text-red-500 poppins-regular">
                  {formik.errors.telefono}
                </div>
              ) : null}
            </div>
            <div className="w-1/2 pl-2 max-[640px]:w-full max-[640px]:px-0">
              <label
                htmlFor="cedula"
                className="poppins-semibold text-black uppercase"
              >
                Cédula:
              </label>
              <input
                id="cedula"
                type="tel"
                className="border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600"
                placeholder="Cédula del cliente"
                name="cedula"
                value={formik.values.cedula}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.cedula && formik.errors.cedula ? (
                <div className="text-red-500 poppins-regular">
                  {formik.errors.cedula}
                </div>
              ) : null}
            </div>
          </div>
          <div className="mt-3">
            <label
              htmlFor="correo"
              className="poppins-semibold text-black uppercase"
            >
              Correo Electrónico:
            </label>
            <input
              id="correo"
              type="email"
              className="border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600"
              placeholder="Correo electrónico del cliente"
              name="correo"
              value={formik.values.correo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.correo && formik.errors.correo ? (
              <div className="text-red-500 poppins-regular">
                {formik.errors.correo}
              </div>
            ) : null}
          </div>
          <div className="mt-3">
            <label
              htmlFor="frecuente"
              className="poppins-semibold text-black uppercase"
            >
              Cliente frecuente
            </label>
            <select
              id="frecuente"
              className="border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600"
              name="frecuente"
              value={formik.values.frecuente}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Seleccionar</option>
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
            {formik.touched.frecuente && formik.errors.frecuente ? (
              <div className="text-red-500 poppins-regular">
                {formik.errors.frecuente}
              </div>
            ) : null}
          </div>

          <div className="mt-3">
            <label
              htmlFor="direccion"
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
              value={formik.values.direccion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.direccion && formik.errors.direccion ? (
              <div className="text-red-500 poppins-regular">
                {formik.errors.direccion}
              </div>
            ) : null}
          </div>

          <GoogleMaps
            direccion={formik.values.direccion}
            setDireccion={setDireccion}
          />

          {Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )}
          <input
            type="submit"
            className={`mt-5 poppins-regular bg-[#5B72C3] w-full p-3 text-white uppercase rounded-xl hover:bg-[#3D53A0] cursor-pointer transition-all ${
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
