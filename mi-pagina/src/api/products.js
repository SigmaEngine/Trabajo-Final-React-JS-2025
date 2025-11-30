// URL base de MockAPI
const BASE = 'https://691ce3e0d58e64bf0d344cf0.mockapi.io/products';

// ✅ Obtener todos los productos
export async function fetchProducts() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error('Error al traer productos');
  return res.json();
}

// ✅ Obtener un producto por ID
export async function fetchProductById(id) {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error('Error al traer producto');
  return res.json();
}

// ✅ Crear producto (POST)
export async function createProduct(data) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
}

// ✅ Actualizar producto (PUT)
export async function updateProduct(id, data) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al actualizar producto");
  return res.json();
}

// ✅ Eliminar producto (DELETE)
export async function deleteProduct(id) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error al eliminar producto");
  return res.json();
}


