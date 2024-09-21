import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.code === product.code);
    if (existingProduct) {
      setCart(cart.map((item) =>
        item.code === product.code ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productCode) => {
    setCart(cart.filter(product => product.code !== productCode));
  };

  const updateQuantity = (product, quantity) => {
    if (quantity <= 0) {
      removeFromCart(product.code);
    } else {
      setCart(cart.map(item =>
        item.code === product.code ? { ...item, quantity } : item
      ));
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
