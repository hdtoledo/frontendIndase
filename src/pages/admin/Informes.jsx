// src/pages/admin/Informes.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import senaLogo from "../../assets/logogreen.png";
import AdminInformeTable from "../../components/AdminInformeTable";
import {
  generarPDFGeneral,
  generarPDFPorFicha,
  generarPDFPorAprendiz,
  generarExcelGeneral,
} from "../../utils/pdfUtils";

const Informes = () => {
  const [aprendices, setAprendices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAprendices, setSelectedAprendices] = useState([]);
  const itemsPerPage = 10;

  const fetchAprendices = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/aprendices`
      );
      setAprendices(data);
    } catch (error) {
      toast.error("Error al obtener aprendices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAprendices();
  }, []);

  // 🔍 Filtro
  const filtered = aprendices.filter((a) => {
    const fullName = `${a.nombres} ${a.apellidos}`.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) ||
      a.numeroDocumento.toLowerCase().includes(search.toLowerCase())
    );
  });

  // 📑 Paginación
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ✅ Selección individual
  const handleToggleAprendiz = (doc) => {
    setSelectedAprendices((prev) =>
      prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]
    );
  };

  // ✅ Seleccionar/Deseleccionar todos
  const handleToggleAll = (checked) => {
    if (checked) {
      setSelectedAprendices(filtered.map((a) => a.numeroDocumento));
    } else {
      setSelectedAprendices([]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Cargando informes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Cabecera y acciones */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={senaLogo} alt="SENA Logo" className="h-10" />
            <h1 className="text-xl sm:text-2xl font-bold text-green-700">
              Informes de Asistencias
            </h1>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end gap-2">
            <button
              onClick={() => generarPDFGeneral(aprendices)}
              className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 text-sm sm:text-base"
            >
              📄 Informe General (PDF)
            </button>
            <button
              onClick={() => generarExcelGeneral(aprendices)}
              className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm sm:text-base"
            >
              📊 Exportar General (Excel)
            </button>
            <button
              onClick={() => generarPDFPorFicha(aprendices, "3229944")}
              className="bg-yellow-600 text-white px-3 py-2 rounded hover:bg-yellow-700 text-sm sm:text-base"
            >
              📄 Informe por Ficha
            </button>
            <button
              disabled={selectedAprendices.length === 0}
              onClick={() =>
                selectedAprendices.forEach((doc) => {
                  const aprendiz = aprendices.find(
                    (a) => a.numeroDocumento === doc
                  );
                  if (aprendiz) generarPDFPorAprendiz(aprendiz);
                })
              }
              className={`px-3 py-2 rounded text-sm sm:text-base transition ${
                selectedAprendices.length === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              📄 Informe por Aprendiz
            </button>
          </div>
        </div>
      </div>

      {/* Contenedor de Búsqueda */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
        <div className="relative w-full sm:w-96 mx-auto">
          <input
            type="text"
            placeholder="🔍 Buscar por nombre, apellido o documento..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 shadow-sm 
                 focus:ring-2 focus:ring-green-400 focus:border-green-500 
                 outline-none text-gray-700 placeholder-gray-400 transition"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600 text-lg">
            <i className="fas fa-search"></i>
          </span>
        </div>
      </div>

      {/* Tabla con paginación */}
      <AdminInformeTable
        aprendices={paginated}
        selectedAprendices={selectedAprendices}
        onToggleAprendice={handleToggleAprendiz}
        onToggleAll={handleToggleAll}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Informes;
