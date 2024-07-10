import Mensaje from "../componets/Alertas/Mensaje";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RecuperarCliente = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({});
  const [tokenback, setTokenBack] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    password: "",
    confirmpassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("Campo requerido"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
      .required("Campo requerido"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/cliente/nuevo-passwordCli/${token}`;
      const respuesta = await axios.post(url, values);
      resetForm();
      setMensaje({ respuesta: respuesta.data.msg, tipo: true });
      setLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 6000);
    } catch (error) {
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
      setLoading(false);
    }
    setSubmitting(false);
  };

  const verifyToken = async () => {
    try {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/cliente/recuperar-password/${token}`;
      const respuesta = await axios.get(url);
      setTokenBack(true);
      setMensaje({ respuesta: respuesta.data.msg, tipo: true });
    } catch (error) {
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <div className="w-full h-screen relative">
      <div className="absolute inset-0 bg-[url('/images/tecnico.jpg')] bg-no-repeat bg-cover bg-center opacity-70 blur-sm"></div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-auto lg:w-2/5 bg-white p-10 rounded-xl max-w-2xl">
          <div className="flex flex-col items-center justify-center">
            {/* Encabezado */}
            <div className="flex items-center justify-center mb-8 max-[640px]:flex max-[640px]:flex-col">
              {/* Imagen */}
              <img
                src="/images/logopag.jpg"
                alt="Logo"
                className="w-40 h-auto mr-3"
              />

              {/* Texto */}
              <div className="text-center">
                <h1 className="poppins-bold uppercase text-black">
                  Recuperar Contraseña <br /> Cliente
                </h1>
              </div>
            </div>
            {Object.keys(mensaje).length > 0 && (
              <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
            )}
            {tokenback && (
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="w-full">
                    <div className="mb-3 mt-3">
                      <label className="poppins-semibold">
                        Ingresa tu nueva contraseña
                      </label>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Nueva contraseña"
                        className="mt-2 mb-3 poppins-regular block w-full rounded-xl border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-2 text-black"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500"
                      />
                      <label className="poppins-semibold">
                        Confirma tu nueva contraseña
                      </label>
                      <Field
                        type="password"
                        name="confirmpassword"
                        placeholder="Repite tu contraseña"
                        className="mt-2 poppins-regular block w-full rounded-xl border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-2 text-black"
                      />
                      <ErrorMessage
                        name="confirmpassword"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div className="mb-3">
                      <button
                        type="submit"
                        className={`poppins-regular py-2 px-5 w-full mt-3 bg-[#5B72C3] text-white border rounded-xl hover:scale-100 duration-300 hover:bg-[#3D53A0] hover:text-white ${
                          loading ? "animate-pulse" : ""
                        }`}
                        disabled={isSubmitting || loading}
                      >
                        {loading ? "Cargando..." : "Enviar nueva contraseña"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecuperarCliente;
