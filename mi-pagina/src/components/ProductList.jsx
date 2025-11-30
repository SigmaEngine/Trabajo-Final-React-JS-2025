import React, { useEffect, useState } from 'react'
import { fetchProducts, deleteProduct } from '../api/products'
import ProductCard from './ProductCard'
import { useAuth } from '../contexts/AuthContext'
import { toast } from "react-toastify"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Helmet } from "react-helmet"

export default function ProductList() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Búsqueda por URL
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get("search")?.toLowerCase() || ""

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [showModal, setShowModal] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)

  // PAGINACIÓN
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8

  const loadProducts = () => {
    setLoading(true)
    fetchProducts()
      .then(data => setProducts(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadProducts()
  }, [])

  // Resetear página al cambiar búsqueda
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const confirmDelete = async () => {
    if (!productToDelete) return

    try {
      await deleteProduct(productToDelete.id)
      toast.success("Producto eliminado correctamente")
      setShowModal(false)
      loadProducts()
    } catch {
      toast.error("Error al eliminar producto")
    }
  }

  // FILTRAR POR BÚSQUEDA
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery)
  )

  // PAGINACIÓN
  const indexOfLast = currentPage * productsPerPage
  const indexOfFirst = indexOfLast - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  if (loading)
    return (
      <p className="text-center mt-3" role="status" aria-live="polite">
        Cargando productos...
      </p>
    )

  if (error)
    return (
      <p className="text-danger text-center mt-3" role="alert">
        Error: {error}
      </p>
    )

  return (
    <div className="container mt-4">

      <Helmet>
        <title>Productos | Automovilismo del bueno</title>
        <meta 
          name="description" 
          content="Explora todas las miniaturas, autos de colección y productos de automovilismo disponibles."
        />
      </Helmet>

      {/* BOTÓN CREAR PRODUCTO */}
      {isAuthenticated && (
        <div className="mb-3">
          <button 
            className="btn btn-success"
            onClick={() => navigate("/products/create")}
            aria-label="Crear un nuevo producto"
          >
            + Crear producto
          </button>
        </div>
      )}

      {/* RESULTADO DE BÚSQUEDA */}
      {searchQuery && (
        <p className="text-muted">
          Resultados para: <strong>"{searchQuery}"</strong>
        </p>
      )}

      {/* SIN RESULTADOS */}
      {filteredProducts.length === 0 && (
        <p className="text-center mt-4 text-danger">
          No se encontraron productos.
        </p>
      )}

      {/* LISTA DE PRODUCTOS */}
      <div className="row g-3" role="list">
        {currentProducts.map(p => (
          <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3" role="listitem">
            <ProductCard 
              product={p}
              onEdit={
                isAuthenticated 
                  ? () => navigate(`/products/edit/${p.id}`)
                  : null
              }
              onDelete={
                isAuthenticated
                  ? () => {
                      setProductToDelete(p)
                      setShowModal(true)
                    }
                  : null
              }
            />
          </div>
        ))}
      </div>

      {/* PAGINACIÓN */}
      {totalPages > 1 && (
        <nav className="mt-4 d-flex justify-content-center">
          <ul className="pagination">

            {/* Anterior */}
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button 
                className="page-link"
                onClick={() => setCurrentPage(prev => prev - 1)}
                aria-label="Página anterior"
              >
                «
              </button>
            </li>

            {/* Números */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
              <li 
                key={num} 
                className={`page-item ${currentPage === num ? "active" : ""}`}
              >
                <button 
                  className="page-link"
                  aria-label={`Ir a la página ${num}`}
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </button>
              </li>
            ))}

            {/* Siguiente */}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button 
                className="page-link"
                onClick={() => setCurrentPage(prev => prev + 1)}
                aria-label="Página siguiente"
              >
                »
              </button>
            </li>

          </ul>
        </nav>
      )}

      {/* MODAL */}
      {isAuthenticated && showModal && (
        <div 
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.6)" }}
          onClick={() => setShowModal(false)}
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
        >
          <div 
            className="modal-dialog"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title" id="modal-title">
                  Confirmar eliminación
                </h5>
                <button 
                  className="btn-close"
                  aria-label="Cerrar modal"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body" id="modal-desc">
                ¿Seguro que querés eliminar 
                <strong> {productToDelete?.name}</strong>?
              </div>

              <div className="modal-footer">
                <button 
                  className="btn btn-danger"
                  onClick={confirmDelete}
                  aria-label="Confirmar eliminación del producto"
                >
                  Eliminar
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                  aria-label="Cancelar eliminación"
                >
                  Cancelar
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  )
}









