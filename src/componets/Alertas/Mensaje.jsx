import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Mensaje = ({ children, tipo }) => {
  return (
    <div className="w-auto p-2 poppins-semibold text-center justify-center items-center">
      <div
        className={`p-4 border rounded-xl ${
          tipo ? "border-green-700" : "border-red-700"
        } rounded-r-xl 
                    ${tipo ? "bg-green-50" : "bg-red-50"} flex mt-2`}
      >
        <div>
          {tipo ? (
            <FaCheckCircle className="w-5 h-5 text-green-700" />
          ) : (
            <FaTimesCircle className="w-5 h-5 text-red-700" />
          )}
        </div>
        <div className="ml-3">
          <div
            className={`text-sm ${tipo ? "text-green-700" : "text-red-700"}`}
          >
            <p>{children}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mensaje;
