import { Outlet, Navigate } from 'react-router-dom';

const Auth = () => {
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol');

    // Verificar si el token existe
    if (!token) {
        return <Outlet />;
    }

    // Verificar si el token existe y tiene el rol adecuado
    if (token && rol === "tecnico") {
        return <Navigate to='/dashboard/crearcliente' />;
    }

    // Si el token existe pero no tiene el rol adecuado, puedes redirigir a una página de error o mostrar un mensaje
    return <p>No tienes permiso para acceder a esta página</p>;
}

export default Auth;
