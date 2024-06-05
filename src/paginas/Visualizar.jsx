import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Mensaje from "../componets/Alertas/Mensaje";
import ModalProforma from "../componets/Modals/ModalProforma";

const Visualizar = () => {
  const { id } = useParams();
  const [orden, setOrden] = useState({});
  const [mensaje, setMensaje] = useState({});
  const [piezas, setPiezas] = useState([{ pieza: "", precio: "" }]);
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

  const handlePiezaChange = (index, event) => {
    const { name, value } = event.target;
    const nuevasPiezas = [...piezas];
    nuevasPiezas[index][name] = value;
    setPiezas(nuevasPiezas);
  };

  const agregarPieza = () => {
    setPiezas([...piezas, { pieza: "", precio: "" }]);
  };

  const eliminarPieza = (index) => {
    const nuevasPiezas = [...piezas];
    nuevasPiezas.splice(index, 1);
    setPiezas(nuevasPiezas);
  };

  const calcularTotal = () => {
    return piezas.reduce(
      (total, pieza) => total + parseFloat(pieza.precio || 0),
      0
    );
  };

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
        <div className="w-full h-full flex flex-col items-center ">
          <div className="w-full mb-6 flex flex-col items-center ">
            <p className="poppins-semibold text-black  text-xl">
              Datos de la orden
            </p>
            <div className="poppins-regular mt-2 ">
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

          <div className="w-full mb-6 flex flex-col items-center">
            <p className="poppins-semibold text-black text-center text-xl mb-3">
              Datos de la proforma
            </p>
            {piezas.map((pieza, index) => (
              <div key={index} className="flex space-x-4 mb-2">
                <input
                  type="text"
                  name="pieza"
                  value={pieza.pieza}
                  onChange={(event) => handlePiezaChange(index, event)}
                  placeholder="Pieza"
                  className="poppins-regular p-2 border border-gray-300 rounded-xl "
                />
                <input
                  type="text"
                  name="precio"
                  value={pieza.precio}
                  onChange={(event) => handlePiezaChange(index, event)}
                  placeholder="Precio"
                  className="poppins-regular p-2 border border-gray-300 rounded-xl"
                />
                <button
                  onClick={() => eliminarPieza(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            ))}
            <button
              onClick={agregarPieza}
              className="mt-2 px-4 py-2 bg-[#5B72C3] text-white rounded-xl hover:bg-[#3D53A0]"
            >
              Agregar Pieza
            </button>
          </div>

          <button
            onClick={() => setModalVisible(true)}
            className="mt-4 px-5 py-2 bg-[#5B72C3] text-white rounded-xl hover:bg-[#3D53A0] cursor-pointer transition-all"
          >
            GENERAR PROFORMA
          </button>
        </div>
      </div>

      {modalVisible && (
        <ModalProforma
          orden={orden}
          piezas={piezas}
          total={calcularTotal()}
          handleClose={() => setModalVisible(false)}
        />
      )}
    </>
  );
};

export default Visualizar;
