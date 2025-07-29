import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminAsistenciaTable from "../../components/AdminAsistenciaTable";
import AdminAsistenciaModal from "../../components/AdminAsistenciaModal";
import { toast } from "react-toastify";
import senaLogo from "../../assets/logogreen.png";

const Asistencias = () => {
  const [aprendices, setAprendices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAprendiz, setSelectedAprendiz] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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

  const openAsistenciaModal = (aprendiz) => {
    setSelectedAprendiz(aprendiz);
    setShowModal(true);
  };

const handleSaveAsistencia = async (asistencia) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/aprendices/${selectedAprendiz._id}/asistencia`,
      asistencia,
      { headers: { "Content-Type": "application/json" } }
    );
    toast.success("Asistencia registrada correctamente");
    fetchAprendices();
    setShowModal(false);
  } catch (error) {
    console.error("Error guardando asistencia:", error.response?.data || error);
    toast.error(error.response?.data?.error || "Error al registrar asistencia");
  }
};




  // Filtro
  const filtered = aprendices.filter((a) => {
    const fullName = `${a.nombres} ${a.apellidos}`.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) ||
      a.numeroDocumento.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Paginación
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Cargando asistencias...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Cabecera */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={senaLogo} alt="SENA Logo" className="h-10" />
          <h1 className="text-2xl font-bold text-green-700">
            Gestión de Asistencias
          </h1>
        </div>
        <input
          type="text"
          placeholder="Buscar por nombre, apellido o documento..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-80 border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
        />
      </div>

      {/* Tabla */}
      <AdminAsistenciaTable
        aprendices={paginated}
        onAsistencia={openAsistenciaModal}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modal */}
      {showModal && selectedAprendiz && (
        <AdminAsistenciaModal
          aprendiz={selectedAprendiz}
          onClose={() => setShowModal(false)}
          onSave={handleSaveAsistencia}
        />
      )}
    </div>
  );
};

export default Asistencias;
