import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProductById } from '../api/products'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { toast } from "react-toastify"
import { Helmet } from "react-helmet"

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    setLoading(true)
    fetchProductById(id)
      .then(data => setProduct(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  /* ACCESIBILIDAD */
  if (loading)
    return (
      <p 
        className="text-center mt-4"
        role="status"
        aria-live="polite"
      >
        Cargando producto...
      </p>
    )

  if (error)
    return (
      <p 
        className="text-danger text-center mt-4"
        role="alert"
      >
        Error: {error}
      </p>
    )

  if (!product) return null

  return (
    <div className="container mt-4">

      {/* SEO */}
      <Helmet>
        <title>{product.name} | Motorsport Store</title>
        <meta name="description" content={`Detalles del producto ${product.name}.`} />
      </Helmet>

      <div className="row">

        {/* IMAGEN DEL PRODUCTO */}
        <div className="col-12 col-md-5 d-flex justify-content-center mb-3">
          <img 
            src={product.image} 
            alt={`Imagen del producto ${product.name}`}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: '350px', objectFit: 'contain' }}
            role="img"
          />
        </div>

        {/* INFORMACIÓN */}
        <div className="col-12 col-md-7">
          
          {/* TÍTULO PRODUCTO */}
          <h1 
            className="mb-3"
            id="product-title"
          >
            {product.name}
          </h1>

          {/* DESCRIPCIÓN */}
          <p 
            className="text-muted" 
            style={{ maxWidth: 600 }}
            aria-describedby="product-title"
          >
            {product.description}
          </p>

          {/* PRECIO */}
          <h2 
            className="mt-3 mb-3"
            aria-label={`Precio ${product.price} pesos`}
          >
            <strong>${product.price}</strong>
          </h2>

          {/* BOTÓN AGREGAR */}
          <button
            className="btn btn-dark px-4 py-2"
            aria-label={`Agregar el producto ${product.name} al carrito`}
            onClick={() => {
              if (!isAuthenticated) {
                toast.error("Debes iniciar sesión para agregar productos al carrito")
                return
              }

              addToCart(product)
              toast.success("Producto agregado al carrito")
            }}
          >
            Agregar al carrito
          </button>

        </div>
      </div>

    </div>
  )
}


