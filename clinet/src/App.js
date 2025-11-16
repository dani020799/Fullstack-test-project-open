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
    useEffect(() =>{
        const fetchproducts = async () =>
        {
            setLoading(true);
            setError('');
            try
            {
                const res= await fetch (`${API_URL}/products`);
                if (!res.ok)
                {
                    throw new Error ('Falied');
                }
                const data = await res.json();
                setProducts(data);

            } catch (err) {
                setError(err.message || "Error");

            } finally {
                setLoading(false);
            }
            
        };
         fetchproducts();

    },[API_URL]);

    // Handle form input changes
    const handleInputChange = (e) => {
        // IMPLEMENT INPUT CHANGE HANDLER
        const {name ,value}  = e.target;
        setNewProduct((prev) => ({
            ...prev,
            [name]: value,

        }))
    };

    // Add a new product
    const handleAddProduct = async (e) => {
        // IMPLEMENT ADD PRODUCT FUNCTIONALITY
        e.preventDefault();
        setError('');
        if (!newProduct.name.trim() &&!newProduct.category.trim() )
        {
            setError('Name and catagory are empty.');
            return;
        }
        else if (!newProduct.name.trim())
        {
                 setError('Name is empty.');
                 return;


        }
         else if (!newProduct.category.trim())
        {
                 setError('catagory is empty.');
                 return;
        }
        setLoading(true);
        try{
            const res =await fetch (`${API_URL}/products`,
            {
                 method : 'POST',
                 headers: {
                       'Content-Type': 'application/json',
                 },
                 body:JSON.stringify(newProduct)
            });

             if (!res.ok) {
                 let message= "Failed to add product";
                 try{
                    const body= await res.json();
                    if (body.message)
                        message = body.message;

                 }catch {

                 }
                 throw new Error (message);

             }
             const createdProduct= await res.json();
             setProducts ((prev) => [...prev, createdProduct]);
             setNewProduct({ name: '', category: '' });
        }catch(err)
        {
             setError (err.message || "Error ading the pruduct");

        } finally{
            setLoading(false);
        }
          
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

            {loading && <div className="loading" >Loading...</div>}

            {/* Form to add a product */}
            <form className="product-form" onSubmit={handleAddProduct}>
                <h2>Add New Product</h2>
                <div className="form-group">
                    <label htmlFor="name">Product Name:</label>
                    <input type="text" id="name" name="name" value={newProduct.name} onChange={handleInputChange} placeholder="Enter product name" />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" value={newProduct.category}  onChange={handleInputChange} placeholder="Enter category" />
                </div>
                <button type="submit" className="btn-add">
                    Add Product
                </button>
            </form>

            {/* Products List Display */}
            <div className="products-container">
                <h2>Existing Products</h2>
                {/**IMPLEMENT LIST */}
                {products.length >0 && ! loading && (
                   <div className="products-list">
                        {products.map((product) => (
                            
                          <div className="product-card" key={product.id}>
                            <h3>{product.name}</h3>
                            <p>Category: {product.category}</p>
                            <p>Created: {formatDate(product.createdAt)}</p>
                        </div>
                           
                        ))}

                        
                    </div>


                )}
            </div>
        </div>
    );
}

export default App;
