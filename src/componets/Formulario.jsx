import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Mensaje from "./Alertas/Mensaje";

export const Formulario = ({ paciente }) => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({});
  const [form, setForm] = useState({
    nombre: paciente?.nombre || "",
    propietario: paciente?.propietario || "",
    email: paciente?.email || "",
    celular: paciente?.celular || "",
    salida:
      new Date(paciente?.salida).toLocaleDateString("en-CA", {
        timeZone: "UTC",
      }) || "",
    convencional: paciente?.convencional || "",
    sintomas: paciente?.sintomas || "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (
      !form.nombre.trim() ||
      !form.propietario.trim() ||
      !form.email.trim() ||
      !form.celular.trim()
    ) {
      setMensaje({
        respuesta: "Todos los campos obligatorios deben ser completados",
        tipo: false,
      });
      return;
    }

    // Validación de formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      setMensaje({
        respuesta: "Ingrese un correo electrónico válido",
        tipo: false,
      });
      return;
    }

    //Validación de números de teléfono
    const phoneRegex = /^\d{10}$/;
    if (
      !phoneRegex.test(form.celular.trim()) ||
      (form.convencional.trim() && !phoneRegex.test(form.convencional.trim()))
    ) {
      setMensaje({
        respuesta: "Ingrese números de teléfono válidos",
        tipo: false,
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (paciente?._id) {
        // Actualización de paciente
        const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/actualizar/${
          paciente._id
        }`;
        const options = {
          headers: {
            method: "PUT",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.put(url, form, options);
        setMensaje({ respuesta: "Cliente actualizado", tipo: true });
      } else {
        // Registro de nuevo paciente
        const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/registro`;
        const options = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.post(url, form, options);
        setMensaje({ respuesta: "Cliente registrado con éxito", tipo: true });
        // await axios.post(url, form, options);
        // setMensaje({ respuesta: "Cliente registrado con éxito y correo enviado", tipo: true });
      }

      setTimeout(() => {
        navigate("/dashboard/listar");
      }, 3000);
    } catch (error) {
      setMensaje({
        respuesta: error.response?.data?.msg || "Error desconocido",
        tipo: false,
      });
    } finally {
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(mensaje).length > 0 && (
        <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
      )}
      <div className="poppins-regular">
        <label
          htmlFor="nombre:"
          className="poppins-semibold text-black uppercase"
        >
          Nombre cliente:{" "}
        </label>
        <input
          id="nombre"
          type="text"
          className="border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-3"
          placeholder="nombre de la mascota"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="propietario:"
          className="poppins-semibold text-black uppercase"
        >
          Nombre del propietario:{" "}
        </label>
        <input
          id="propietario"
          type="text"
          className="border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-3"
          placeholder="nombre del propietario"
          name="propietario"
          value={form.propietario}
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="email:"
          className="poppins-semibold text-black uppercase"
        >
          Email:{" "}
        </label>
        <input
          id="email"
          type="email"
          className="border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-3"
          placeholder="email del propietario"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="celular:"
          className="poppins-semibold text-black uppercase"
        >
          Celular:{" "}
        </label>
        <input
          id="celular"
          type="number"
          className="border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-3"
          placeholder="celular del propietario"
          name="celular"
          value={form.celular}
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="convencional:"
          className="poppins-semibold text-black uppercase"
        >
          Convencional:{" "}
        </label>
        <input
          id="convencional"
          type="number"
          className="border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-3"
          placeholder="convencional del propietario"
          name="convencional"
          value={form.convencional}
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="Salida:"
          className="poppins-semibold text-black uppercase"
        >
          Fecha de salida:{" "}
        </label>
        <input
          id="salida"
          type="date"
          className="border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-3"
          placeholder="salida"
          name="salida"
          value={form.salida}
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="sintomas:"
          className="poppins-semibold text-black uppercase"
        >
          Síntomas:{" "}
        </label>
        <textarea
          id="sintomas"
          type="text"
          className="border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-3"
          placeholder="Ingrese los síntomas de la mascota"
          name="sintomas"
          value={form.sintomas}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="poppins-regular bg-green-800 green w-full p-3 
        text-white uppercase rounded-xl
        hover:bg-emerald-900 cursor-pointer transition-all"
        value={paciente?._id ? "Actualizar paciente" : "Registrar paciente"}
      />
    </form>
  );
};
