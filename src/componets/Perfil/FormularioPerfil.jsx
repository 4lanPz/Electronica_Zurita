import { useContext, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import Mensaje from "../Alertas/Mensaje";

const FormularioPerfil = () => {
  const [mensaje, setMensaje] = useState({});
  const { auth, actualizarPerfil } = useContext(AuthContext);
  const [form, setform] = useState({
    id: auth._id,
    nombre: auth.nombre || "",
    apellido: auth.apellido || "",
    telefono: auth.telefono || "",
    email: auth.email || "",
  });

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(form).includes("")) {
      setMensaje({
        respuesta: "Todos los campos deben ser ingresados",
        tipo: false,
      });
      setTimeout(() => {
        setMensaje({});
      }, 3000);
      return;
    }

    const resultado = await actualizarPerfil(form);
    setMensaje(resultado);
    setTimeout(() => {
      setMensaje({});
    }, 3000);
  };

  return (
    <>
    <div className="mt-5">
        <h1 className="poppins-bold font-black text-2xl text-black">
          Actualizar Datos Técnico
        </h1>
        <hr className="my-4" />
      </div>
    <form onSubmit={handleSubmit}>
      {Object.keys(mensaje).length > 0 && (
        <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
      )}

      <div className="flex flex-wrap mb-0">
        <div className="w-1/2 pr-2">
          <label
            htmlFor="nombre"
            className="poppins-semibold text-black uppercase"
          >
            Nombre:{" "}
          </label>
          <input
            id="nombre"
            type="text"
            className="poppins-regular border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl"
            placeholder="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="w-1/2 pl-2">
          <label
            htmlFor="apellido"
            className="poppins-semibold text-black uppercase"
          >
            Apellido:{" "}
          </label>
          <input
            id="apellido"
            type="text"
            className="poppins-regular border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl mb-5"
            placeholder="apellido"
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="telefono"
          className="poppins-semibold text-black uppercase"
        >
          Teléfono:{" "}
        </label>
        <input
          id="ditelefonoreccion"
          type="text"
          className="poppins-regular border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl mb-3"
          placeholder="telefono"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="poppins-semibold text-black uppercase"
        >
          Email:{" "}
        </label>
        <input
          id="email"
          type="text"
          className="poppins-regular border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl mb-5"
          placeholder="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="poppins-regular bg-[#5B72C3] w-full p-3 text-white uppercase rounded-xl hover:bg-[#3D53A0] cursor-pointer transition-all"
        value="Actualizar Datos"
      />
    </form>
    </>
  );
};

export default FormularioPerfil;
