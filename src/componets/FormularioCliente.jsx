import { useContext, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Mensaje from "./Alertas/Mensaje";

export const FormularioCliente = ({ cliente }) => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({});
  const [form, setform] = useState({
    nombre: cliente?.nombre ?? "",
    correo: cliente?.correo ?? "",
    celular: cliente?.celular ?? "",
    cedula: cliente?.cedula ?? "",
  });

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (paciente?._id) {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/cliente/actualizar/${
        paciente?._id
      }`;
      const options = {
        headers: {
          method: "PUT",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(url, form, options);
      navigate("/dashboard/listarclientes");
    } else {
      try {
        const token = localStorage.getItem("token");
        const url = `${import.meta.env.VITE_BACKEND_URL}/cliente/registro`;
        const options = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.post(url, form, options);
        setMensaje({
          respuesta: "cliente registrado con exito y correo enviado",
          tipo: true,
        });
        setTimeout(() => {
          navigate("/dashboard/listarclientes");
        }, 30000);
      } catch (error) {
        setMensaje({ respuesta: error.response.data.msg, tipo: false });
        setTimeout(() => {
          setMensaje({});
        }, 30000);
      }
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
          streetViewControl: false,
          mapTypeControl: false,
        }
      );
      setMap(mapInstance);

      const markerInstance = new window.google.maps.Marker({
        position: { lat: -0.180653, lng: -78.467834 },
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
    <form onSubmit={handleSubmit}>
      {Object.keys(mensaje).length > 0 && (
        <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
      )}
      <div>
        <label
          htmlFor="nombre:"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre de la mascota:{" "}
        </label>
        <input
          id="nombre"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="nombre de la mascota"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="correo:"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Email:{" "}
        </label>
        <input
          id="correo"
          type="email"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="email del propietario"
          name="correo"
          value={form.correo}
          onChange={handleChange}
        />
      </div>
      <div className="w-1/2 pl-2">
        <label
          htmlFor="cedula:"
          className="poppins-semibold text-black uppercase"
        >
          Cédula:
        </label>
        <input
          id="cedula"
          type="text"
          inputMode="numberic"
          className="border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600 mb-3"
          placeholder="Cédula del cliente"
          name="cedula"
          value={form.cedula}
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="celular:"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Celular:{" "}
        </label>
        <input
          id="celular"
          type="number"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="celular del propietario"
          name="celular"
          value={form.celular}
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="frecuente:"
          className="poppins-semibold text-black uppercase"
        >
          Cliente frecuente
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
          htmlFor="direccion:"
          className="poppins-semibold text-black uppercase"
        >
          Dirección
        </label>
        <input
          id="direccion"
          type="text"
          className="border-2 rounded-xl w-full p-2 mt-2 placeholder-gray-600"
          placeholder="Dirección"
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
        />
      </div>

      {/* Contenedor del mapa de Google Maps */}
      <div id="map" style={{ height: "300px", marginTop: "50px" }}></div>

      <div className="flex justify-center p-3 mb-5">
        <div className=" text-center poppins-regular bg-[#5B72C3] green p-2 text-white uppercase rounded-xl hover:bg-[#3D53A0] cursor-pointer transition-all w-1/3">
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
        className="poppins-regular bg-[#5B72C3] green w-full p-3 text-white uppercase rounded-xl hover:bg-[#3D53A0] cursor-pointer transition-all"
        value={"Registrar cliente"}
      />

      <input
        type="submit"
        className="bg-gray-600 w-full p-3 
                    text-slate-300 uppercase font-bold rounded-lg 
                    hover:bg-gray-900 cursor-pointer transition-all"
        value={paciente?._id ? "Actualizar paciente" : "Registrar paciente"}
      />
    </form>
  );
};
