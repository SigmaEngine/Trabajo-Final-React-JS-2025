import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'

// Styled Components
import { 
  CardContainer,
  ProductImage,
  ProductTitle,
  PriceRow,
  AddButton,
  AdminButtons,
  AdminButtonEdit,
  AdminButtonDelete
} from "./styles/ProductCard.styles"

// Icons
import { FaCartPlus, FaEdit, FaTrash } from "react-icons/fa"

export default function ProductCard({ product, onEdit, onDelete }) {
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()

  return (
    <CardContainer className="shadow-sm">

      {/* LINK AL PRODUCTO */}
      <Link 
        to={`/product/${product.id}`}
        aria-label={`Ver detalles del producto ${product.name}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <ProductImage 
          src={product.image}
          alt={product.name}
        />

        <ProductTitle>{product.name}</ProductTitle>
      </Link>

      {/* PRECIO + BOTÓN AGREGAR */}
      <PriceRow>
        <strong>${product.price}</strong>

        <AddButton
          onClick={() => {
            if (!isAuthenticated) {
              alert("Debes iniciar sesión para agregar productos al carrito")
              return
            }
            addToCart(product)
          }}
          aria-label={`Agregar ${product.name} al carrito`}
        >
          <FaCartPlus size={18} aria-hidden="true" />
        </AddButton>
      </PriceRow>

      {/* BOTONES DE ADMIN */}
      {isAuthenticated && (
        <AdminButtons>

          {/* EDITAR */}
          <AdminButtonEdit 
            onClick={() => onEdit && onEdit(product)}
            aria-label={`Editar producto ${product.name}`}
          >
            <FaEdit aria-hidden="true" />
            Editar
          </AdminButtonEdit>

          {/* ELIMINAR */}
          <AdminButtonDelete
            onClick={() => onDelete && onDelete(product)}
            aria-label={`Eliminar producto ${product.name}`}
          >
            <FaTrash aria-hidden="true" />
            Eliminar
          </AdminButtonDelete>

        </AdminButtons>
      )}

    </CardContainer>
  )
}






