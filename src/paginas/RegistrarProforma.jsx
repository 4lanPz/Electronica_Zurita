import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import axios from "axios";
import Mensaje from "../componets/Alertas/Mensaje";
import ModalProforma from "../componets/Modals/ModalProforma";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  piezas: Yup.array().of(
    Yup.object().shape({
      pieza: Yup.string().required("La pieza es obligatoria"),
      precio: Yup.number()
        .typeError("Debe ser un número")
        .required("El precio es obligatorio")
        .min(0, "El precio debe ser mayor o igual a 0"),
    })
  ),
});

const RegistrarProforma = () => {
  const { id } = useParams();
  const [orden, setOrden] = useState({});
  const [mensaje, setMensaje] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const consultarOrden = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/orden/visualizar/${id}`;
        const options = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const respuesta = await axios.get(url, options);
        setOrden(respuesta.data.ordenes); // Accede a la propiedad "ordenes" en la respuesta
      } catch (error) {
        setMensaje({ respuesta: "Error", tipo: true });
      }
    };
    consultarOrden();
  }, [id]);

  const initialValues = {
    piezas: [{ pieza: "", precio: "" }],
  };

  const calcularTotal = (piezas) => {
    return piezas.reduce(
      (total, pieza) => total + parseFloat(pieza.precio || 0),
      0
    );
  };

  const mostrarModal = () => {
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div className="w-full">
        {Object.keys(orden).length === 0 ? (
          <p className="text-xl font-semibold">Cargando...</p>
        ) : (
          <>
            <h1 className="poppins-bold text-center text-4xl font-bold ">
              Generación de proforma
            </h1>
            <hr className="my-4" />
            <div className="flex flex-col justify-center items-center ">
              <div className="poppins-semibold bg-white p-8 rounded-xl shadow-md mb-6 w-2/3 sm:w-3/4">
                <h2 className="text-xl mb-4 text-center">
                  Datos de la orden {orden.numOrden}
                </h2>

                <div className="flex flex-wrap mb-1">
                  <div className="w-1/2 pr-2">
                    <p className="mb-1">
                      Cliente:{" "}
                      <span className="poppins-regular">
                        {" "}
                        {orden.cliente.nombre}
                      </span>
                    </p>
                  </div>
                  <div className="w-1/2 pl-2">
                    <p className="mb-1">
                      Cédula:{" "}
                      <span className="poppins-regular">
                        {" "}
                        {orden.cliente.cedula}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap mb-1">
                  <div className="w-1/2 pr-2">
                    <p className="mb-1">
                      Equipo:{" "}
                      <span className="poppins-regular"> {orden.equipo}</span>
                    </p>
                  </div>
                  <div className="w-1/2 pl-2">
                    <p className="mb-1">
                      Marca:{" "}
                      <span className="poppins-regular"> {orden.marca}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap mb-1">
                  <div className="w-1/2 pr-2">
                    <p className="mb-1">
                      Modelo:{" "}
                      <span className="poppins-regular"> {orden.modelo}</span>
                    </p>
                  </div>
                  <div className="w-1/2 pl-2">
                    <p className="mb-1">
                      Serie:{" "}
                      <span className="poppins-regular"> {orden.serie}</span>
                    </p>
                  </div>
                </div>
                <p className="mb-1">
                  Fecha de Ingreso:{" "}
                  <span className="poppins-regular">
                    {" "}
                    {new Date(orden.ingreso).toLocaleDateString()}
                  </span>
                </p>

                <p className="mb-1">
                  Razón: <span className="poppins-regular"> {orden.razon}</span>
                </p>
              </div>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  // Lógica para enviar los datos al backend
                  mostrarModal();
                }}
              >
                {({ values }) => (
                  <Form className="bg-white p-8 rounded-xl shadow-lg mb-6 w-2/4 sm:w-3/4">
                    <h2 className="poppins-semibold text-xl mb-4 text-center">
                      Piezas para la reparación
                    </h2>
                    <FieldArray name="piezas">
                      {({ insert, remove, push }) => (
                        <>
                          {values.piezas.length > 0 &&
                            values.piezas.map((pieza, index) => (
                              <div
                                key={index}
                                className="grid grid-cols-10 gap-4 items-center mb-2"
                              >
                                <div className="col-span-7">
                                  <label
                                    htmlFor={`piezas.${index}.pieza`}
                                    className="poppins-semibold block mb-1"
                                  >
                                    Pieza N°{index + 1}
                                  </label>
                                  <Field
                                    name={`piezas.${index}.pieza`}
                                    placeholder="Nombre de la pieza"
                                    type="text"
                                    className="poppins-regular w-full p-2 border rounded-xl"
                                  />
                                  <ErrorMessage
                                    name={`piezas.${index}.pieza`}
                                    component="div"
                                    className="text-red-500 text-sm"
                                  />
                                </div>
                                <div className="col-span-2">
                                  <label
                                    htmlFor={`piezas.${index}.precio`}
                                    className="poppins-semibold block mb-1"
                                  >
                                    Precio
                                  </label>
                                  <Field
                                    name={`piezas.${index}.precio`}
                                    placeholder="Precio"
                                    type="number"
                                    className="poppins-regular w-full p-2 border rounded-xl"
                                  />
                                  <ErrorMessage
                                    name={`piezas.${index}.precio`}
                                    component="div"
                                    className="text-red-500 text-sm"
                                  />
                                </div>
                                <div className="col-span-1 flex items-center justify-center">
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="bg-[#9b1746] text-white p-2 rounded-xl mt-8"
                                  >
                                    <FiTrash2 />
                                  </button>
                                </div>
                              </div>
                            ))}
                          <button
                            type="button"
                            onClick={() => push({ pieza: "", precio: "" })}
                            className="poppins-regular text-white px-4 py-2 rounded-xl bg-[#5267b4] hover:bg-[#3D53A0] mt-4"
                          >
                            Agregar Pieza
                          </button>
                        </>
                      )}
                    </FieldArray>
                    <div className="mt-4">
                      <h2 className="poppins-semibold text-xl mb-4">Total</h2>
                      <p className="poppins-semibold text-2xl font-bold">
                        ${calcularTotal(values.piezas).toFixed(2)}
                      </p>
                    </div>
                    {mensaje.respuesta && (
                      <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                    )}
                    <button
                      type="submit"
                      className="poppins-regular text-white px-4 py-2 rounded-xl w-full bg-[#5267b4] hover:bg-[#3D53A0] mt-4"
                    >
                      Registrar Proforma
                    </button>
                  </Form>
                )}
              </Formik>
              {modalVisible && (
                <ModalProforma
                  orden={orden}
                  piezas={initialValues.piezas}
                  total={calcularTotal(initialValues.piezas)}
                  handleClose={cerrarModal}
                  ordenId={id} // Pasar ordenId correctamente
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RegistrarProforma;
