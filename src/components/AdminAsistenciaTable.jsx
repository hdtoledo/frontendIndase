// src/components/AdminAsistenciaTable.jsx
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const AdminAsistenciaTable = ({
  aprendices,
  onAsistencia,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md w-full max-w-6xl mx-auto mt-6">
      <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-6 text-center">
        Gestión de Asistencias
      </h2>

      {/* 📱 Vista Mobile (Cards) */}
      <div className="grid gap-4 sm:hidden">
        {aprendices.length > 0 ? (
          aprendices.map((a, idx) => (
            <div
              key={a._id}
              className="bg-gray-50 shadow rounded-lg p-4 border hover:shadow-lg transition"
            >
              <p className="font-bold text-green-700 text-lg">
                {idx + 1}. {a.nombres} {a.apellidos}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Documento:</strong> {a.numeroDocumento}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Ficha:</strong> {a.numeroFicha}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Formación:</strong> {a.formacion}
              </p>
              <button
                onClick={() => onAsistencia(a)}
                className="mt-4 w-full bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <FaCheckCircle /> Registrar Asistencia
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No se encontraron aprendices</p>
        )}
      </div>

      {/* 🖥️ Vista Escritorio (Tabla) */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-[800px] w-full text-sm text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Documento</th>
              <th className="px-4 py-3">Nombres</th>
              <th className="px-4 py-3">Apellidos</th>
              <th className="px-4 py-3">Ficha</th>
              <th className="px-4 py-3">Formación</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {aprendices.length > 0 ? (
              aprendices.map((a, idx) => (
                <tr
                  key={a._id}
                  className="bg-gray-50 hover:bg-green-50 rounded transition"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {(currentPage - 1) * 10 + idx + 1}
                  </td>
                  <td className="px-4 py-3">{a.numeroDocumento}</td>
                  <td className="px-4 py-3 font-semibold">{a.nombres}</td>
                  <td className="px-4 py-3">{a.apellidos}</td>
                  <td className="px-4 py-3">{a.numeroFicha}</td>
                  <td className="px-4 py-3">{a.formacion}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => onAsistencia(a)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition flex items-center justify-center gap-1 mx-auto text-xs sm:text-sm"
                    >
                      <FaCheckCircle /> Registrar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No se encontraron aprendices
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📌 Paginación (común a ambas vistas) */}
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

export default AdminAsistenciaTable;
