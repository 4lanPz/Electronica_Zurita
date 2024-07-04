import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthContext from "../../context/AuthProvider";
import Mensaje from "../Alertas/Mensaje";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ContrasenaPerfil = () => {
  const [mensaje, setMensaje] = useState({});
  const { actualizarPassword } = useContext(AuthContext);
  const [loading2, setLoading2] = useState(false);
  const [showPasswordActual, setShowPasswordActual] = useState(false);
  const [showPasswordNuevo, setShowPasswordNuevo] = useState(false);

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
        .min(6, "La nueva contraseña debe tener al menos 6 caracteres")
        .notOneOf(
          [Yup.ref("passwordactual"), null],
          "La nueva contraseña no puede ser igual a la contraseña actual"
        ),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading2(true);
      const resultado = await actualizarPassword(values);
      setMensaje(resultado);
      setLoading2(false);
      setTimeout(() => {
        setMensaje({});
      }, 3000);
      resetForm();
    },
  });

  const toggleShowPasswordActual = () => {
    setShowPasswordActual((prev) => !prev);
  };

  const toggleShowPasswordNuevo = () => {
    setShowPasswordNuevo((prev) => !prev);
  };

  return (
    <>
      <div className="max-[640px]:mb-5">
        <div className="mt-5">
          <h1 className="poppins-bold text-black">Actualizar Contraseña</h1>
          <hr className="my-4" />
        </div>
        <form onSubmit={formik.handleSubmit}>
          {Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )}
          <div className="mb-3">
            <label
              htmlFor="passwordactual"
              className="poppins-semibold text-black "
            >
              Contraseña actual:{" "}
            </label>
            <div className="flex items-center mt-2">
              <div className="flex-grow pr-1">
                <input
                  id="passwordactual"
                  type={showPasswordActual ? "text" : "password"}
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl mb-3"
                  placeholder="**************"
                  name="passwordactual"
                  value={formik.values.passwordactual}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="flex-shrink-0">
                <button
                  type="button"
                  onClick={toggleShowPasswordActual}
                  className="flex items-center justify-center bg-[#5B72C3] rounded-full w-10 h-9 hover:scale-100 hover:bg-[#3D53A0]"
                  aria-label={
                    showPasswordActual
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                >
                  {showPasswordActual ? (
                    <AiOutlineEyeInvisible className="text-white text-xl" />
                  ) : (
                    <AiOutlineEye className="text-white text-xl" />
                  )}
                </button>
              </div>
            </div>
            {formik.touched.passwordactual && formik.errors.passwordactual ? (
              <div className="text-red-500">{formik.errors.passwordactual}</div>
            ) : null}
          </div>

          <div className="mb-3">
            <label
              htmlFor="passwordnuevo"
              className="poppins-semibold text-black "
            >
              Nueva contraseña:{" "}
            </label>
            <div className="flex items-center mt-2">
              <div className="flex-grow pr-1">
                <input
                  id="passwordnuevo"
                  type={showPasswordNuevo ? "text" : "password"}
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl mb-3"
                  placeholder="**************"
                  name="passwordnuevo"
                  value={formik.values.passwordnuevo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="flex-shrink-0">
                <button
                  type="button"
                  onClick={toggleShowPasswordNuevo}
                  className="flex items-center justify-center bg-[#5B72C3] rounded-full w-10 h-9 hover:scale-100 hover:bg-[#3D53A0]"
                  aria-label={
                    showPasswordNuevo
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                >
                  {showPasswordNuevo ? (
                    <AiOutlineEyeInvisible className="text-white text-xl" />
                  ) : (
                    <AiOutlineEye className="text-white text-xl" />
                  )}
                </button>
              </div>
            </div>
            {formik.touched.passwordnuevo && formik.errors.passwordnuevo ? (
              <div className="text-red-500">{formik.errors.passwordnuevo}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className={`poppins-regular bg-[#5B72C3] w-full p-3 text-white rounded-xl hover:bg-[#3D53A0] cursor-pointer transition-all duration-300 ${
              loading2 ? "animate-pulse" : ""
            }`}
            disabled={loading2}
          >
            {loading2 ? "Cargando..." : "Actualizar Contraseña"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ContrasenaPerfil;
