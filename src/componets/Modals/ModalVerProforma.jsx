import React, { useState, useEffect } from "react";
import axios from "axios";

const ModalVerProforma = ({ orden, onCancel }) => {
  const [proformaData, setProformaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProformaData = async () => {
      if (!orden) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/proforma/orden/${orden._id}`
        );
        setProformaData(response.data.proforma);
        setError(null); // Limpiar errores si la solicitud fue exitosa
      } catch (error) {
        console.error("Error al obtener la proforma o no hay proforma");
      } finally {
        setLoading(false);
      }
    };
    // Llamada inicial para obtener los datos de la proforma al cargar el componente
    fetchProformaData();

    return () => {
      // Limpiar datos al desmontar el componente
      setProformaData(null);
    };
  }, [orden]);

  if (!orden) {
    return null; // Otra lógica de manejo si orden es null
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 ">
      <div className="bg-white lg:w-2/4 w-2/3 p-10 rounded-xl h-3/4 overflow-y-scroll">
        <div className="flex justify-between items-center">
          <h2 className="poppins-bold text-2xl text-center w-full">
            Proforma Orden {orden.numOrden}
          </h2>
        </div>
        {loading && <p className="poppins-semibold">Cargando proforma...</p>}
        {error && <p>{error}</p>}
        {!loading && !proformaData && (
          <p className="poppins-semibold">No hay proforma registrada</p>
        )}
        {proformaData && (
          <>
            <div className="mb-2">
              <b className="poppins-semibold">Fecha de ingreso:</b>
              <p className="poppins-regular">
                {new Date(orden.ingreso).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-wrap">
              <div className="w-1/2 pr-2">
                <div className="mb-2">
                  <b className="poppins-semibold">Equipo:</b>
                  <p className="poppins-regular">{orden.equipo}</p>
                </div>
                <div className="mb-2">
                  <b className="poppins-semibold">Marca:</b>
                  <p className="poppins-regular">{orden.marca}</p>
                </div>
                <div className="mb-2">
                  <b className="poppins-semibold">Color:</b>
                  <p className="poppins-regular">{orden.color}</p>
                </div>
              </div>
              <div className="w-1/2 pl-2">
                <div className="mb-2">
                  <b className="poppins-semibold">Modelo:</b>
                  <p className="poppins-regular">{orden.modelo}</p>
                </div>
                <div className="mb-2">
                  <b className="poppins-semibold">Serie:</b>
                  <p className="poppins-regular">{orden.serie}</p>
                </div>
              </div>
            </div>
            <div className="mb-2">
              <b className="poppins-semibold">Razón:</b>
              <p className="poppins-regular">{orden.razon}</p>
            </div>
            {proformaData.piezas && proformaData.piezas.length > 0 && (
              <div className="mb-2">
                <b className="poppins-semibold">Datos de piezas:</b>
                <table className="mt-3 w-full border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="poppins-semibold pl-3 text-left border border-gray-300">
                        Pieza
                      </th>
                      <th className=" poppins-semibold pl-3 text-left border border-gray-300">
                        Precio
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {proformaData.piezas.map((pieza, index) => (
                      <tr key={index}>
                        <td className="poppins-regular pl-3 border border-gray-300">
                          {pieza.pieza}
                        </td>
                        <td className="poppins-regular pl-3 border border-gray-300">
                          ${pieza.precio}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="mb-2">
              <b className="poppins-semibold">
                Total estimado:{" "}
                <span className="poppins-semibold">
                  ${proformaData.precioTotal}
                </span>
              </b>
            </div>
          </>
        )}
        <div className="flex justify-center gap-5 mt-5">
          <button
            className="poppins-regular bg-[#5B72C3] text-white p-3 rounded-xl hover:bg-[#3D53A0] w-2/3"
            onClick={onCancel}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalVerProforma;
