// src/components/AdminUserTable.js
import React from "react";
import { FaUsers, FaSearch, FaEdit, FaTrash } from "react-icons/fa";

const AdminUserTable = ({
  usuarios,
  onEdit,
  onDelete,
  searchTerm,
  setSearchTerm,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md w-full max-w-6xl mx-auto mt-6">
      {/* Título */}
      <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-6 text-center flex items-center justify-center gap-2">
        <FaUsers /> Lista de Usuarios Admin
      </h2>

      {/* Barra de búsqueda */}
      <div className="relative max-w-sm mx-auto mb-6">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre o correo..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-600"
        />
      </div>

      {/* Tabla responsiva */}
<div className="w-full overflow-x-auto">
  <table className="w-full text-sm text-left border-collapse">
    <thead>
      <tr className="bg-green-600 text-white text-xs sm:text-sm">
        <th className="px-2 sm:px-4 py-2">Nombre</th>
        <th className="px-2 sm:px-4 py-2">Correo</th>
        <th className="px-2 sm:px-4 py-2">Rol</th>
        <th className="px-2 sm:px-4 py-2 text-center">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {usuarios.map((u) => (
        <tr
          key={u._id}
          className="bg-gray-50 hover:bg-green-50 transition text-xs sm:text-sm"
        >
          <td className="px-2 sm:px-4 py-2 font-medium">{u.nombre}</td>
          <td className="px-2 sm:px-4 py-2 break-all">{u.correo}</td>
          <td className="px-2 sm:px-4 py-2 capitalize">{u.rol}</td>
          <td className="px-2 sm:px-4 py-2 text-center">
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={() => onEdit(u)}
                className="p-2 text-white bg-yellow-500 rounded hover:bg-yellow-600 transition text-xs sm:text-sm"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(u._id)}
                className="p-2 text-white bg-red-600 rounded hover:bg-red-700 transition text-xs sm:text-sm"
              >
                <FaTrash />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {/* Paginación */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => onPageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUserTable;
