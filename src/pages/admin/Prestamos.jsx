import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import AdminPrestamosTable from "../../components/AdminPrestamosTable";
import AdminEditPrestamosModal from "../../components/AdminEditPrestamosModal";
import senaLogo from "../../assets/logogreen.png";

const Prestamos = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [productos, setProductos] = useState([]); // <--- Lista de productos
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPrestamo, setSelectedPrestamo] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const itemsPerPage = 5;

  // Fetch préstamos
  const fetchPrestamos = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/prestamos`);
      setPrestamos(data);
    } catch (err) {
      console.error("Error al obtener préstamos:", err);
      toast.error("Error al obtener préstamos");
    }
  };

  // Fetch productos
  const fetchProductos = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/productos`);
      setProductos(data);
    } catch (err) {
      console.error("Error al obtener productos:", err);
      toast.error("Error al obtener productos");
    }
  };

  // Al montar, traemos ambos recursos
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchPrestamos(), fetchProductos()]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Eliminar préstamo
  const eliminarPrestamo = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el préstamo permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/prestamos/${id}`);
        setPrestamos((p) => p.filter((x) => x._id !== id));
        toast.success("Préstamo eliminado correctamente");
      } catch (err) {
        console.error("Error al eliminar préstamo:", err);
        toast.error("Error al eliminar préstamo");
      }
    }
  };

  // Abrir modal de edición
  const openEditModal = (p) => {
    setSelectedPrestamo({
      ...p,
      fechaPrestamo: p.fechaPrestamo
        ? new Date(p.fechaPrestamo).toISOString().slice(0, 10)
        : "",
      fechaDevolucion: p.fechaDevolucion
        ? new Date(p.fechaDevolucion).toISOString().slice(0, 10)
        : "",
    });
    setIsEditing(true);
    setShowModal(true);
  };

  // Abrir modal de creación
  const openCreateModal = () => {
    setSelectedPrestamo({
      nombreAprendiz: "",
      apellidosAprendiz: "",
      ficha: "",
      producto: productos.length > 0 ? productos[0]._id : "", // valor por defecto
      cantidad: "",
      fechaPrestamo: new Date().toISOString().slice(0, 10),
      devuelto: "no",
      estadoEntrega: "Buen estado",
      comentarios: "",
      fechaDevolucion: "",
    });
    setIsEditing(false);
    setShowModal(true);
  };

  // Guardar cambios (editar)
  const handleSaveChanges = async () => {
    try {
      const payload = {
        ...selectedPrestamo,
        fechaPrestamo: selectedPrestamo.fechaPrestamo,
        fechaDevolucion: selectedPrestamo.fechaDevolucion || null,
      };
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/prestamos/${selectedPrestamo._id}`,
        payload
      );
      setPrestamos((p) =>
        p.map((x) => (x._id === data._id ? data : x))
      );
      toast.success("Préstamo actualizado correctamente");
      setShowModal(false);
    } catch (err) {
      console.error("Error al actualizar préstamo:", err);
      toast.error("Error al actualizar préstamo");
    }
  };

  // Crear préstamo
  const handleCreatePrestamo = async () => {
    try {
      const payload = {
        ...selectedPrestamo,
        fechaPrestamo: selectedPrestamo.fechaPrestamo,
        fechaDevolucion: selectedPrestamo.fechaDevolucion || null,
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/prestamos`,
        payload
      );
      setPrestamos((p) => [data, ...p]);
      toast.success("Préstamo creado exitosamente");
      setShowModal(false);
    } catch (err) {
      console.error("Error al crear préstamo:", err);
      toast.error("Error al crear préstamo");
    }
  };

  // Filtrado y paginación
  const filtered = prestamos.filter(
    (p) =>
      p.nombreAprendiz.toLowerCase().includes(search.toLowerCase()) ||
      p.apellidosAprendiz.toLowerCase().includes(search.toLowerCase()) ||
      // p.producto será ObjectId o objeto poblado
      (p.producto &&
        (typeof p.producto === "string"
          ? p.producto.toLowerCase().includes(search.toLowerCase())
          : p.producto.nombre
              .toLowerCase()
              .includes(search.toLowerCase())))
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Cargando préstamos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Cabecera */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 mb-6 flex items-center">
        <img src={senaLogo} alt="SENA Logo" className="h-10 mr-4" />
        <h1 className="text-2xl font-bold text-green-700">
          Gestión de Préstamos
        </h1>
      </div>

      {/* Tabla y buscador */}
      <AdminPrestamosTable
        prestamos={paginated}
        onEdit={openEditModal}
        onDelete={eliminarPrestamo}
        onCreate={openCreateModal}
        searchTerm={search}
        setSearchTerm={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modal */}
      {showModal && selectedPrestamo && (
        <AdminEditPrestamosModal
          prestamo={selectedPrestamo}
          onClose={() => setShowModal(false)}
          onChange={setSelectedPrestamo}
          onSave={handleSaveChanges}
          onCreate={handleCreatePrestamo}
          isEditing={isEditing}
          productos={productos} // <--- Pasamos la lista
        />
      )}
    </div>
  );
};

export default Prestamos;
