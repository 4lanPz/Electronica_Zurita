import React, { useState, useEffect, useContext } from "react";
import TablaTecnicos from "../componets/Tablas/TablaTecnicos";
import AuthContext from "../context/AuthProvider";

const Tecnicos = () => {
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { auth, verificarAdmin } = useContext(AuthContext);

  useEffect(() => {
    const validateUser = async () => {
      try {
        const tecnicoId = auth._id;
        const isValidAdmin = await verificarAdmin(tecnicoId);

        setIsValid(isValidAdmin.tipo); // Establecer isValid según el tipo de respuesta

        if (!isValidAdmin.tipo) {
          console.error("El técnico no tiene permisos de administrador");
        }
      } catch (error) {
        console.error("Error en la validación:", error);
        setIsValid(false); // Si hay un error, considerar como no válido
      } finally {
        setIsLoading(false);
      }
    };

    if (auth._id) {
      validateUser();
    }
  }, [auth, verificarAdmin]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!isValid) {
    return (
      <div className="text-center">
        <h1 className="poppins-bold font-black text-4xl text-red-500">
          Prohibido
        </h1>
        <p>No tienes permiso para acceder a esta página.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="poppins-bold text-center font-black text-4xl text-black">
        Gestión de técnicos
      </h1>
      <hr className="my-4" />
      <TablaTecnicos />
    </div>
  );
};

export default Tecnicos;
