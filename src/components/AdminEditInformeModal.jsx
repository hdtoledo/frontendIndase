import React, { useState } from "react";

const AdminEditInformeModal = ({
  informe,
  onClose,
  onChange,
  onSave,
  onCreate,
  isEditing,
}) => {
  const [previewImage, setPreviewImage] = useState(
    informe.imagen && typeof informe.imagen === "string"
      ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${informe.imagen}`
      : null
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      onChange({ ...informe, imagen: file });
    }
  };

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
          {isEditing ? "Editar Informe" : "Nuevo Informe"}
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            value={informe.nombre}
            onChange={(e) => onChange({ ...informe, nombre: e.target.value })}
            placeholder="Nombre del informe"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
          />
          <textarea
            value={informe.descripcion}
            onChange={(e) =>
              onChange({ ...informe, descripcion: e.target.value })
            }
            placeholder="Descripción del informe"
            className="w-full border border-gray-300 rounded px-4 py-2 h-24 resize-none focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
          />
          <select
            value={informe.esPara}
            onChange={(e) => onChange({ ...informe, esPara: e.target.value })}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
          >
            <option value="">Selecciona finalidad</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Dar de baja">Dar de baja</option>
          </select>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Vista previa"
              className="mt-2 w-full h-40 object-cover rounded border"
            />
          )}
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
            className="px-4 py-2 text-white rounded transition bg-green-600 hover:bg-green-700"
          >
            {isEditing ? "Guardar Cambios" : "Crear Informe"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEditInformeModal;
