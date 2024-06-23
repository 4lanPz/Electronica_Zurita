import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Mensaje from "../Alertas/Mensaje";
import axios from "axios";

const ModalNuevaProforma = ({ orden, piezas, total, handleClose, ordenId }) => {
  const [form, setForm] = useState({
    ...orden,
    piezas,
    total,
  });
  const [mensaje, setMensaje] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/proforma/registro/${ordenId}`;

      const response = await axios.post(url, {
        piezas: form.piezas,
        precioTotal: form.total,
      });

      // Si la petición es exitosa
      setMensaje({ respuesta: "Proforma registrada con éxito", tipo: true });
      setTimeout(() => {
        setMensaje({});
        navigate("/dashboard/listarOrdenes");
      }, 3000);
    } catch (error) {
      // Si hay un error en la petición
      console.error("Hubo un error inesperado:", error);
      setMensaje({ respuesta: "Hubo un error inesperado", tipo: false });
      setTimeout(() => {
        setMensaje({});
      }, 5000);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#2c3b73] lg:w-2/4 sm:w-3/4 h-4/5 rounded-lg overflow-y-scroll">
        <form className="p-10" onSubmit={handleSubmit}>
          <div className="w-full bg-white border border-slate-200 p-3 flex flex-col shadow-lg rounded-xl mb-2">
            <p className="poppins-bold text-black uppercase font-bold text-center mb-2">
              Proforma Orden {form.numOrden}
            </p>

            <div className="mb-2">
              <b className="poppins-semibold">Fecha de ingreso:</b>
              <p className="poppins-regular">
                {new Date(form.ingreso).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-wrap">
              <div className="w-1/2 pr-2">
                <div className="mb-2">
                  <b className="poppins-semibold">Equipo:</b>
                  <p className="poppins-regular">{form.equipo}</p>
                </div>
                <div className="mb-2">
                  <b className="poppins-semibold">Marca:</b>
                  <p className="poppins-regular">{form.marca}</p>
                </div>
                <div className="mb-2">
                  <b className="poppins-semibold">Color:</b>
                  <p className="poppins-regular">{form.color}</p>
                </div>
              </div>
              <div className="w-1/2 pl-2">
                <div className="mb-2">
                  <b className="poppins-semibold">Modelo:</b>
                  <p className="poppins-regular">{form.modelo}</p>
                </div>
                <div className="mb-2">
                  <b className="poppins-semibold">Serie:</b>
                  <p className="poppins-regular">{form.serie}</p>
                </div>
                <div className="mb-2">
                  <b className="poppins-semibold">Servicio:</b>
                  <p className="poppins-regular">{form.servicio}</p>
                </div>
              </div>
            </div>

            <div className="mb-2">
              <b className="poppins-semibold">Razón:</b>
              <p className="poppins-regular">{form.razon}</p>
            </div>
            <div className="mb-2">
              <b className="poppins-semibold ">Datos de piezas:</b>
              <table className="mt-3 w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="pl-3 poppins-semibold text-left border border-gray-300">
                      Pieza
                    </th>
                    <th className="pl-3 poppins-semibold text-left border border-gray-300">
                      Precio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {form.piezas.map(
                    (pieza, index) =>
                      // Validar si tanto pieza como precio están definidos
                      pieza.pieza.trim() !== "" &&
                      pieza.precio.trim() !== "" && (
                        <tr key={index}>
                          <td className="pl-3 oppins-regular border border-gray-300">
                            <input
                              type="text"
                              value={pieza.pieza}
                              onChange={(e) =>
                                setForm((prevForm) => ({
                                  ...prevForm,
                                  piezas: prevForm.piezas.map((p, idx) =>
                                    idx === index
                                      ? { ...p, pieza: e.target.value }
                                      : p
                                  ),
                                }))
                              }
                              className="p-1 w-full"
                            />
                          </td>
                          <td className="pl-3 poppins-regular border border-gray-300">
                            <input
                              type="text"
                              value={pieza.precio}
                              onChange={(e) =>
                                setForm((prevForm) => ({
                                  ...prevForm,
                                  piezas: prevForm.piezas.map((p, idx) =>
                                    idx === index
                                      ? { ...p, precio: e.target.value }
                                      : p
                                  ),
                                }))
                              }
                              className="p-1 w-full"
                            />
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
            <div className="">
              <b className="poppins-semibold">Total estimado:</b>
              <p className="poppins-regular">${form.total}</p>
            </div>
          </div>
          {Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )}

          <div className="flex justify-center gap-5 mt-3">
            <button
              type="submit"
              className="poppins-regular bg-[#5B72C3] green w-full p-3 text-white uppercase rounded-xl hover:bg-[#3D53A0] cursor-pointer transition-all"
              onClick={handleSubmit}
            >
              Registrar
            </button>
            <button
              type="button"
              className="poppins-regular sm:w-auto leading-3 text-center text-white px-6 py-4 rounded-lg bg-red-700 hover:bg-red-900"
              onClick={handleClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalNuevaProforma;
