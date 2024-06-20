import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./layout/Auth";
import { Login } from "./paginas/Login";
import { NotFound } from "./paginas/NotFound";
import Dashboard from "./layout/Dashboard";
import Visualizar from "./paginas/Visualizar";
import RegistrarCliente from "./paginas/RegistrarCliente";
import RegistrarOrden from "./paginas/RegistrarOrden";
import RegistrarTecnico from "./paginas/RegistrarTecnico";
import Actualizar from "./paginas/Actualizar";
import Perfil from "./paginas/Perfil";
import ListarClientes from "./paginas/ListarClientes";
import ListarOrdenes from "./paginas/ListarOrdenes";
import { Confirmar } from "./paginas/Confirmar";
import Restablecer from "./paginas/Restablecer";
import { AuthProvider, useAuth } from "./context/AuthProvider"; // Importa useAuth para obtener el estado de autenticación
import { PrivateRoute } from "./routes/PrivateRoutes";
import { OrdenesProvider } from "./context/OrdenesProvider";
import { RecuperarContrasena } from "./paginas/RecuperarContrasena";
import PrivateRouteWithRole from "./routes/PrivateRouteWithRole";

function App() {
  const { isLoggedIn, loading } = useAuth(); // Usa el hook useAuth para obtener el estado de autenticación

  useEffect(() => {
    // Verificar el estado de autenticación al cargar la aplicación
    if (!isLoggedIn && !loading) {
      // Si no está autenticado y el estado de carga ha terminado, redirige al login
      window.location.href = "/login"; // Redirección manual para asegurar que se limpie el estado anterior
    }
  }, [isLoggedIn, loading]);

  if (loading) {
    // Muestra un spinner u otra indicación de carga mientras se verifica el estado de autenticación
    return <div>Cargando...</div>;
  }

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <OrdenesProvider>
            <Routes>
              <Route index element={<Login />} />

              <Route path="/" element={<Auth />}>
                <Route path="recuperar" element={<RecuperarContrasena />} />
                <Route path="confirmar/:token" element={<Confirmar />} />
                <Route
                  path="recuperar-password/:token"
                  element={<Restablecer />}
                />
                <Route path="*" element={<NotFound />} />
              </Route>

              <Route
                path="dashboard/*"
                element={
                  <PrivateRoute>
                    <Routes>
                      <Route element={<Dashboard />}>
                        <Route index element={<RegistrarCliente />} />

                        <Route
                          path="listarClientes"
                          element={<ListarClientes />}
                        />
                        <Route path="visualizar/:id" element={<Visualizar />} />
                        <Route path="perfil" element={<Perfil />} />
                        <Route
                          path="registrarTecnico"
                          element={<RegistrarTecnico />}
                        />
                        <Route
                          path="listarOrdenes"
                          element={<ListarOrdenes />}
                        />
                        <Route
                          path="registrarCliente"
                          element={<RegistrarCliente />}
                        />
                        <Route
                          path="registrarOrden"
                          element={<RegistrarOrden />}
                        />
                        <Route path="actualizar/:id" element={<Actualizar />} />
                      </Route>
                    </Routes>
                  </PrivateRoute>
                }
              />
            </Routes>
          </OrdenesProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
