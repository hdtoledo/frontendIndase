import React, { useState } from "react";
import * as XLSX from "xlsx";
import { FaFileExcel, FaUpload } from "react-icons/fa";

const UploadAprendicesModal = ({ onClose, onUpload }) => {
  const [previewData, setPreviewData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [numeroFicha, setNumeroFicha] = useState("Sin ficha");
  const [formacion, setFormacion] = useState("Sin formación");

  const handleFileUpload = (file) => {
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // === Extraer ficha y formación desde fila 2 col C (índice 2) ===
      const fichaRaw = parsedData[1] && parsedData[1][2] ? parsedData[1][2] : "";
      let fichaNumber = "Sin ficha";
      let formacionName = "Sin formación";

      if (fichaRaw) {
        fichaNumber = fichaRaw.split("-")[0].trim();
        formacionName = fichaRaw.includes("-")
          ? fichaRaw.split("-").slice(1).join("-").trim()
          : "Sin formación";
      }

      setNumeroFicha(fichaNumber);
      setFormacion(formacionName);

      // Encabezados en fila 5 (índice 4)
      const headers = parsedData[4] || [];

      // Datos desde fila 6 (índice 5)
      const rows = parsedData.slice(5);

      // Mapear registros
      const dataMapped = rows.map((row) => {
        const obj = {};
        headers.forEach((h, i) => {
          const key = h
            ? h.toString().trim().toLowerCase().replace(/ /g, "").replace(/[^a-z0-9]/gi, "")
            : `col${i}`;
          obj[key] = row[i] ? row[i].toString().trim() : "";
        });

        // Incluir ficha y formación
        obj.numeroFicha = fichaNumber;
        obj.formacion = formacionName;

        if (!obj.celular) obj.celular = "No registra";

        return obj;
      });

      setPreviewData(dataMapped);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFileChange = (e) => handleFileUpload(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files[0]);
  };

  const handleSubmit = () => {
    if (previewData.length === 0) {
      alert("Debes seleccionar un archivo válido.");
      return;
    }

    onUpload(previewData);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-5xl transition-all flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
          📊 Carga Masiva de Aprendices
        </h2>

        {/* Zona de carga */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
            dragOver ? "border-green-600 bg-green-50" : "border-gray-300"
          }`}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <FaFileExcel className="mx-auto text-green-600 text-5xl mb-3" />
          <p className="text-gray-700 font-medium">
            {fileName
              ? `Archivo seleccionado: ${fileName}`
              : "Haz clic o arrastra tu archivo Excel aquí"}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Formatos permitidos: .xls, .xlsx
          </p>
          <input
            id="fileInput"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Información de ficha */}
        {(numeroFicha || formacion) && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4 mb-4 sticky top-0 z-10">
            <p className="text-green-800 font-semibold">
              📌 Ficha: {numeroFicha}
            </p>
            <p className="text-gray-700 text-sm">Formación: {formacion}</p>
            <p className="text-gray-700 text-sm mt-1">
              Total aprendices a cargar:{" "}
              <span className="font-bold text-green-700">
                {previewData.length}
              </span>
            </p>
          </div>
        )}

        {/* Vista previa */}
        {previewData.length > 0 && (
          <div className="overflow-auto flex-1 border rounded-lg p-2">
            <table className="w-full text-sm border">
              <thead className="bg-green-600 text-white sticky top-0">
                <tr>
                  <th className="px-2 py-1">#</th>
                  {Object.keys(previewData[0])
                    .filter((k) => k !== "_errors")
                    .map((key) => (
                      <th key={key} className="px-2 py-1">
                        {key}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {previewData.map((row, idx) => (
                  <tr key={idx} className="odd:bg-gray-50">
                    <td className="px-2 py-1 font-semibold text-gray-700">
                      {idx + 1}
                    </td>
                    {Object.keys(row)
                      .filter((k) => k !== "_errors")
                      .map((key, i) => (
                        <td key={i} className="px-2 py-1 text-gray-800">
                          {row[key]}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Botones */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 flex items-center gap-2 text-white rounded bg-green-600 hover:bg-green-700 transition"
          >
            <FaUpload /> Subir Aprendices
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadAprendicesModal;
