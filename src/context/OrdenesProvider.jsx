import { createContext, useState } from "react";
import axios from "axios";

const OrdenesContext = createContext();

const OrdenesProvider = ({ children }) => {
  const [mensaje, setMensaje] = useState({});
  const [modal, setModal] = useState(false);
  const [ordenes, setOrdenes] = useState([]);

  const registrarOrdenes = async (datos) => {
    const token = localStorage.getItem("token");
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/orden/registro`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.post(url, datos, options);
      setOrdenes([respuesta.data.orden, ...orden]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const confirmar = confirm(
        "Vas a finalizar la orden, ¿Estás seguro de realizar esta acción?"
      );
      if (confirmar) {
        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/orden/estado/${id}`;
        const options = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.put(url, {}, options);
        const ordenesActualizados = ordenes.filter(
          (orden) => orden._id !== id
        );
        setOrdenes(ordenesActualizados);
        setMensaje({ respuesta: response.data?.msg, tipo: false });
        setTimeout(() => {
          setMensaje({});
        }, 2000);
      }
    } catch (error) {
      setMensaje({ respuesta: response.data?.msg, tipo: false });
    }
  };

  const handleModal = () => {
    setModal(!modal);
  };

  const handleDelete = async (id) => {
    try {
      const confirmar = confirm(
        "Vas a eliminar la orden de un cliente, ¿Estás seguro de realizar esta acción?"
      );
      if (confirmar) {
        const token = localStorage.getItem("token");
        const url = `${import.meta.env.VITE_BACKEND_URL}/orden/${id}`;
        const options = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.delete(url, options);
        const ordenesActualizados = ordenes.filter(
          (orden) => orden._id !== id
        );
        setOrdenes(ordenesActualizados);
        setMensaje({ respuesta: response.data?.msg, tipo: true });
        setTimeout(() => {
          setMensaje({});
        }, 2000);
      }
    } catch (error) {
      setMensaje({ respuesta: response.data?.msg, tipo: false });
    }
  };

  return (
    <OrdenesContext.Provider
      value={{
        modal,
        setModal,
        handleModal,
        ordenes,
        setOrdenes,
        registrarOrdenes,
        handleDelete,
        mensaje,
        handleStatus,
      }}
    >
      {children}
    </OrdenesContext.Provider>
  );
};
export { OrdenesProvider };
export default OrdenesContext;
