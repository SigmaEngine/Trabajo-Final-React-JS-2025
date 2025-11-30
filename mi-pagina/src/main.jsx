import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// Contextos
import { CartProvider } from './contexts/CartContext'
import { AuthProvider } from './contexts/AuthContext'

// Estilos globales
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'

// Toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
          {/* Notificaciones globales */}
          <ToastContainer 
            position="top-right"
            autoClose={2000}
            pauseOnHover
            theme="dark"
          />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)

// Efecto scroll UI
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    document.body.classList.add('scrolled')
  } else {
    document.body.classList.remove('scrolled')
  }
})



