import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useAuth } from "../contexts/AuthContext"
import { toast } from "react-toastify"

export default function Navbar() {
  const { getItemCount } = useCart()
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.info("Sesión cerrada")
    navigate("/") // vuelve al home
  }

  return (
    <nav 
      style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        padding: 12, 
        borderBottom: '1px solid #ddd',
        alignItems: "center"
      }}
    >
      {/* IZQUIERDA: enlaces */}
      <div style={{ display: "flex", gap: 16 }}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Productos</NavLink>
        <NavLink to="/cart">
          Carrito ({getItemCount()})
        </NavLink>

        {isAuthenticated && (
          <NavLink to="/checkout">Checkout</NavLink>
        )}
      </div>

      {/* DERECHA: usuario + login/logout */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {isAuthenticated && (
          <span style={{ opacity: 0.7 }}>
            Hola, <strong>{user?.username}</strong>
          </span>
        )}

        {!isAuthenticated ? (
          <NavLink to="/login">Login</NavLink>
        ) : (
          <button 
            onClick={handleLogout} 
            style={{
              background: "#dc3545",
              border: "none",
              padding: "6px 12px",
              borderRadius: 4,
              cursor: "pointer",
              color: "white",
              fontWeight: "bold"
            }}
          >
            Cerrar sesión
          </button>
        )}
      </div>
    </nav>
  )
}



