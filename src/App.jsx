import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./layout/Auth";
import { Login } from "./paginas/Login";
import { NotFound } from "./paginas/NotFound";
import Dashboard from "./layout/Dashboard";
import RegistrarProforma from "./paginas/RegistrarProforma";
import RegistrarCliente from "./paginas/RegistrarCliente";
import RegistrarOrden from "./paginas/RegistrarOrden";
import Tecnicos from "./paginas/Tecnicos";
import Actualizar from "./paginas/Actualizar";
import Perfil from "./paginas/Perfil";
import ListarClientes from "./paginas/ListarClientes";
import ListarOrdenes from "./paginas/ListarOrdenes";
import { Confirmar } from "./paginas/Confirmar";
import Restablecer from "./paginas/Restablecer";
import { AuthProvider } from "./context/AuthProvider";
import { PrivateRoute } from "./routes/PrivateRoutes";
import { OrdenesProvider } from "./context/OrdenesProvider";
import { RecuperarContrasena } from "./paginas/RecuperarContrasena";
import RecuperarCliente from "./paginas/RecuperarCliente";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <OrdenesProvider>
            <Routes>
              <Route index element={<Login />} />
              <Route path="/" element={<Auth />}>
                <Route path="recuperar" element={<RecuperarContrasena />} />

                <Route path="*" element={<NotFound />} />
              </Route>
              <Route path="confirmar/:token" element={<Confirmar />} />
              <Route
                path="recuperar-password/:token"
                element={<Restablecer />}
              />
              <Route
                path="recuperar/cliente/:token"
                element={<RecuperarCliente />}
              />
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
                        <Route
                          path="registrarproforma/:id"
                          element={<RegistrarProforma />}
                        />
                        <Route path="perfil" element={<Perfil />} />
                        <Route path="tecnicos" element={<Tecnicos />} />
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
                        <Route
                          path="actualizarCliente/:id"
                          element={<Actualizar />}
                        />
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
