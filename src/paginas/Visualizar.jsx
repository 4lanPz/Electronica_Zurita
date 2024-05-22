import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import OrdenesContext from "../context/OrdenesProvider";
import ModalOrden from "../componets/Modals/ModalOrden";
import TablaProformas from "../componets/TablaProformas";
import Mensaje from "../componets/Alertas/Mensaje";
import AuthContext from "../context/AuthProvider";

const Visualizar = () => {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  const [mensaje, setMensaje] = useState({});
  const [cliente, setCliente] = useState({});
  const { modal, handleModal, ordenes, setOrdenes } =
    useContext(OrdenesContext);

  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setMinutes(
      nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset()
    );
    return new Intl.DateTimeFormat("es-EC", { dateStyle: "long" }).format(
      nuevaFecha
    );
  };

  useEffect(() => {
    const consultarCliente = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `${import.meta.env.VITE_BACKEND_URL}/cliente/${id}`;
        const options = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const respuesta = await axios.get(url, options);
        setCliente(respuesta.data.cliente);
        setOrdenes(respuesta.data.ordenes);
      } catch (error) {
        setMensaje({ respuesta: error.response.data.msg, tipo: false });
      }
    };
    consultarCliente();
  }, []);

  return (
    <>
      <div>
        <h1 className="poppins-bold text-center font-black text-4xl text-black">
          Proforma
        </h1>
        <hr className="my-4" />
        {Object.keys(mensaje).length > 0 && (
          <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
        )}
        <div className="flex items-center">
          {auth.rol === "tecnico" && (
            <button
              className="px-5 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700"
              onClick={handleModal}
            >
              Generar proforma
            </button>
          )}
        </div>
      </div>
      {modal && <ModalOrden idOrden={orden._id} />}
      <div>
        {Object.keys(orden).length != 0 ? (
          <>
            <div className="m-5 flex justify-between">
              <div>
                <p className="poppins-regular text-black mt-3">
                  <span className="poppins-semibold text-black uppercase ">
                    * Nombre del cliente:{" "}
                  </span>
                  {orden.nombre}
                </p>
                <p className="poppins-regular text-black mt-3">
                  <span className="poppins-semibold text-black uppercase ">
                    * Cédula:{" "}
                  </span>
                  {orden.propietario}
                </p>
                <p className="poppins-regular text-black mt-3">
                  <span className="poppins-semibold text-black uppercase ">
                    * Correo :{" "}
                  </span>
                  {orden.email}
                </p>
                <p className="poppins-regular text-black mt-3">
                  <span className="poppins-semibold text-black uppercase ">
                    * Teléfono:{" "}
                  </span>
                  {formatearFecha(orden.ingreso)}
                </p>
                <p className="poppins-regular text-black mt-3">
                  <span className="poppins-semibold text-black uppercase ">
                    * Equipo:{" "}
                  </span>
                  {formatearFecha(orden.ingreso)}
                </p>
                <p className="poppins-regular text-black mt-3">
                  <span className="poppins-semibold text-black uppercase ">
                    * Número de serie:{" "}
                  </span>
                  {formatearFecha(orden.ingreso)}
                </p>
                <p className="poppins-regular text-black mt-3">
                  <span className="poppins-semibold text-black uppercase ">
                    * Fecha de salida:{" "}
                  </span>
                  {formatearFecha(orden.salida)}
                </p>
                <p className="poppins-regular text-black mt-3">
                  <span className="poppins-semibold text-black uppercase ">
                    * Estado:{" "}
                  </span>
                  <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    {orden.estado && "activo"}
                  </span>
                </p>
                <p className="poppins-regular text-black mt-3">
                  <span className="poppins-semibold text-black uppercase ">
                    * Razón de ingreso:{" "}
                  </span>
                  {orden.sintomas}
                </p>
              </div>
            </div>
            <hr className="my-4" />
            <p className="mb-8">Proforma generada</p>
            {ordenes.length == 0 ? (
              <Mensaje tipo={"active"}>
                {"No existen registros de una proforma"}
              </Mensaje>
            ) : (
              <TablaProformas proformas={proformas} />
            )}
          </>
        ) : (
          Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )
        )}
      </div>
    </>
  );
};
export default Visualizar;
