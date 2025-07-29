import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaUser, FaUsers, FaBox, FaDashcube, FaRegFile, FaCalendarCheck } from "react-icons/fa";
import senaLogo from "../assets/logowhite.png";

const Sidebar = ({ user: propUser, onLogout, menuOpen, setMenuOpen }) => {
  const [user, setUser] = useState(propUser || null);

  useEffect(() => {
    if (!propUser) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) setUser(storedUser);
    } else {
      setUser(propUser);
    }
  }, [propUser]);

  const isAdmin = user?.rol === "admin";

  const adminItems = [
    { name: "Dashboard", icon: <FaDashcube />, path: "/dashboard" },
    { name: "Usuarios",   icon: <FaUser />,     path: "/admin/usuarios" },
    { name: "Aprendices",   icon: <FaUsers />,     path: "/admin/aprendices" },
    { name: "Asistencias",   icon: <FaCalendarCheck />,     path: "/admin/asistencias" },
     { name: "Informes",  icon: <FaRegFile />,      path: "/admin/informes" },

  ];

  const userItems = [
    { name: "Dashboard", icon: <FaDashcube />, path: "/dashboard" },
    { name: "Préstamos", icon: <FaBox />,      path: "/prestamos"  },
  ];

  const menuItems = isAdmin ? adminItems : userItems;

  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        className={`bg-white w-64 shadow-lg fixed md:relative z-20 transition-transform duration-300 md:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:block flex flex-col justify-start h-screen`}
      >
        {/* Logo y título */}
        <div className="p-4 flex items-center justify-between bg-green-700">
          <div className="flex items-center">
            <img src={senaLogo} alt="SENA Logo" className="h-8 mr-2" />
            <span className="text-white font-bold">INDASE</span>
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        {/* Contenido alineado arriba */}
        <div className="p-4 text-left overflow-y-auto flex-1">
          <div className="mb-6">
            <p className="font-medium">Bienvenido,</p>
            <p className="font-semibold">{user?.nombre || "Usuario"}</p>
            <p className="text-sm italic capitalize">{user?.rol || "usuario"}</p>
          </div>

          <nav className="flex flex-col gap-3">
            
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors p-2 rounded-md"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Botón de logout */}
        <div className="p-4">
          <button
            onClick={onLogout}
            className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
