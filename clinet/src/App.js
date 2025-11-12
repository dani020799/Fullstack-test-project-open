import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', category: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // API base URL
    const API_URL = 'http://localhost:5000/api';

    // IMPLEMENT FETCH PRODUCTS FUNCTIONALITY

    // Handle form input changes
    const handleInputChange = (e) => {
        // IMPLEMENT INPUT CHANGE HANDLER
    };

    // Add a new product
    const handleAddProduct = async (e) => {
        // IMPLEMENT ADD PRODUCT FUNCTIONALITY
    };

    // Date formatting function
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('he-IL');
    };

    return (
        <div className="app-container">
            <h1>Product List</h1>

            {/* Display errors */}
            {error && <div className="error">{error}</div>}

            {/* Form to add a product */}
            <form className="product-form">
                <h2>Add New Product</h2>
                <div className="form-group">
                    <label htmlFor="name">Product Name:</label>
                    <input type="text" id="name" name="name" value={newProduct.name} placeholder="Enter product name" />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" value={newProduct.category} placeholder="Enter category" />
                </div>
                <button type="submit" className="btn-add">
                    Add Product
                </button>
            </form>

            {/* Products List Display */}
            <div className="products-container">
                <h2>Existing Products</h2>
                {/**IMPLEMENT LIST */}
            </div>
        </div>
    );
}

export default App;
