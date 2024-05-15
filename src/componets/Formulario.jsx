import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Mensaje from "./Alertas/Mensaje";

export const Formulario = ({ paciente }) => {
  const navigate = useNavigate();
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [mensaje, setMensaje] = useState({});
  const [form, setForm] = useState({
    nombre: paciente?.nombre || "",
    propietario: paciente?.propietario || "",
    email: paciente?.email || "",
    celular: paciente?.celular || "",
    direccion: paciente?.direccion || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
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
      const url = paciente?._id
        ? `${import.meta.env.VITE_BACKEND_URL}/paciente/actualizar/${paciente._id}`
        : `${import.meta.env.VITE_BACKEND_URL}/paciente/registro`;
      const method = paciente?._id ? "PUT" : "POST";
      const options = {
        headers: {
          method,
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.request(url, {
        ...options,
        data: form,
      });

      setMensaje({
        respuesta: paciente?._id
          ? "Cliente actualizado"
          : "Cliente registrado con éxito",
        tipo: true,
      });

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

  useEffect(() => {
    const apiKey = import.meta.env.VITE_MAPS_API_KEY;
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const mapInstance = new window.google.maps.Map(
        document.getElementById("map"),
        {
          center: { lat: -0.180653, lng: -78.467834 },
          zoom: 10,
        }
      );
      setMap(mapInstance);

      const markerInstance = new window.google.maps.Marker({
        center: { lat: -0.180653, lng: -78.467834 },
        map: mapInstance,
        draggable: true,
      });

      setMarker(markerInstance);

      mapInstance.addListener("click", (e) => {
        markerInstance.setPosition(e.latLng);
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleConfirmDireccion = () => {
    if (marker) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        { location: marker.getPosition() },
        (results, status) => {
          if (status === "OK") {
            if (results[0]) {
              const address = results[0].formatted_address;
              setForm({ ...form, direccion: address });
            } else {
              console.error("No se encontraron resultados de geocodificación");
            }
          } else {
            console.error("Error en la geocodificación inversa:", status);
          }
        }
      );
    }
  };

  return (
    <div className="p-8 w-full flex justify-center">
      <div className="xl:w-2/3 justify-center items-center">
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
          <div className="flex justify-center p-3 mb-5">
            <div className=" text-center poppins-regular bg-green-800 green p-2 text-white uppercase rounded-xl hover:bg-emerald-900 cursor-pointer transition-all w-1/3">
              <button
                type="button"
                onClick={handleConfirmDireccion}
                className="btn btn-primary"
              >
                Confirmar Dirección
              </button>
            </div>
          </div>
          <input
            type="submit"
            className="poppins-regular bg-green-800 green w-full p-3 text-white uppercase rounded-xl hover:bg-emerald-900 cursor-pointer transition-all"
            value={paciente?._id ? "Actualizar paciente" : "Registrar cliente"}
          />
        </form>
      </div>
    </div>
  );
};
