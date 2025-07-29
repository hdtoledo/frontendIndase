// src/pages/admin/UserList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminUserTable from "../../components/AdminUserTable";
import AdminEditUserModal from "../../components/AdminEditUserModal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import senaLogo from "../../assets/logogreen.png";

const UserList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchUsuarios = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/users`
      );
      setUsuarios(data);
    } catch {
      toast.error("Error al obtener usuarios");
    } finally {
      setLoading(false);
    }
  };

  const eliminarUsuario = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará al usuario permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/users/${id}`);
        setUsuarios((u) => u.filter((x) => x._id !== id));
        toast.success("Usuario eliminado correctamente");
      } catch {
        toast.error("Error al eliminar usuario");
      }
    }
  };

  const openCreateModal = () => {
    setSelectedUser({ nombre: "", correo: "", rol: "user" });
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
  try {
    if (isEditing) {
      // Editar usuario
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/${selectedUser._id}`,
        selectedUser
      );
      setUsuarios((u) =>
        u.map((x) => (x._id === data.user._id ? data.user : x))
      );
      toast.success("Usuario actualizado correctamente");
    } else {
      // Crear nuevo usuario
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/register`,
        selectedUser
      );
      setUsuarios((u) => [...u, data.user]);
      toast.success("Usuario creado correctamente");
    }
    setShowModal(false);
  } catch (error) {
    console.error("❌ Error al guardar usuario:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Error al guardar usuario");
  }
};


  useEffect(() => {
    fetchUsuarios();
  }, []);

  const filtered = usuarios.filter(
    (u) =>
      u.nombre.toLowerCase().includes(search.toLowerCase()) ||
      u.correo.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Cargando usuarios...</p>
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
            Gestión de Usuarios Admin
          </h1>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full sm:w-auto"
        >
          + Nuevo Usuario
        </button>
      </div>

      {/* Tabla y buscador */}
      <AdminUserTable
        usuarios={paginated}
        onEdit={openEditModal}
        onDelete={eliminarUsuario}
        searchTerm={search}
        setSearchTerm={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modal de edición / creación */}
      {showModal && selectedUser && (
        <AdminEditUserModal
          selectedUser={selectedUser}
          onClose={() => setShowModal(false)}
          onChange={setSelectedUser}
          onSave={handleSaveChanges}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default UserList;
