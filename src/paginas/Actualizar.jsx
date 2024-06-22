import { FormularioCliente } from "../componets/Formularios/FormularioCliente";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Mensaje from "../componets/Alertas/Mensaje";
import axios from "axios";

const Actualizar = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState({});
  const [mensaje, setMensaje] = useState({});

  useEffect(() => {
    const consultarCliente = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `${import.meta.env.VITE_BACKEND_URL}/cliente/${id}`;
        const options = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const respuesta = await axios.get(url, options);
        setCliente(respuesta.data.cliente);
      } catch (error) {
        setMensaje({ respuesta: error.response.data.msg, tipo: false });
      }
    };
    consultarCliente();
  }, []);

  return (
    <div>
      <h1 className="poppins-bold text-center font-black text-4xl text-black">
        Actualizar Datos Cliente
      </h1>
      <hr className="mt-4" />
      {Object.keys(cliente).length != 0 ? (
        <FormularioCliente cliente={cliente} />
      ) : (
        Object.keys(mensaje).length > 0 && (
          <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
        )
      )}
    </div>
  );
};

export default Actualizar;
