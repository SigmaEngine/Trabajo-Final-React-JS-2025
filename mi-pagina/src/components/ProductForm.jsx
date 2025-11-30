import React, { useState, useEffect } from "react";
import { createProduct, updateProduct } from "../api/products";
import { toast } from "react-toastify";
import { FaSave, FaPlusCircle } from "react-icons/fa";

export default function ProductForm({ product, onSuccess }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
    }
  }, [product]);

  const validate = () => {
    if (!name.trim()) return "El nombre es obligatorio";
    if (price <= 0) return "El precio debe ser mayor a 0";
    if (description.length < 10)
      return "La descripción debe tener al menos 10 caracteres";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    const data = { name, price, description };

    try {
      if (product) {
        await updateProduct(product.id, data);
        toast.success("Producto actualizado correctamente");
      } else {
        await createProduct(data);
        toast.success("Producto creado correctamente");
      }

      onSuccess();
    } catch {
      toast.error("Hubo un error con la API");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">

      {error && <p className="text-danger">{error}</p>}

      {/* NOMBRE */}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nombre del producto</label>
        <input
          id="name"
          type="text"
          className="form-control"
          placeholder="Ej: Casco de carreras"
          aria-label="Nombre del producto"
          aria-invalid={error.includes("nombre")}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* PRECIO */}
      <div className="mb-3">
        <label htmlFor="price" className="form-label">Precio</label>
        <input
          id="price"
          type="number"
          className="form-control"
          placeholder="Ej: 1500"
          aria-label="Precio del producto"
          aria-invalid={error.includes("precio")}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      {/* DESCRIPCIÓN */}
      <div className="mb-3">
        <label htmlFor="desc" className="form-label">Descripción</label>
        <textarea
          id="desc"
          className="form-control"
          rows="4"
          placeholder="Describe el producto..."
          aria-label="Descripción del producto"
          aria-invalid={error.includes("descripción")}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* BOTÓN */}
      <button className="btn btn-primary d-flex align-items-center gap-2" type="submit">
        {product ? (
          <>
            <FaSave aria-hidden="true" /> Guardar cambios
          </>
        ) : (
          <>
            <FaPlusCircle aria-hidden="true" /> Crear producto
          </>
        )}
      </button>

    </form>
  );
}

