import { useEffect, useState } from "react";
import senaLogo from "../assets/logowhite.png";
import { Link } from "react-router-dom";
import { FaUserPlus, FaClipboardCheck, FaFileAlt } from "react-icons/fa";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-green-700 text-white shadow">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center py-4 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 w-full sm:w-auto text-center sm:text-left">
            {/* Logo */}
            <div className="flex justify-center sm:justify-start mb-2 sm:mb-0">
              <img src={senaLogo} alt="SENA Logo" className="h-10" />
            </div>

            {/* Título */}
            <h1 className="text-lg sm:text-2xl font-bold tracking-wide leading-tight">
              INDASE
              <span className="block text-sm sm:text-base font-normal">
                Inducción y Asistencia de Aprendices del SENA
              </span>
            </h1>
          </div>

          {/* Botón de sesión */}
          <nav className="mt-3 sm:mt-0 w-full sm:w-auto text-center sm:text-right">
            <Link
              to={user ? "/dashboard" : "/login"}
              className="inline-flex items-center px-4 py-2 border border-white rounded-full text-white text-sm font-medium hover:bg-white hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A4 4 0 018 16h8a4 4 0 012.879 1.804M12 7a4 4 0 110 8 4 4 0 010-8z"
                />
              </svg>
              {user ? "Ir al Dashboard" : "Iniciar Sesión"}
            </Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 px-6 py-6 max-h-[calc(100vh-120px)] overflow-hidden">
        {/* Intro */}
        <div className="text-center lg:text-left max-w-xl space-y-4">
          <h2 className="text-4xl font-extrabold leading-tight">
            Bienvenido a <span className="text-green-700">INDASE</span>
          </h2>
          <p className="text-lg text-gray-600">
            Plataforma web para registrar y hacer seguimiento a la asistencia de aprendices en los 5 días de inducción institucional del SENA.
          </p>
          <Link
            to="/login"
            className="inline-block mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            Comenzar ahora
          </Link>
        </div>

        {/* Funcionalidades */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl w-full">
          {[
            {
              title: "Registro de Aprendices",
              desc: "Agrega y gestiona la información básica de cada aprendiz.",
              icon: <FaUserPlus className="text-green-600 text-3xl" />
            },
            {
              title: "Control de Asistencias",
              desc: "Marca asistencia o inasistencia por cada uno de los 5 días.",
              icon: <FaClipboardCheck className="text-green-600 text-3xl" />
            },
            {
              title: "Reportes",
              desc: "Genera listados completos por día o por aprendiz.",
              icon: <FaFileAlt className="text-green-600 text-3xl" />
            }
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-white p-4 rounded-md shadow-sm hover:shadow-md transition text-left"
            >
              <div className="pt-1">{item.icon}</div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-3 text-sm bg-white border-t">
        © {new Date().getFullYear()} INDASE - SENA. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Home;
