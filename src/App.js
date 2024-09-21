import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import SortOptions from './components/SortOptions';
import ProductDetailPage from './components/ProductDetailPage';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [barcode, setBarcode] = useState(''); // Add state for barcode
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('name-asc');
  const [showCart, setShowCart] = useState(false);
  const [page, setPage] = useState(1); // Track current page for infinite scroll
  const [loading, setLoading] = useState(false); // Track loading state
  
  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, [page]); // Fetch more products when page changes

  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const apiUrl = `https://world.openfoodfacts.org/category/snacks.json?page=${page}`;
      const response = await axios.get(apiUrl);
      console.log('Fetched Products:', response.data.products); // Log fetched products

      const newProducts = response.data.products;
      setProducts((prevProducts) => [...prevProducts, ...newProducts]); // Append new products
      setFilteredProducts((prevProducts) => [...prevProducts, ...newProducts]); // Append filtered products
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm === '') {
      setFilteredProducts(products); // Reset to all products
    } else {
      const filtered = products.filter(product =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  // Handle search by barcode
  const handleBarcodeSearch = (barcode) => {
    setBarcode(barcode);
    if (barcode === '') {
      setFilteredProducts(products); // Reset if no barcode
    } else {
      const filtered = products.filter(product =>
        product.code.includes(barcode)
      );
      setFilteredProducts(filtered);
    }
  };

  const handleSortChange = (sortOrder) => {
    let sortedProducts = [...filteredProducts];
  
    if (sortOrder === 'name-asc') {
      // Sort by Product Name A-Z
      sortedProducts.sort((a, b) => a.product_name.localeCompare(b.product_name));
    } else if (sortOrder === 'name-desc') {
      // Sort by Product Name Z-A
      sortedProducts.sort((a, b) => b.product_name.localeCompare(a.product_name));
    } else if (sortOrder === 'nutrition-asc') {
      // Sort by Nutrition Grade Low to High
      sortedProducts.sort((a, b) => {
        return (a.nutrition_grades || '').localeCompare(b.nutrition_grades || '');
      });
    } else if (sortOrder === 'nutrition-desc') {
      // Sort by Nutrition Grade High to Low
      sortedProducts.sort((a, b) => {
        return (b.nutrition_grades || '').localeCompare(a.nutrition_grades || '');
      });
    }
  
    setFilteredProducts(sortedProducts);
    setSortOrder(sortOrder); // Ensure UI reflects the correct sorting option
  };
  

  const toggleCart = () => {
    setShowCart(!showCart); // Toggle cart visibility
  };
  const loadMoreProducts = () => {
    setPage(page + 1); // Load the next page
  };
  // Infinite scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
        if (!loading) {
          loadMoreProducts();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);


  return (
    <CartProvider>
      <Router>
        <div className="container">
          {/* Routes */}
          <Routes>
            {/* Home/Product List Route */}
            <Route
              path="/"
              element={
                <>
                  {/* Only show these on the Product List page */}
                  <SearchBar
                    searchTerm={searchTerm}
                    onSearch={handleSearch}
                    barcode={barcode}
                    onBarcodeSearch={handleBarcodeSearch}
                  />
                  <div className="filters">
                    <CategoryFilter category={category} onCategoryChange={setCategory} />
                    <SortOptions sortOrder={sortOrder} onSortChange={handleSortChange} />
                  </div>
                  <ProductList products={filteredProducts} />
                {loading && <p>Loading more products...</p>}
                </>
              }
            />

            {/* Product Detail Route */}
            <Route path="/product/:code" element={<ProductDetailPage products={products} />} />
          </Routes>

          {/* Cart components */}
          {showCart && (
            <div className="cart-overlay">
              <div className="cart-container">
                <Cart />
                <button className="btn btn-secondary" onClick={toggleCart}>Close Cart</button>
              </div>
            </div>
          )}
          <button className="btn btn-primary floating-cart" onClick={toggleCart}>
            {showCart ? 'Close Cart' : 'View Cart'}
          </button>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
