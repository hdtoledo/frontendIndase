// src/components/AdminInformeTable.jsx
import React from "react";

const AdminInformeTable = ({
  aprendices,
  selectedAprendices,
  onToggleAprendice,
  onToggleAll,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const allSelected =
    aprendices.length > 0 &&
    aprendices.every((a) => selectedAprendices.includes(a.numeroDocumento));

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md w-full max-w-7xl mx-auto">
      <h2 className="text-lg sm:text-2xl font-bold text-green-700 mb-4 text-center">
        📋 Lista de Asistencias
      </h2>

      {/* ✅ Vista de Tabla para escritorio */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-[700px] w-full border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-green-600 text-white text-sm">
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => onToggleAll(e.target.checked)}
                  className="w-4 h-4"
                />
              </th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Documento</th>
              <th className="px-4 py-3">Ficha</th>
              <th className="px-4 py-3">Formación</th>
              <th className="px-4 py-3">Asistencias</th>
            </tr>
          </thead>
          <tbody>
            {aprendices.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No se encontraron registros
                </td>
              </tr>
            ) : (
              aprendices.map((a, index) => (
                <tr
                  key={a._id || index}
                  className="border-b hover:bg-green-50 transition text-sm"
                >
                  <td className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectedAprendices.includes(a.numeroDocumento)}
                      onChange={() => onToggleAprendice(a.numeroDocumento)}
                      className="w-4 h-4"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {a.nombres} {a.apellidos}
                  </td>
                  <td className="px-4 py-3">{a.numeroDocumento}</td>
                  <td className="px-4 py-3">{a.numeroFicha}</td>
                  <td className="px-4 py-3">{a.formacion}</td>
                  <td className="px-4 py-3 text-gray-700 whitespace-pre-wrap">
                    {a.asistencia?.length
                      ? a.asistencia
                          .map(
                            (as) =>
                              `${new Date(as.fecha).toLocaleDateString(
                                "es-CO"
                              )} - ${as.asistio ? "✅ Asistió" : "❌ Faltó"}`
                          )
                          .join("\n")
                      : "Sin registros"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Vista de Cards para móviles */}
      <div className="sm:hidden space-y-4">
        {aprendices.length === 0 ? (
          <p className="text-center text-gray-500">No se encontraron registros</p>
        ) : (
          aprendices.map((a, index) => (
            <div
              key={a._id || index}
              className="border rounded-lg shadow-sm p-4 bg-gray-50"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold text-green-700">
                  {a.nombres} {a.apellidos}
                </h3>
                <input
                  type="checkbox"
                  checked={selectedAprendices.includes(a.numeroDocumento)}
                  onChange={() => onToggleAprendice(a.numeroDocumento)}
                  className="w-4 h-4"
                />
              </div>
              <p className="text-xs text-gray-600">
                <strong>Documento:</strong> {a.numeroDocumento}
              </p>
              <p className="text-xs text-gray-600">
                <strong>Ficha:</strong> {a.numeroFicha}
              </p>
              <p className="text-xs text-gray-600">
                <strong>Formación:</strong> {a.formacion}
              </p>
              <p className="text-xs text-gray-600 whitespace-pre-wrap mt-2">
                <strong>Asistencias:</strong>{" "}
                {a.asistencia?.length
                  ? a.asistencia
                      .map(
                        (as) =>
                          `${new Date(as.fecha).toLocaleDateString("es-CO")} - ${
                            as.asistio ? "✅ Asistió" : "❌ Faltó"
                          }`
                      )
                      .join("\n")
                  : "Sin registros"}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => onPageChange(i + 1)}
              className={`px-3 py-1 rounded text-xs sm:text-sm ${
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

export default AdminInformeTable;
