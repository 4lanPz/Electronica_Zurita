import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import axios from "axios";
import Mensaje from "../Alertas/Mensaje";
import ModalProforma from "../Modals/ModalNuevaProforma";

export const FormularioProforma = () => {
  const { id } = useParams();
  const [orden, setOrden] = useState({});
  const [loading, setLoading] = useState(false);
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

  const eliminarTodasLasPiezas = () => {
    setPiezas([]);
  };

  const calcularTotal = () => {
    return piezas.reduce(
      (total, pieza) => total + parseFloat(pieza.precio || 0),
      0
    );
  };

  const mostrarModal = () => {
    const piezasValidas = piezas.every(
      (pieza) =>
        pieza.pieza.trim() !== "" &&
        pieza.precio.trim() !== "" &&
        parseFloat(pieza.precio) > 0
    );

    if (piezasValidas) {
      setModalVisible(true);
    } else {
      setMensaje({
        respuesta:
          "Por favor no se aceptan piezas vacias o con precios iguales a 0",
        tipo: false,
      });
      setTimeout(() => {
        setMensaje({});
      }, 6000);
    }
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  const registrarProforma = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/proforma/registro/${id}`;
      const datosProforma = {
        ordenId: id,
        piezas,
        precioTotal: calcularTotal(),
      };
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.post(url, datosProforma, options);
      setLoading(false);
      setMensaje({
        respuesta: "Proforma registrada correctamente",
        tipo: true,
      });
      setTimeout(() => {
        setMensaje({});
      }, 40000);
    } catch (error) {
      setLoading(false);
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
      setTimeout(() => {
        setMensaje({});
      }, 70000);
    }
  };

  return (
    <>
      <div className="w-full">
        {Object.keys(orden).length === 0 ? (
          <p className="text-xl font-semibold">Cargando...</p>
        ) : (
          <>
            <div className="flex flex-col justify-center items-center ">
              <div className="poppins-semibold bg-white p-8 rounded-xl shadow-md mb-6 xl:w-2/3 sm:w-3/4">
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

              <div className="bg-white p-8 rounded-xl shadow-lg mb-6 xl:w-2/3 sm:w-4/5">
                <h2 className="poppins-semibold text-xl mb-4 text-center">
                  Piezas para la reparación
                </h2>
                <div className="grid gap-4">
                  {piezas.map((pieza, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-10 gap-4 items-center"
                    >
                      <div className="col-span-7">
                        <label
                          htmlFor={`pieza-${index}`}
                          className="poppins-semibold block mb-1"
                        >
                          Pieza N°{index + 1}
                        </label>
                        <input
                          type="text"
                          id={`pieza-${index}`}
                          name="pieza"
                          placeholder="Nombre de la pieza"
                          value={pieza.pieza}
                          onChange={(event) => handlePiezaChange(index, event)}
                          className="poppins-regular w-full p-2 border rounded-xl placeholder:text-gray-700"
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor={`precio-${index}`}
                          className="poppins-semibold block mb-1"
                        >
                          Precio
                        </label>

                        <input
                          type="number"
                          id={`precio-${index}`}
                          name="precio"
                          placeholder="$"
                          value={pieza.precio}
                          onChange={(event) => handlePiezaChange(index, event)}
                          className="poppins-regular w-full p-2 border rounded-xl placeholder:text-gray-700"
                        />
                      </div>
                      <div className="col-span-1 flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => eliminarPieza(index)}
                          className="bg-[#9b1746] hover:bg-[#af4369]  text-white p-2 rounded-xl mt-8"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap text-center">
                  <div className="w-1/2">
                    <button
                      type="button"
                      onClick={agregarPieza}
                      className="poppins-regular text-white px-4 py-2 rounded-xl bg-[#5267b4] hover:bg-[#3D53A0] mt-4"
                    >
                      Agregar Pieza
                    </button>
                  </div>
                  <div className="w-1/2">
                    <button
                      type="button"
                      onClick={eliminarTodasLasPiezas}
                      className="poppins-regular text-white px-4 py-2 rounded-xl bg-[#9b1746] hover:bg-[#af4369] mt-4"
                    >
                      Eliminar todas las piezas
                    </button>
                  </div>
                </div>
              </div>

              <div className=" rounded-xl w-2/4 sm:w-3/4 text-center">
                <h2 className="poppins-semibold text-xl ">
                  Total: ${calcularTotal().toFixed(2)}
                </h2>
              </div>
              {mensaje.respuesta && (
                <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
              )}
              <button
                onClick={mostrarModal}
                className={`poppins-regular px-4 py-2 w-1/5 block text-center bg-[#5B72C3] text-white border rounded-xl hover:scale-100 duration-300 hover:bg-[#3D53A0] hover:text-white mb-2 ${
                  loading ? "animate-pulse" : ""
                }`}
                disabled={loading} // Deshabilitar el botón mientras carga
              >
                {loading ? "Cargando..." : "Registrar Proforma"}
              </button>

              {modalVisible && (
                <ModalProforma
                  orden={orden}
                  piezas={piezas}
                  total={calcularTotal()}
                  handleClose={cerrarModal}
                  onConfirm={registrarProforma}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
