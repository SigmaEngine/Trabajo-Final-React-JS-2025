import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { FaCheckCircle } from "react-icons/fa";
import "./Checkout.css";

export default function Checkout() {
  const { user } = useAuth();
  const { cart, getTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const total = getTotal();

  const [form, setForm] = useState({
    name: "",
    number: "",
    exp: "",
    cvv: "",
  });

  const [confirmStep, setConfirmStep] = useState(false);

  // 🟦 Si el carrito está vacío
  if (cart.length === 0) {
    return (
      <div className="container mt-4 text-center">
        <Helmet>
          <title>Checkout | Motorsport Store</title>
          <meta name="description" content="Confirmá tu compra." />
        </Helmet>

        <h2>Tu carrito está vacío</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/products")}>
          Ver productos
        </button>
      </div>
    );
  }

  // ➤ Validación
  const validate = () => {
    if (form.name.length < 3) return "El nombre es inválido";
    if (form.number.length !== 16) return "La tarjeta debe tener 16 números";
    if (!/^\d{2}\/\d{2}$/.test(form.exp)) return "Fecha inválida (MM/AA)";
    if (form.cvv.length !== 3) return "CVV inválido";
    return null;
  };

  // ➤ Cambios en los inputs
  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.name === "number") {
      value = value.replace(/\D/g, "").slice(0, 16);
    }
    if (e.target.name === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 3);
    }
    if (e.target.name === "exp") {
      value = value.replace(/\D/g, "").slice(0, 4);
      if (value.length >= 3) {
        value = value.slice(0, 2) + "/" + value.slice(2);
      }
    }

    setForm({ ...form, [e.target.name]: value });
  };

  // ➤ Acción de pago
  const handlePay = () => {
    const error = validate();
    if (error) return toast.error(error);
    setConfirmStep(true);
  };

  const finish = () => {
    clearCart();
    toast.success("¡Compra realizada con éxito!");
    navigate("/");
  };

  return (
    <div className="container mt-4">

      {/* 🔹 SEO */}
      <Helmet>
        <title>Checkout | Motorsport Store</title>
        <meta
          name="description"
          content="Confirmá tu compra y gestioná tu pedido en Motorsports Store."
        />
      </Helmet>

      <div className="card shadow p-4">
        <h2 className="mb-3">
          <FaCheckCircle className="text-success me-2" />
          Checkout
        </h2>

        <p className="mb-1">
          <strong>Usuario:</strong> {user?.username}
        </p>

        <p className="text-muted">
          Esta es una simulación del proceso de compra. 🚀  
        </p>

        {/* TARJETA VISUAL */}
        <div className="credit-card mt-4">
          <div className="cc-chip"></div>

          <div className="cc-number">
            {form.number.padEnd(16, "•").replace(/(.{4})/g, "$1 ")}
          </div>

          <div className="cc-row">
            <span className="cc-label">Titular:</span>
            <span className="cc-value">{form.name || "Nombre Apellido"}</span>
          </div>

          <div className="cc-row">
            <span className="cc-label">Vencimiento:</span>
            <span className="cc-value">{form.exp || "MM/AA"}</span>
          </div>
        </div>

        {/* FORMULARIO */}
        <div className="payment-box mt-4">
          <h5>Datos de pago</h5>

          <input
            name="name"
            type="text"
            className="form-control mt-2"
            placeholder="Nombre y Apellido"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="number"
            type="text"
            className="form-control mt-2"
            placeholder="Número de tarjeta"
            value={form.number}
            onChange={handleChange}
          />

          <div className="row mt-2">
            <div className="col-6">
              <input
                name="exp"
                type="text"
                className="form-control"
                placeholder="MM/AA"
                value={form.exp}
                onChange={handleChange}
              />
            </div>

            <div className="col-6">
              <input
                name="cvv"
                type="text"
                className="form-control"
                placeholder="CVV"
                value={form.cvv}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="btn btn-success w-100 mt-3" onClick={handlePay}>
            Pagar ${total}
          </button>
        </div>

        {/* CONFIRMACIÓN */}
        {confirmStep && (
          <div className="confirm-box mt-4 p-3 bg-light border rounded">
            <h5>¿Confirmar compra por ${total}?</h5>

            <button className="btn btn-primary me-2" onClick={finish}>
              Sí, finalizar compra
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setConfirmStep(false)}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}




