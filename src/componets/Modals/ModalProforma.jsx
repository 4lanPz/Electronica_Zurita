import { useState } from "react";

const ModalProforma = ({ orden, piezas, total, handleClose }) => {
  const [form, setForm] = useState({
    ...orden,
    piezas,
    total,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar la proforma
    console.log("Proforma enviada:", form);
    handleClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#2c3b73] w-2/4 h-4/5 rounded-lg overflow-y-scroll">
        <form className="p-10" onSubmit={handleSubmit}>
          <div className="w-full bg-white border border-slate-200 p-3 flex flex-col shadow-lg rounded-xl mb-2">
            <p className="poppins-bold text-black uppercase font-bold text-center mb-2">
              Proforma
            </p>
            <div className="mb-2">
              <b className="poppins-semibold">Número de orden:</b>
              <p className="poppins-regular">{form.numOrden}</p>
            </div>
            <div className="mb-2">
              <b className="poppins-semibold">Fecha de ingreso:</b>
              <p className="poppins-regular">
                {new Date(form.ingreso).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-wrap mb-3">
              <div className="w-1/2 pr-2">
                <div className="mb-2">
                  <b className="poppins-semibold">Equipo:</b>
                  <p className="poppins-regular">{form.equipo}</p>
                </div>
              </div>
              <div className="w-1/2 pl-2">
                <div className="mb-2">
                  <b className="poppins-semibold">Modelo:</b>
                  <p className="poppins-regular">{form.modelo}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap mb-3">
              <div className="w-1/2 pr-2">
                <div className="mb-2">
                  <b className="poppins-semibold">Marca:</b>
                  <p className="poppins-regular">{form.marca}</p>
                </div>
              </div>
              <div className="w-1/2 pl-2">
                <div className="mb-2">
                  <b className="poppins-semibold">Serie:</b>
                  <p className="poppins-regular">{form.serie}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap mb-3">
              <div className="w-1/2 pr-2">
                <div className="mb-2">
                  <b className="poppins-semibold">Color:</b>
                  <p className="poppins-regular">{form.color}</p>
                </div>
              </div>
              <div className="w-1/2 pl-2">
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
              <b className="poppins-semibold">Piezas y precios:</b>
              {form.piezas.map((pieza, index) => (
                <p key={index} className="poppins-regular">
                  {pieza.pieza}: ${pieza.precio}
                </p>
              ))}
            </div>
            <div className="mb-2">
              <b className="poppins-semibold">Total:</b>
              <p className="poppins-regular">${form.total}</p>
            </div>
          </div>
          <div className="flex justify-center gap-5">
            <input
              type="submit"
              className="poppins-regular bg-[#5B72C3] green w-full p-3 text-white uppercase rounded-xl hover:bg-[#3D53A0] cursor-pointer transition-all"
              value="Registrar"
            />
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

export default ModalProforma;
