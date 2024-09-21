import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryFilter = ({ category, onCategoryChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://world.openfoodfacts.org/categories.json');
      setCategories(response.data.tags);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <select className="form-select category-select" value={category} onChange={(e) => onCategoryChange(e.target.value)}>
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
 