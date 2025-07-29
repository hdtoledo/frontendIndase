import React, { useState, useEffect } from "react";

const AdminAsistenciaModal = ({ aprendiz, onClose, onSave }) => {
  const fechasFijas = [
    { dia: 1, fecha: "2025-07-25" },
    { dia: 2, fecha: "2025-07-28" },
    { dia: 3, fecha: "2025-07-29" },
    { dia: 4, fecha: "2025-07-30" },
    { dia: 5, fecha: "2025-07-31" },
  ];

  const [asistencias, setAsistencias] = useState([]);

  useEffect(() => {
    const prevAsistencias = aprendiz.asistencia || [];
    const merged = fechasFijas.map((f) => {
      const existente = prevAsistencias.find((a) => a.dia === f.dia);
      return {
        ...f,
        asistio: existente ? existente.asistio : false,
        changed: false, // 👈 nuevo campo
      };
    });
    setAsistencias(merged);
  }, [aprendiz]);

  const toggleAsistencia = (index) => {
    const updated = [...asistencias];
    updated[index].asistio = !updated[index].asistio;
    updated[index].changed = true; // marcar como modificado
    setAsistencias(updated);
  };

  const handleSave = () => {
    const cambios = asistencias.filter((a) => a.changed); // solo los modificados
    if (cambios.length === 0) return onClose(); // nada que guardar

    // Mandamos SOLO el primero (o podrías iterar si quieres batch)
    onSave({
      aprendizId: aprendiz._id,
      dia: cambios[0].dia,
      fecha: cambios[0].fecha,
      asistio: cambios[0].asistio,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-green-700 text-center mb-4">
          Registrar Asistencia
        </h2>
        <p className="text-center font-semibold">
          {aprendiz.nombres} {aprendiz.apellidos}
        </p>
        <p className="text-center text-gray-500 mb-4">
          {aprendiz.numeroDocumento}
        </p>
        <p className="text-center text-gray-500 mb-4">
          Solo se puede registrar una asistencia a la vez.
          <br />
        </p>

        <div className="space-y-3">
          {asistencias.map((a, index) => (
            <div
              key={index}
              className="flex justify-between items-center border rounded px-4 py-2"
            >
              <span>
                Día {a.dia} - {new Date(a.fecha).toLocaleDateString("es-CO")}
              </span>
              <button
                onClick={() => toggleAsistencia(index)}
                className={`px-3 py-1 rounded text-white ${
                  a.asistio ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {a.asistio ? "Asistió" : "Faltó"}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAsistenciaModal;
  