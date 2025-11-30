import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });

  // 👉 Si ya está autenticado, bloquear acceso al login
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = login(form);

    if (!result.success) {
      toast.error(result.message); // ❗ Toastify en lugar de <p> error
      return;
    }

    toast.success("Sesión iniciada");
    navigate("/");
  };

  return (
    <div className="container d-flex justify-content-center mt-5">

      {/* SEO */}
      <Helmet>
        <title>Iniciar Sesión | Motorsport Store</title>
        <meta name="description" content="Inicia sesión para acceder a tu carrito y funciones protegidas." />
      </Helmet>

      <div className="card shadow p-4" style={{ maxWidth: 400, width: "100%" }}>
        <h3 className="text-center mb-3">
          <FaSignInAlt className="me-2" />
          Iniciar Sesión
        </h3>

        <form onSubmit={handleSubmit}>

          {/* USUARIO */}
          <div className="mb-3">
            <label className="form-label">
              <FaUser className="me-2" /> Usuario
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Ej: admin"
              onChange={handleChange}
              required
              aria-label="Ingresar nombre de usuario"
            />
          </div>

          {/* CONTRASEÑA */}
          <div className="mb-3">
            <label className="form-label">
              <FaLock className="me-2" /> Contraseña
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Contraseña"
              onChange={handleChange}
              required
              aria-label="Ingresar contraseña"
            />
          </div>

          {/* BOTÓN */}
          <button type="submit" className="btn btn-dark w-100 py-2">
            <FaSignInAlt className="me-2" />
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}


