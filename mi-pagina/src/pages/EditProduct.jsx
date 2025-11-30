import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { fetchProductById } from "../api/products";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductById(id).then(data => setProduct(data));
  }, [id]);

  if (!product) {
    return (
      <div className="container mt-4">
        <p className="text-center text-secondary">Cargando producto...</p>
      </div>
    );
  }

  const handleSuccess = () => {
    toast.success("Producto actualizado correctamente!");
    navigate("/products");
  };

  return (
    <div className="container mt-4">

      {/* SEO */}
      <Helmet>
        <title>Editar {product.name} | Automovilismo del bueno</title>
        <meta 
          name="description"
          content={`Editar el producto ${product.name} en Automovilismo del bueno.`}
        />
      </Helmet>

      <div className="card shadow p-4">

        <h2 className="mb-3 d-flex align-items-center gap-2">
          <FaEdit className="text-warning" />
          Editar producto
        </h2>

        <ProductForm 
          product={product}
          onSuccess={handleSuccess}
        />

      </div>
    </div>
  );
}

