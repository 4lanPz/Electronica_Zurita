import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);

  const perfil = async (token) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/perfil`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.get(url, options);
      setAuth(respuesta.data); // Actualizar el estado de auth con los datos obtenidos
      setIsProfileLoaded(true); // Indicar que el perfil se ha cargado correctamente
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Finalizar la carga independientemente del resultado
    }
  };

  const actualizarPerfil = async (datos) => {
    const token = localStorage.getItem("token");
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/tecnico/${datos.id}`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.put(url, datos, options);
      perfil(token); // Actualizar auth con los nuevos datos
      return { respuesta: respuesta.data.msg, tipo: true };
    } catch (error) {
      return { respuesta: error.response.data.msg, tipo: false };
    }
  };

  const actualizarPassword = async (datos) => {
    const token = localStorage.getItem("token");
    try {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/tecnico/actualizarpassword`;
      const options = {
        headers: {
          method: "PUT",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.put(url, datos, options);
      return { respuesta: respuesta.data.msg, tipo: true };
    } catch (error) {
      return { respuesta: error.response.data.msg, tipo: false };
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      perfil(token); // Cargar datos solo si hay un token válido
    } else {
      setLoading(false); // Si no hay token, terminar la carga
    }
  }, []);

  // Renderizar children solo si el perfil se ha cargado
  if (!isProfileLoaded) {
    return null; // Puedes mostrar un spinner de carga aquí si lo prefieres
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        actualizarPerfil,
        actualizarPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
