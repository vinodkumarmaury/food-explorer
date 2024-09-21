import React, { useState } from 'react';
import "./component.css"
const SearchBar = ({ searchTerm, onSearch, barcode, onBarcodeSearch }) => {
  const [barcodeInput, setBarcodeInput] = useState(barcode); // Track barcode input

  // Handle barcode search input
  const handleBarcodeChange = (e) => {
    const newBarcode = e.target.value;
    setBarcodeInput(newBarcode);
    onBarcodeSearch(newBarcode); // Call parent function to search by barcode
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="form-control" 
        placeholder="Search by product name"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />

      <input
        type="text"
        className="form-control mt-2"
        placeholder="Search by barcode"
        value={barcodeInput}
        onChange={handleBarcodeChange}
      />
    </div>
  );
};

export default SearchBar;
