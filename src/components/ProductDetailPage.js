import React, { useState, useEffect,} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
const ProductDetailPage = ({ products }) => {
  const { code } = useParams(); // Get product code from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook to navigate programmatically
  const { addToCart } = useCart();
  // Fetch product details based on the code
  useEffect(() => {
    const product = products.find((prod) => prod.code === code);
    if (product) {
      setProduct(product);
      setLoading(false); // Data loaded
    } else {
      setLoading(false); // No product found
    }
  }, [code, products]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="product-detail">
      <img
        src={product.image_url || 'https://via.placeholder.com/150'}
        className="product-image"
        alt={product.product_name}
      />
      <h1>{product.product_name}</h1>
      {product.ingredients_text && (
        <p><strong>Ingredients:</strong> {product.ingredients_text}</p>
      )}
      <p><strong>Category:</strong> {product.categories || 'N/A'}</p>
      <p><strong>Nutrition Grade:</strong> {product.nutrition_grades || 'N/A'}</p>
      <p><strong>Barcode:</strong> {product.code}</p>

      {/* Back to Home Button */}
      <button className="btn btn-add-cart" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
      <button className="btn btn-secondary" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
};

export default ProductDetailPage;
