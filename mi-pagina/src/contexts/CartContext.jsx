import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

  // ======================
  // ESTADO / LOCALSTORAGE
  // ======================
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  // ======================
  // AGREGAR PRODUCTO
  // ======================
  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      setCart((cart) =>
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((cart) => [
        ...cart,
        {
          ...product,
          quantity: 1,
          price: Number(product.price),
        },
      ]);
    }
  };


  // ======================
  // AUMENTAR CANTIDAD (+)
  // ======================
  const increaseQty = (id) => {
    setCart((cart) =>
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };


  // ======================
  // DISMINUIR CANTIDAD (–)
  // ======================
  const decreaseQty = (id) => {
    const item = cart.find((p) => p.id === id);

    if (!item) return;

    if (item.quantity === 1) {
      removeFromCart(id);
      return;
    }

    setCart((cart) =>
      cart.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity - 1 } : p
      )
    );
  };


  // ======================
  // ELIMINAR PRODUCTO
  // ======================
  const removeFromCart = (id) => {
    setCart((cart) => cart.filter((item) => item.id !== id));
  };


  // ======================
  // VACIAR COMPLETAMENTE
  // ======================
  const clearCart = () => setCart([]);


  // ======================
  // CANTIDAD TOTAL ITEMS
  // ======================
  const getItemCount = () =>
    cart.reduce((acc, item) => acc + (item.quantity || 0), 0);


  // ======================
  // TOTAL A PAGAR
  // ======================
  const getTotal = () =>
    cart.reduce(
      (acc, item) =>
        acc + Number(item.price) * (item.quantity || 1),
      0
    );


  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        getItemCount,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};



