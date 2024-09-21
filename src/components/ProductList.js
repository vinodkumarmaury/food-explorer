import React from 'react';
import ProductCard from './ProductCard';
import { useCart } from '../context/CartContext';
import "./component.css"
const ProductList = ({ products, onAddToCart }) => {
  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.code} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default ProductList;
