import React from "react";

const AdminEditPrestamosModal = ({
  prestamo,
  onClose,
  onChange,
  onSave,
  onCreate,
  isEditing,
  productos, // <--- Recibimos la lista de productos
}) => {
  if (!prestamo) return null;

  const handleSubmit = () => {
    isEditing ? onSave() : onCreate();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-5xl max-h-[calc(100vh-100px)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className={`text-2xl font-bold mb-6 text-center ${
            isEditing ? "text-green-700" : "text-green-700"
          }`}
        >
          {isEditing ? "Editar Préstamo" : "Nuevo Préstamo"}
        </h2>

        <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Nombre Aprendiz */}
            <div>
              <label className="block text-gray-700 mb-1">
                Nombre del Aprendiz
              </label>
              <input
                type="text"
                value={prestamo.nombreAprendiz}
                onChange={(e) =>
                  onChange({ ...prestamo, nombreAprendiz: e.target.value })
                }
                placeholder="Nombre"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
              />
            </div>

            {/* Apellidos Aprendiz */}
            <div>
              <label className="block text-gray-700 mb-1">
                Apellidos del Aprendiz
              </label>
              <input
                type="text"
                value={prestamo.apellidosAprendiz}
                onChange={(e) =>
                  onChange({ ...prestamo, apellidosAprendiz: e.target.value })
                }
                placeholder="Apellidos"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
              />
            </div>

            {/* Ficha */}
            <div>
              <label className="block text-gray-700 mb-1">Ficha</label>
              <input
                type="number"
                value={prestamo.ficha}
                onChange={(e) =>
                  onChange({ ...prestamo, ficha: e.target.value })
                }
                placeholder="Número de ficha"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
              />
            </div>

            {/* Producto: ahora es un select */}
            <div>
              <label className="block text-gray-700 mb-1">Producto</label>
              <select
                value={prestamo.producto}
                onChange={(e) =>
                  onChange({ ...prestamo, producto: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
              >
                {productos.map((prod) => (
                  <option key={prod._id} value={prod._id}>
                    {prod.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Cantidad */}
            <div>
              <label className="block text-gray-700 mb-1">Cantidad</label>
              <input
                type="number"
                 min={1}
                value={prestamo.cantidad}
                onChange={(e) =>
                  onChange({ ...prestamo, cantidad: e.target.value })
                }
                placeholder="Cantidad prestada"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
              />
            </div>

            {/* Fecha Préstamo */}
            <div>
              <label className="block text-gray-700 mb-1">
                Fecha de Préstamo
              </label>
              <input
                type="date"
                value={prestamo.fechaPrestamo}
                onChange={(e) =>
                  onChange({ ...prestamo, fechaPrestamo: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
              />
            </div>

            {/* Devuelto */}
            <div>
              <label className="block text-gray-700 mb-1">Devuelto</label>
              <select
                value={prestamo.devuelto}
                onChange={(e) =>
                  onChange({ ...prestamo, devuelto: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
              >
                <option value="no">No</option>
                <option value="si">Sí</option>
              </select>
            </div>

            {/* Estado Entrega */}
            <div>
              <label className="block text-gray-700 mb-1">
                Estado de Entrega
              </label>
              <select
                value={prestamo.estadoEntrega}
                onChange={(e) =>
                  onChange({ ...prestamo, estadoEntrega: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
              >
                <option value="Buen estado">Buen estado</option>
                <option value="Regular">Regular</option>
                <option value="Malo">Malo</option>
              </select>
            </div>

            {/* Fecha Devolución */}
            <div>
              <label className="block text-gray-700 mb-1">
                Fecha de Devolución
              </label>
              <input
                type="date"
                value={prestamo.fechaDevolucion}
                onChange={(e) =>
                  onChange({ ...prestamo, fechaDevolucion: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
              />
            </div>

            {/* Comentarios (ocupa toda la fila) */}
            <div className="sm:col-span-2 lg:col-span-4">
              <label className="block text-gray-700 mb-1">Comentarios</label>
              <textarea
                value={prestamo.comentarios}
                onChange={(e) =>
                  onChange({ ...prestamo, comentarios: e.target.value })
                }
                placeholder="Observaciones..."
                className="w-full border border-gray-300 rounded px-3 py-2 h-24 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none resize-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 text-white rounded transition ${
              isEditing ? "bg-green-600 hover:bg-green-700" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isEditing ? "Guardar Cambios" : "Crear Préstamo"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEditPrestamosModal;
