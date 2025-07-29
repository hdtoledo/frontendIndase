import React from "react";

const AdminEditAprendizModal = ({
  aprendiz,
  onClose,
  onChange,
  onSave,
  onCreate,
  isEditing,
}) => {
  const handleSubmit = () => {
    isEditing ? onSave() : onCreate();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
          {isEditing ? "Editar Aprendiz" : "Nuevo Aprendiz"}
        </h2>

        <div className="space-y-4">
          {/* Número de Ficha */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Número de Ficha
            </label>
            <input
              type="text"
              value={aprendiz.numeroFicha}
              onChange={(e) =>
                onChange({ ...aprendiz, numeroFicha: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Nombre de Formación
            </label>
            <input
              type="text"
              value={aprendiz.formacion}
              onChange={(e) =>
                onChange({ ...aprendiz, formacion: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
            />
          </div>

          {/* Tipo de Documento */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Tipo de Documento
            </label>
            <select
              value={aprendiz.tipoDocumento}
              onChange={(e) =>
                onChange({ ...aprendiz, tipoDocumento: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
            >
              <option value="">Seleccione un tipo</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="CE">Cédula de Extranjería</option>
              <option value="PAS">Pasaporte</option>
            </select>
          </div>

          {/* Número de Documento */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Número de Documento
            </label>
            <input
              type="text"
              value={aprendiz.numeroDocumento}
              onChange={(e) =>
                onChange({ ...aprendiz, numeroDocumento: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
            />
          </div>

          {/* Nombres */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Nombres
            </label>
            <input
              type="text"
              value={aprendiz.nombres}
              onChange={(e) =>
                onChange({ ...aprendiz, nombres: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
            />
          </div>

          {/* Apellidos */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Apellidos
            </label>
            <input
              type="text"
              value={aprendiz.apellidos}
              onChange={(e) =>
                onChange({ ...aprendiz, apellidos: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
            />
          </div>

          {/* Celular */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Celular
            </label>
            <input
              type="text"
              value={aprendiz.celular}
              onChange={(e) =>
                onChange({ ...aprendiz, celular: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
            />
          </div>

          {/* Correo Electrónico */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={aprendiz.correo}
              onChange={(e) =>
                onChange({ ...aprendiz, correo: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
            />
          </div>
        </div>

        {/* Botones */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white rounded transition bg-green-600 hover:bg-green-700"
          >
            {isEditing ? "Guardar Cambios" : "Crear Aprendiz"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEditAprendizModal;
