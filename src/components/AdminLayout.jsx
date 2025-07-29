// src/components/AdminLayout.js
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const AdminLayout = ({ user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 grid md:grid-cols-[16rem_1fr]">
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 z-40 h-full md:h-screen transition-transform duration-300 
        ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <Sidebar
          user={user}
          onLogout={onLogout}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col min-h-screen md:h-screen">
        {/* Header para móvil */}
        {!menuOpen && (
          <div className="md:hidden flex justify-between items-center px-4 py-3 bg-white shadow sticky top-0 z-30">
            <h1 className="text-lg font-bold text-green-600">Panel Admin</h1>
            <button onClick={() => setMenuOpen(true)}>
              <FaBars size={22} />
            </button>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-6">
          <div className="w-full max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
