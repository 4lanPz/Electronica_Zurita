import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Mensaje from "../componets/Alertas/Mensaje";

const Visualizar = () => {
  const { id } = useParams();
  const [orden, setOrden] = useState({});
  const [mensaje, setMensaje] = useState({});

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

  return (
    <>
      <div className="">
        <h1 className="poppins-bold text-4xl text-black text-center">
          Generar Proforma
        </h1>
        <hr className="my-4" />

        {Object.keys(mensaje).length > 0 && (
          <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
        )}
        <div className="w-full h-full flex flex-col items-center">
          <div className="flex flex-wrap mb-3">
            <div className="w-1/2 pr-2">
              <p className="poppins-semibold text-black text-center text-xl">
                Datos de la orden
              </p>
              <div className="poppins-regular mt-2">
                <p className="mt-3">
                  <span className="text-black uppercase font-bold">
                    * Número de orden:{" "}
                  </span>
                  {orden.numOrden}
                </p>
                <p className="mt-3">
                  <span className="text-black uppercase font-bold">
                    * Equipo:{" "}
                  </span>
                  {orden.equipo}
                </p>
                <p className="mt-3">
                  <span className="text-black uppercase font-bold">
                    * Modelo:{" "}
                  </span>
                  {orden.modelo}
                </p>
                <p className="mt-3">
                  <span className="text-black uppercase font-bold">
                    * Marca:{" "}
                  </span>
                  {orden.marca}
                </p>
                <p className="mt-3">
                  <span className="text-black uppercase font-bold">
                    * Serie:{" "}
                  </span>
                  {orden.serie}
                </p>
                <p className="mt-3">
                  <span className="text-black uppercase font-bold">
                    * Color:{" "}
                  </span>
                  {orden.color}
                </p>
                <p className="mt-3">
                  <span className="text-black uppercase font-bold">
                    * Fecha de ingreso:{" "}
                  </span>
                  {new Date(orden.ingreso).toLocaleDateString()}
                </p>
                <p className="mt-3">
                  <span className="text-black uppercase font-bold">
                    * Razón:{" "}
                  </span>
                  {orden.razon}
                </p>
                <p className="mt-3">
                  <span className="text-black uppercase font-bold">
                    * Fecha de salida:{" "}
                  </span>
                  {orden.salida
                    ? new Date(orden.salida).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="mt-3">
                  <span className="text-black uppercase font-bold">
                    * Servicio:{" "}
                  </span>
                  {orden.servicio}
                </p>
                <p className="mt-3">
                  <span className="text-black uppercase font-bold">
                    * Estado:{" "}
                  </span>
                  {orden.estado}
                </p>
              </div>
            </div>
            <div className="w-1/2 pl-2">
              <p className="poppins-semibold text-black text-center text-xl">
                Datos de la proforma
              </p>
            </div>
          </div>

          <button className="mt-4 px-5 py-2 bg-[#5B72C3] text-white rounded-lg hover:bg-[#3D53A0] cursor-pointer transition-all ">
            GENERAR PROFORMA
          </button>
        </div>
      </div>
    </>
  );
};

export default Visualizar;
