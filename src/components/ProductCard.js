import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import "./component.css"
const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
 
  return (
    <div className="card product-card">
      <Link to={`/product/${product.code}`}>
        <img
          src={product.image_url || 'https://via.placeholder.com/150'}
          className="card-img-top"
          alt={product.product_name}
        />
      </Link>
      <Link to={`/product/${product.code}`}>
        <h5 className="card-title">{product.product_name}</h5>
      </Link>
      <button className="btn btn-add-cart" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard; 
