import React from 'react';

const SortOptions = ({ sortOrder, onSortChange }) => {
  return (
    <div className="sort-options">
      <label>Sort by:</label>
      <select value={sortOrder} onChange={(e) => onSortChange(e.target.value)}>
        {/* Sort by Product Name */}
        <option value="name-asc">Product Name (A-Z)</option>
        <option value="name-desc">Product Name (Z-A)</option>
        {/* Sort by Nutrition Grade */}
        <option value="nutrition-asc">Nutrition Grade (Low to High)</option>
        <option value="nutrition-desc">Nutrition Grade (High to Low)</option>
      </select>
    </div>
  );
};

export default SortOptions;
