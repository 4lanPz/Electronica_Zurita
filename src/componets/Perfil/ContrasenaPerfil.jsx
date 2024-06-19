import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthContext from "../../context/AuthProvider";
import Mensaje from "../Alertas/Mensaje";

const ContrasenaPerfil = () => {
  const [mensaje, setMensaje] = useState({});
  const { actualizarPassword } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      passwordactual: "",
      passwordnuevo: "",
    },
    validationSchema: Yup.object({
      passwordactual: Yup.string().required(
        "La contraseña actual es obligatoria"
      ),
      passwordnuevo: Yup.string()
        .required("La nueva contraseña es obligatoria")
        .min(6, "La nueva contraseña debe tener al menos 6 caracteres"),
    }),
    onSubmit: async (values) => {
      const resultado = await actualizarPassword(values);
      setMensaje(resultado);
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    },
  });

  return (
    <>
      <div className="mt-5">
        <h1 className="poppins-bold text-black">
          Actualizar Contraseña
        </h1>
        <hr className="my-4" />
      </div>
      <form onSubmit={formik.handleSubmit}>
        {Object.keys(mensaje).length > 0 && (
          <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
        )}
        <div className="mb-3">
          <label
            htmlFor="passwordactual"
            className="poppins-semibold text-black uppercase"
          >
            Contraseña actual:{" "}
          </label>
          <input
            id="passwordactual"
            type="password"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl mb-3"
            placeholder="**************"
            name="passwordactual"
            value={formik.values.passwordactual}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.passwordactual && formik.errors.passwordactual ? (
            <div className="text-red-500">{formik.errors.passwordactual}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label
            htmlFor="passwordnuevo"
            className="poppins-semibold text-black uppercase"
          >
            Nueva contraseña:{" "}
          </label>
          <input
            id="passwordnuevo"
            type="password"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl mb-3"
            placeholder="**************"
            name="passwordnuevo"
            value={formik.values.passwordnuevo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.passwordnuevo && formik.errors.passwordnuevo ? (
            <div className="text-red-500">{formik.errors.passwordnuevo}</div>
          ) : null}
        </div>

        <input
          type="submit"
          className="poppins-regular bg-[#5B72C3] w-full p-3 text-white uppercase rounded-xl hover:bg-[#3D53A0] cursor-pointer transition-all"
          value="Actualizar Contraseña"
        />
      </form>
    </>
  );
};

export default ContrasenaPerfil;
