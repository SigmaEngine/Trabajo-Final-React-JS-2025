import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Helmet } from "react-helmet"

import Layout from './components/Layout'
import ProductList from './components/ProductList'
import ProductPage from './components/ProductPage'
import Cart from './components/Cart'
import Login from './components/Login'
import Checkout from './components/Checkout'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

// CRUD
import CreateProduct from './pages/CreateProduct'
import EditProduct from './pages/EditProduct'

// Imágenes
import imgGT from './assets/gt.jpg'
import imgFormulas from './assets/formulas.jpg'
import imgRally from './assets/rally.jpg'
import imgStock from './assets/stock.jpg'

/* ============================================
      HOME (con búsqueda funcional)
   ============================================ */
import { useState } from "react";

function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/products?search=${encodeURIComponent(search)}`);
  };

  return (
    <>
      <Helmet>
        <title>Inicio | Automovilismo del bueno</title>
        <meta 
          name="description" 
          content="Tienda online de automovilismo con productos de GT, Fórmulas, Rally y mucho más." 
        />
      </Helmet>

      <div className="app-hero">
        <div className="hero-content">
          <h1 className="hero-title">Tu tienda de Automovilismo</h1>
          <p className="hero-sub">Velocidad, pasión y competencia — Todo en un solo lugar</p>

          {/* Buscador */}
          <div className="glass" role="search">
            <input
              type="text"
              placeholder="Buscar producto..."
              aria-label="Buscar producto"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: '10px 12px',
                borderRadius: '8px',
                border: 'none',
                marginRight: '8px',
              }}
            />
            <button className="btn-primary" onClick={handleSearch}>
              Buscar
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

/* ============================================
      CATEGORIES SECTION
   ============================================ */
function CategoriesSection() {
  return (
    <div style={{ padding: 20, backgroundColor: '#f4f4f4' }}>
      <Helmet>
        <meta name="description" content="Categorías destacadas: Gran Turismo, Fórmulas, Rally y Stock Cars." />
      </Helmet>

      <h2 style={{ marginBottom: 15 }}>Categorías destacadas</h2>

      <div
        style={{
          display: 'grid',
          gap: 20,
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        }}
      >
        <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden' }}>
          <img src={imgGT} alt="Gran Turismo" style={{ width: '100%', height: 140, objectFit: 'cover' }} />
          <div style={{ padding: 12 }}>
            <h3>Gran Turismo</h3>
            <p>Coches GT, Endurance y Prototipos.</p>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden' }}>
          <img src={imgFormulas} alt="Fórmulas" style={{ width: '100%', height: 140, objectFit: 'cover' }} />
          <div style={{ padding: 12 }}>
            <h3>Formulas</h3>
            <p>Monoplazas y Categorías de alta velocidad.</p>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden' }}>
          <img src={imgRally} alt="Rally" style={{ width: '100%', height: 140, objectFit: 'cover' }} />
          <div style={{ padding: 12 }}>
            <h3>Rally</h3>
            <p>Off-Road, WRC y desafíos extremos.</p>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden' }}>
          <img src={imgStock} alt="Stock Cars" style={{ width: '100%', height: 140, objectFit: 'cover' }} />
          <div style={{ padding: 12 }}>
            <h3>Stock Cars</h3>
            <p>Turismos potentes y Competición Americana.</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 30 }}>
        <a href="/products">
          <button>Ver productos</button>
        </a>
      </div>
    </div>
  );
}

/* ============================================
      ROUTER PRINCIPAL
   ============================================ */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* HOME */}
        <Route
          index
          element={
            <>
              <Home />
              <CategoriesSection />
            </>
          }
        />

        {/* PRODUCT LIST */}
        <Route 
          path="products" 
          element={
            <>
              <Helmet>
                <title>Productos | Automovilismo del bueno</title>
                <meta name="description" content="Explora todos los productos de automovilismo disponibles en nuestro catálogo." />
              </Helmet>
              <ProductList />
            </>
          }
        />

        {/* PRODUCT PAGE */}
        <Route path="product/:id" element={<ProductPage />} />

        {/* LOGIN */}
        <Route 
          path="login" 
          element={
            <>
              <Helmet>
                <title>Iniciar sesión | Automovilismo del bueno</title>
                <meta name="description" content="Accede a tu cuenta para comprar o administrar productos." />
              </Helmet>
              <Login />
            </>
          }
        />

        {/* CRUD (PROTEGIDO) */}
        <Route
          path="products/create"
          element={
            <ProtectedRoute>
              <Helmet><title>Crear producto | Automovilismo del bueno</title></Helmet>
              <CreateProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="products/edit/:id"
          element={
            <ProtectedRoute>
              <Helmet><title>Editar producto | Automovilismo del bueno</title></Helmet>
              <EditProduct />
            </ProtectedRoute>
          }
        />

        {/* CART */}
        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <Helmet><title>Carrito | Automovilismo del bueno</title></Helmet>
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* CHECKOUT */}
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <Helmet><title>Checkout | Automovilismo del bueno</title></Helmet>
              <Checkout />
            </ProtectedRoute>
          }
        />

      </Route>
    </Routes>
  )
}






