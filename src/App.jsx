// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Páginas públicas
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

// Páginas de usuario/pasante
import Dashboard from "./pages/Dashboard";
import Prestamos from "./pages/admin/Prestamos"; // o muévelo a pages/user

// Páginas de administrador
import Usuarios from "./pages/admin/UserList";
import Productos from "./pages/admin/Productos";
import AdminWelcome from "./components/Welcome";

// Layouts y rutas protegidas
import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Informes from "./pages/admin/Informes";
import Aprendices from "./pages/admin/Aprendices";
import Asistencias from "./pages/admin/Asistencias";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const onLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Layout para usuario/pasante */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <UserLayout user={user} onLogout={onLogout} />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="prestamos" element={<Prestamos />} />
        </Route>

        {/* Layout para admin */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout user={user} onLogout={onLogout} />
            </AdminRoute>
          }
        >
          {/* index equivale a /admin */}
          <Route index element={<AdminWelcome user={user} />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="aprendices" element={<Aprendices />} />
          <Route path="asistencias" element={<Asistencias />} />
          <Route path="prestamos" element={<Prestamos />} />
          <Route path="informes" element={<Informes />} />
          
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </Router>
  );
};

export default App;
