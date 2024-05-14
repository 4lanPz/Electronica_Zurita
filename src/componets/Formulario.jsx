import { useState, useEffect } from "react";
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si el nombre del campo es "frecuente", convierte el valor a un booleano
    const newValue = name === "frecuente" ? value === "true" : value;

    setForm({
      ...form,
      [name]: newValue,
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

    useEffect(() => {
      // Inicializar el mapa de Google Maps
      const initializeMap = () => {
        const map = new window.google.maps.Map(document.getElementById("map"), {
          center: { lat: -34.397, lng: 150.644 }, // Centro predeterminado
          zoom: 8, // Zoom predeterminado
        });

        // Manejar el evento de clic en el mapa
        map.addListener("click", (e) => {
          // Obtener las coordenadas de la ubicación seleccionada
          const latLng = e.latLng.toJSON();
          console.log("Ubicación seleccionada:", latLng);

          // Aquí puedes realizar cualquier lógica adicional, como guardar las coordenadas en el estado del formulario
        });
      }; // Cargar el mapa de Google Maps después de que se cargue el script de Google Maps
      window.initMap = initializeMap;
    }, []);

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
    <div className="">
      <form onSubmit={handleSubmit}>
        {Object.keys(mensaje).length > 0 && (
          <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
        )}
        <div className="poppins-regular">
          <div className="flex flex-wrap mb-3">
            <div className="w-1/2 pr-2">
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
                placeholder="Nombre del cliente"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="w-1/2 pl-2">
              <div>
                <label
                  htmlFor="propietario:"
                  className="poppins-semibold text-black uppercase"
                >
                  Apellido Cliente:{" "}
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
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="email:"
            className="poppins-semibold text-black uppercase"
          >
            Correo Electrónico:{" "}
          </label>
          <input
            id="email"
            type="email"
            className="border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-3"
            placeholder="Correo electrónico del cliente"
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
            Teléfono / celular:{" "}
          </label>
          <input
            id="celular"
            type="number"
            className="border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-3"
            placeholder="Teléfono / celular del cliente"
            name="celular"
            value={form.celular}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="cedula:"
            className="poppins-semibold text-black uppercase"
          >
            Cédula:{" "}
          </label>
          <input
            id="cedula"
            type="number"
            className="border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-3"
            placeholder="Cédula del cliente"
            name="cedula"
            value={form.cedula}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="frecuente"
            className="poppins-semibold text-black uppercase"
          >
            Cliente frecuente{" "}
          </label>
          <select
            id="frecuente"
            className="border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-3"
            name="frecuente"
            value={form.frecuente}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          {/* Campo de entrada de dirección */}
          <label
            htmlFor="direccion"
            className="poppins-semibold text-black uppercase"
          >
            Dirección{" "}
          </label>
          <input
            id="direccion"
            type="text"
            className="border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-3"
            placeholder="Dirección"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
          />
        </div>

        {/* Contenedor del mapa de Google Maps */}
        <div id="map" style={{ height: "300px", marginTop: "20px" }}></div>

        <button type="submit" className="btn btn-primary">
          Confirmar
        </button>
        <input
        type="submit"
        className="poppins-regular bg-green-800 green w-full p-3 
        text-white uppercase rounded-xl
        hover:bg-emerald-900 cursor-pointer transition-all"
        value={paciente?._id ? "Actualizar paciente" : "Registrar cliente"}
      />
      </form>
    </div>
  );
};
