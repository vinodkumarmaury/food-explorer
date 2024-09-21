import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="cart-fullscreen">
      <h4>Your Cart</h4>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul className="list-group">
          {cart.map((product) => (
            <li key={product.code} className="list-group-item d-flex justify-content-between align-items-center">
              <div className="cart-product-details">
                <img src={product.image_url || 'https://via.placeholder.com/150'} alt={product.product_name} className="cart-product-image"/>
                <div className="cart-product-info">
                  <h5>{product.product_name}</h5>
                  <p>Category: {product.categories || 'N/A'}</p>
                  <p>Ingredients: {product.ingredients_text || 'N/A'}</p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(product, product.quantity - 1)}>-</button>
                <span className="mx-2">{product.quantity}</span>
                <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(product, product.quantity + 1)}>+</button>
                <button className="btn btn-danger btn-sm ms-3" onClick={() => removeFromCart(product.code)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
