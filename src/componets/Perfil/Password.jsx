import { useState } from "react";
import Mensaje from "../Alertas/Mensaje";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const Password = () => {
  const [mensaje, setMensaje] = useState({});
  const { actualizarPassword } = useContext(AuthContext);
  const [form, setForm] = useState({
    passwordactual: "",
    passwordnuevo: "",
  });

  const handleChange = (e) => {
    setForm({
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

    if (form.passwordnuevo.length < 6) {
      setMensaje({
        respuesta: "El password debe tener mínimo 6 carácteres",
        tipo: false,
      });
      setTimeout(() => {
        setMensaje({});
      }, 3000);
      return;
    }

    const resultado = await actualizarPassword(form);
    setMensaje(resultado);
    setTimeout(() => {
      setMensaje({});
    }, 3000);
  };

  return (
    <>
      <div className="mt-5">
        <h1 className="poppins-bold font-black text-2xl text-black">
          Actualizar Contraseña
        </h1>
        <hr className="my-4" />
      </div>
      <form onSubmit={handleSubmit}>
        {Object.keys(mensaje).length > 0 && (
          <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
        )}
        <div>
          <label
            htmlFor="passwordactual"
            className="poppins-semibold text-black uppercase"
          >
            Contraseña actual:{" "}
          </label>
          <input
            id="passwordactual"
            type="password"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl mb-3"
            placeholder="**************"
            name="passwordactual"
            value={form.passwordactual}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="passwordnuevo"
            className="poppins-semibold text-black uppercase"
          >
            Nueva contraseña:{" "}
          </label>
          <input
            id="passwordnuevo"
            type="password"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl mb-3"
            placeholder="**************"
            name="passwordnuevo"
            value={form.passwordnuevo}
            onChange={handleChange}
          />
        </div>

        <input
          type="submit"
          className="poppins-regular bg-[#5B72C3] w-full p-3 text-white uppercase rounded-xl hover:bg-[#3D53A0] cursor-pointer transition-all"
          value="Actualizar contraseña"
        />
      </form>
    </>
  );
};

export default Password;
