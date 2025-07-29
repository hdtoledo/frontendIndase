import { Link } from "react-router-dom";
import senaLogo from "../assets/logogreen.png";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      {/* Logo y nombre de la aplicación */}
      <div className="flex items-center mb-8">
        <img src={senaLogo} alt="SENA Logo" className="h-10 mr-3" />
        <h1 className="text-2xl font-bold text-green-700">SIGS - Inventario Granja SENA</h1>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
        <h2 className="text-6xl font-extrabold text-green-600 mb-4">404</h2>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Página no encontrada</h3>
        <p className="text-gray-600 mb-6">
          Lo sentimos, la ruta que estás buscando no existe o fue movida.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
