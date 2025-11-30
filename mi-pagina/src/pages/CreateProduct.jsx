import React from "react";
import ProductForm from "../components/ProductForm";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { FaPlusCircle } from "react-icons/fa";

export default function CreateProduct() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    toast.success("Producto creado correctamente!");
    navigate("/products");
  };

  return (
    <div className="container mt-4">

      {/* SEO */}
      <Helmet>
        <title>Crear Producto | Motorsport Store</title>
        <meta 
          name="description" 
          content="Agregar un nuevo producto al catálogo de Automovilismo del bueno." 
        />
      </Helmet>

      <div className="card shadow p-4">

        <h2 className="mb-3 d-flex align-items-center gap-2">
          <FaPlusCircle className="text-primary" />
          Crear producto
        </h2>

        {/* Formulario */}
        <ProductForm onSuccess={handleSuccess} />

      </div>
    </div>
  );
}

