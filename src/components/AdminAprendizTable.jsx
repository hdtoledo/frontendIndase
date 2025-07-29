import React from "react";
import {
  FaSearch,
  FaUserGraduate,
  FaEdit,
  FaTrash,
  FaFileUpload,
} from "react-icons/fa";

const AdminAprendizTable = ({
  aprendices,
  onEdit,
  onDelete,
  onCreate,
  onBulkUpload, // NUEVA PROP
  searchTerm,
  setSearchTerm,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
}) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md w-full max-w-6xl mx-auto mt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2">
          <FaUserGraduate /> Lista de Aprendices
        </h2>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button
            onClick={onBulkUpload}
            className="bg-gray-600 text-white px-5 py-2 rounded-lg shadow hover:bg-gray-700 transition flex items-center gap-2 w-full sm:w-auto"
          >
            <FaFileUpload /> Carga Masiva
          </button>
          <button
            onClick={onCreate}
            className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition flex items-center gap-2 w-full sm:w-auto"
          >
            + Nuevo Aprendiz
          </button>
        </div>
      </div>

      {/* Buscador */}
      <div className="relative max-w-sm mx-auto mb-6 w-full">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre, apellido, documento o ficha..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-600"
        />
      </div>

      {/* Vista Desktop */}
<div className="hidden sm:block rounded-lg border border-gray-200 shadow-sm overflow-hidden">
  <table className="table-fixed w-full text-sm text-left border-collapse">
    <thead className="bg-green-600 text-white sticky top-0">
      <tr>
        <th className="w-[3%] px-2 py-3 text-center">#</th>
        <th className="w-[8%] px-2 py-3">Ficha</th>
        <th className="w-[15%] px-2 py-3">Formación</th>
        <th className="w-[7%] px-2 py-3">Tipo Doc.</th>
        <th className="w-[10%] px-2 py-3">Número</th>
        <th className="w-[12%] px-2 py-3">Nombres</th>
        <th className="w-[12%] px-2 py-3">Apellidos</th>
        <th className="w-[10%] px-2 py-3">Celular</th>
        <th className="w-[15%] px-2 py-3">Correo</th>
        <th className="w-[8%] px-2 py-3 text-center">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {aprendices.length > 0 ? (
        aprendices.map((aprendiz, index) => (
          <tr
            key={aprendiz._id}
            className={`transition ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            } hover:shadow-md`}
          >
            <td className="px-2 py-3 text-gray-600 font-semibold text-center">
              {(currentPage - 1) * itemsPerPage + index + 1}
            </td>
            <td className="px-2 py-3 text-center font-semibold text-green-700">
              {aprendiz.numeroFicha}
            </td>
            <td className="px-2 py-3 font-medium text-gray-700 truncate" title={aprendiz.formacion}>
              {aprendiz.formacion}
            </td>
            <td className="px-2 py-3 text-center">{aprendiz.tipoDocumento}</td>
            <td className="px-2 py-3 text-center">{aprendiz.numeroDocumento}</td>
            <td className="px-2 py-3 font-medium text-gray-900 truncate" title={aprendiz.nombres}>
              {aprendiz.nombres}
            </td>
            <td className="px-2 py-3 text-gray-700 truncate" title={aprendiz.apellidos}>
              {aprendiz.apellidos}
            </td>
            <td className="px-2 py-3 text-gray-700 text-center">{aprendiz.celular}</td>
            <td className="px-2 py-3 text-gray-700 truncate" title={aprendiz.correo}>
              {aprendiz.correo}
            </td>
            <td className="px-2 py-3 text-center flex justify-center gap-2">
              <button
                onClick={() => onEdit(aprendiz)}
                title="Editar aprendiz"
                className="p-2 text-white bg-yellow-500 rounded-full hover:bg-yellow-600 shadow transition"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(aprendiz._id)}
                title="Eliminar aprendiz"
                className="p-2 text-white bg-red-600 rounded-full hover:bg-red-700 shadow transition"
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="10" className="text-center py-6 text-gray-500 italic">
            No hay aprendices registrados
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


      {/* Vista Mobile (cards) */}
      <div className="sm:hidden space-y-4">
        {aprendices.length > 0 ? (
          aprendices.map((aprendiz, index) => (
            <div
              key={aprendiz._id}
              className="bg-gray-50 rounded-lg shadow p-4 hover:shadow-md transition"
            >
              <div className="flex flex-col mb-2">
                <span className="text-sm font-bold text-green-700">
                  #{(currentPage - 1) * itemsPerPage + index + 1}
                </span>

                <span className="bg-gray-300 text-black-700 px-2 py-1 rounded text-xs mt-1">
                  Ficha {aprendiz.numeroFicha}
                </span>

                <span className="bg-yellow-100 text-black-700 px-2 py-1 rounded text-xs mt-1">
                  {aprendiz.formacion}
                </span>
              </div>
              <p className="text-gray-800 font-semibold">
                {aprendiz.nombres} {aprendiz.apellidos}
              </p>
              <p className="text-gray-600 text-sm">
                {aprendiz.tipoDocumento} - {aprendiz.numeroDocumento}
              </p>
              <p className="text-gray-600 text-sm">📞 {aprendiz.celular}</p>
              <p className="text-gray-600 text-sm">✉ {aprendiz.correo}</p>
              <div className="mt-3 flex justify-end gap-2">
                <button
                  onClick={() => onEdit(aprendiz)}
                  className="p-2 text-white bg-yellow-500 rounded-full hover:bg-yellow-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(aprendiz._id)}
                  className="p-2 text-white bg-red-600 rounded-full hover:bg-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 italic">
            No hay aprendices registrados
          </p>
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => onPageChange(i + 1)}
              className={`px-4 py-2 rounded-lg shadow-sm text-sm font-medium ${
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

export default AdminAprendizTable;
