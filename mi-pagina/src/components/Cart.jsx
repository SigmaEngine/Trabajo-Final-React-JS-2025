import React from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css"; // <-- AGREGAMOS CSS

export default function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Carrito</h1>

      {cart.length === 0 ? (
        <p className="text-center">El carrito está vacío.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-card shadow-sm">
              {/* Imagen */}
              <img 
                src={item.image} 
                alt={item.name} 
                className="cart-img"
              />

              {/* Información */}
              <div className="cart-info">
                <h4>{item.name}</h4>

                <div className="cart-controls">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>

                  <strong className="cart-price">
                    ${item.price * item.quantity}
                  </strong>
                </div>

                <button 
                  className="btn btn-danger btn-sm mt-2"
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          {/* Total */}
          <h3 className="mt-4">
            Total: <strong>${total}</strong>
          </h3>

          {/* Botones */}
          <div className="mt-3 d-flex gap-2">
            <button 
              className="btn btn-primary"
              onClick={() => navigate("/checkout")}
            >
              Comprar
            </button>

            <button 
              className="btn btn-secondary"
              onClick={clearCart}
            >
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
}


