import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Auth from './layout/Auth'
import { Login } from './paginas/Login'
import { Register } from './paginas/Register'
import { NotFound } from './paginas/NotFound'
import Dashboard from './layout/Dashboard'
import Listar from './paginas/Listar'
import Visualizar from './paginas/Visualizar'
import CrearCliente from './paginas/CrearCliente'
import CrearOrden from './paginas/CrearOrden'
import Actualizar from './paginas/Actualizar'
import Perfil from './paginas/Perfil'
import ListarOrdenes from './paginas/ListarOrdenes'
import { Confirmar } from './paginas/Confirmar'
import Restablecer from './paginas/Restablecer'
import { AuthProvider } from './context/AuthProvider'
import { PrivateRoute } from './routes/PrivateRoutes'
import { TratamientosProvider } from './context/TratamientosProvider'
import { Forgot } from './paginas/Forgot'
import PrivateRouteWithRole from './routes/PrivateRouteWithRole'

function App() {
  return (
    <>
    <BrowserRouter>
      <AuthProvider>
      <TratamientosProvider>
        <Routes>
          <Route index element={<Login/>}/>

          <Route path='/' element={<Auth/>}>
            <Route path='register' element={<Register/>}/>
            <Route path='forgot' element={<Forgot/>}/>
            <Route path='confirmar/:token' element={<Confirmar/>}/>
            <Route path='recuperar-password/:token' element={<Restablecer/>}/>
            <Route path='*' element={<NotFound />} />
          </Route>

          <Route path='dashboard/*' element={         
            <PrivateRoute>
              <Routes>
                <Route element={<Dashboard />}>
                  <Route index element={
                      <PrivateRouteWithRole>
                        <CrearCliente />
                      </PrivateRouteWithRole>
                  } />
                  
                  <Route path='listar' element={<Listar />} />
                  <Route path='visualizar/:id' element={<Visualizar />} />
                  <Route path='perfil' element={<Perfil />} />
                  <Route path='listarordenes' element={<ListarOrdenes />} />
                  <Route path='crearcliente' element={
                      <PrivateRouteWithRole>
                        <CrearCliente />
                      </PrivateRouteWithRole>
                  }/>
                  <Route path='crearorden' element={
                      <PrivateRouteWithRole>
                        <CrearOrden />
                      </PrivateRouteWithRole>
                  }/>
                  <Route path='actualizar/:id' element={<Actualizar />} />
                </Route>
              </Routes>
            </PrivateRoute>
          } />

        </Routes>
      </TratamientosProvider>
      </AuthProvider>
    </BrowserRouter>
    </>
  )
}

export default App
