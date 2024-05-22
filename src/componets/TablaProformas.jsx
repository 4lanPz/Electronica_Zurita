import { useContext } from "react";
import OrdenesContext from "../context/OrdenesProvider";
import AuthContext from "../context/AuthProvider";
import {
  MdDeleteForever,
  MdOutlineSecurityUpdateGood,
  MdPublishedWithChanges,
} from "react-icons/md";

const TablaProformas = ({ proformas }) => {
  const { auth } = useContext(AuthContext);
  const { handleDelete, handleStatus } = useContext(OrdenesContext);
  return (
    <table className="w-full mt-5 table-auto shadow-lg  bg-white">
      <thead className="bg-gray-800 text-slate-400">
        <tr>
          <th className="p-2">N°</th>
          <th className="p-2">Nombre</th>
          <th className="p-2">Descripción</th>
          <th className="p-2">Prioridad</th>
          <th className="p-2">Estado</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {proformas.map((proforma, index) => (
          <tr
            className="border-b hover:bg-gray-300 text-center"
            key={proforma._id}
          >
            <td>{index + 1}</td>
            <td>{proforma.nombre}</td>
            <td>{proforma.descripcion}</td>
            <td>{proforma.prioridad}</td>
            <td>
              <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                {proforma.estado && "activo"}
              </span>
            </td>
            <td className="py-2 text-center">
              {auth.rol === "tecnico" && (
                <>
                  <MdPublishedWithChanges className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" />

                  <MdOutlineSecurityUpdateGood
                    className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                    onClick={() => handleStatus(proforma._id)}
                  />

                  <MdDeleteForever
                    className="h-8 w-8 text-red-900 cursor-pointer inline-block"
                    onClick={() => handleDelete(proforma._id)}
                  />
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaProformas;