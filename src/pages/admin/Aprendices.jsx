import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import AdminAprendizTable from "../../components/AdminAprendizTable";
import AdminEditAprendizModal from "../../components/AdminEditAprendizModal";
import UploadAprendicesModal from "../../components/UploadAprendicesModal";
import senaLogo from "../../assets/logogreen.png";

const Aprendices = () => {
  const [aprendices, setAprendices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [selectedAprendiz, setSelectedAprendiz] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Obtener aprendices
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

  // Eliminar aprendiz
  const eliminarAprendiz = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará al aprendiz permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/api/aprendices/${id}`
        );
        setAprendices((prev) => prev.filter((a) => a._id !== id));
        toast.success("Aprendiz eliminado correctamente");
      } catch {
        toast.error("Error al eliminar aprendiz");
      }
    }
  };

  // Modal Crear
  const openCreateModal = () => {
    setSelectedAprendiz({
      tipoDocumento: "",
      numeroDocumento: "",
      nombres: "",
      apellidos: "",
      celular: "",
      correo: "",
      numeroFicha: "",
      formacion: "",
    });
    setIsEditing(false);
    setShowModal(true);
  };

  // Modal Editar
  const openEditModal = (aprendiz) => {
    setSelectedAprendiz(aprendiz);
    setIsEditing(true);
    setShowModal(true);
  };

  // Guardar cambios
  const handleSaveChanges = async () => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/aprendices/${selectedAprendiz._id}`,
        selectedAprendiz,
        { headers: { "Content-Type": "application/json" } }
      );
      setAprendices((prev) =>
        prev.map((a) => (a._id === data._id ? data : a))
      );
      toast.success("Aprendiz actualizado correctamente");
      setShowModal(false);
    } catch {
      toast.error("Error al actualizar aprendiz");
    }
  };

  // Crear aprendiz
  const handleCreateAprendiz = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/aprendices`,
        selectedAprendiz,
        { headers: { "Content-Type": "application/json" } }
      );
      setAprendices((prev) => [...prev, data]);
      toast.success("Aprendiz creado exitosamente");
      setShowModal(false);
    } catch (error) {
      toast.error(error.response?.data?.error || "Error al crear aprendiz");
    }
  };

  // Carga masiva
const handleBulkUpload = async (data) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/aprendices/bulk`,
      JSON.stringify(data), // 👈 forzar stringify
      { headers: { "Content-Type": "application/json" } }
    );
    toast.success("Aprendices cargados exitosamente");
    fetchAprendices();
    setShowBulkModal(false);
  } catch (error) {
    console.error("Error bulk upload:", error.response?.data || error.message);
    toast.error(error.response?.data?.error || "Error en la carga masiva de aprendices");
  }
};

  // Filtro
  const filtered = aprendices.filter((a) => {
    const fullName = `${a.nombres} ${a.apellidos}`.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) ||
      a.numeroDocumento.toLowerCase().includes(search.toLowerCase()) ||
      a.numeroFicha.toLowerCase().includes(search.toLowerCase())
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
        <p className="text-gray-500">Cargando aprendices...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Cabecera */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 mb-6 flex items-center">
        <img src={senaLogo} alt="SENA Logo" className="h-10 mr-4" />
        <h1 className="text-2xl font-bold text-green-700">
          Gestión de Aprendices
        </h1>
      </div>

      {/* Tabla */}
      <AdminAprendizTable
        aprendices={paginated}
        onEdit={openEditModal}
        onDelete={eliminarAprendiz}
        onCreate={openCreateModal}
        onBulkUpload={() => setShowBulkModal(true)}
        searchTerm={search}
        setSearchTerm={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />

      {/* Modal Crear/Editar */}
      {showModal && (
        <AdminEditAprendizModal
          aprendiz={selectedAprendiz}
          onClose={() => setShowModal(false)}
          onChange={setSelectedAprendiz}
          onSave={handleSaveChanges}
          onCreate={handleCreateAprendiz}
          isEditing={isEditing}
        />
      )}

      {/* Modal Carga Masiva */}
      {showBulkModal && (
        <UploadAprendicesModal
          onClose={() => setShowBulkModal(false)}
          onUpload={handleBulkUpload}
        />
      )}
    </div>
  );
};

export default Aprendices;
