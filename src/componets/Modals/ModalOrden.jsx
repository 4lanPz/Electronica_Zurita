import { useContext, useState } from "react";
import OrdenesContext from "../../context/OrdenesProvider";

const ModalOrden = ({ idOrden, clienteInfo}) => {
  const { setModal, handleModal, registrarOrdenes } =
    useContext(OrdenesContext);

  const [form, setform] = useState({
    // nombre: "",
    // cedula: "",
    // telefono: "",
    equipo: "",
    fecha: "",
    modelo: "",
    serie: "",
    reporte: "",
    razon: "",
    orden: idOrden,
  });

  console.log(form);
  const handleChange = (e) => {
    console.log("handleChange called");
    setform((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    registrarOrdenes(form);
    setModal(false);
  };

  return (
    <div className="lg:w-2/4 lg:h-3/5 bg-gray-800 bg-opacity-100 top-1/4 left-1/3 fixed sticky-0 rounded-lg overflow-y-scroll ">
      <p className="text-white uppercase font-bold text-lg text-center mt-4">
        Proforma
      </p>
      <form className="p-10" onSubmit={handleSubmit}>
        <div className=" w-auto bg-white border border-slate-200 p-3 flex flex-col shadow-lg rounded-xl">
          <div className="flex items-center justify-between flex-wrap md:flex-nowrap">
            <div className="">
              <div className="">
                <b className="poppins-semibold">Propietario:</b>
                <br />
                <p className="poppins-regular">{clienteInfo.nombre}</p>
              </div>
              <div className="flex items-center justify-center flex-wrap md:flex-nowrap">
                <div className="w-1/2">
                  <b className="poppins-semibold">Cédula:</b>
                  <br />
                  <p className="poppins-regular">{clienteInfo.cedula}</p>
                </div>
                <div className="w-1/2">
                  <b className="poppins-semibold">Télefono:</b>
                  <br />
                  <p className="poppins-regular">{clienteInfo.telefono}</p>
                </div>
              </div>
              <div className="">
                <b className="poppins-semibold">Fecha:</b>
                <br />
                <p className="poppins-regular">{clienteInfo.correo}</p>
              </div>
              <div className="">
                <b className="poppins-semibold">Artefacto:</b>
                <br />
                <p className="poppins-regular">{clienteInfo.correo}</p>
              </div>
              <div className="">
                <b className="poppins-semibold">Marca:</b>
                <br />
                <p className="poppins-regular">{clienteInfo.correo}</p>
              </div>
              <div className="">
                <b className="poppins-semibold">Número de serie:</b>
                <br />
                <p className="poppins-regular">{clienteInfo.correo}</p>
              </div>
              <div className="">
                <b className="poppins-semibold">Modelo:</b>
                <br />
                <p className="poppins-regular">{clienteInfo.correo}</p>
              </div>
              <div className="">
                <b className="poppins-semibold">Servicio:</b>
                <br />
                <p className="poppins-regular">{clienteInfo.correo}</p>
              </div>
              <div className="">
                <b className="poppins-semibold">Reporte de daño:</b>
                <br />
                <p className="poppins-regular">{clienteInfo.correo}</p>
              </div>
              <div className="">
                <b className="poppins-semibold">Razón de ingreso:</b>
                <br />
                <p className="poppins-regular">{clienteInfo.correo}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-5">
          <input
            type="submit"
            className="poppins-regular bg-[#5B72C3] green w-full p-3 text-white uppercase rounded-xl hover:bg-[#3D53A0] cursor-pointer transition-all"
            value="Registrar"
          />

          <button
            className="sm:w-auto leading-3 text-center text-white px-6 py-4 rounded-lg bg-red-700 hover:bg-red-900"
            onClick={handleModal}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalOrden;
