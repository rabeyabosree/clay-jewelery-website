import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/reducers/productSlice';
import { useNavigate } from 'react-router-dom';

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status, error } = useSelector((state) => state.products);

  // State to manage selected category
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Create an array of unique categories from products
  const categories = ['All', ...new Set(items.map(product => product.category))];

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All'
    ? items
    : items.filter(product => product.category === selectedCategory);

  return (
    <div className="flex">
      {/* Sidebar for categories */}
      <div className="w-1/4 bg-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <button
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition duration-300 ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-white'}`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Products Section */}
      <div className="w-3/4 p-6">
        <h1 className="text-3xl font-semibold mb-6">Products</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="bg-white border rounded-lg shadow-lg overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{product.title}</h2>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <p className="text-lg font-semibold mb-4">₹{product.price}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                    <button
                      onClick={() => navigate(`/products/${product._id}`)}
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-red-500">No products available</p>
          )}
        </div>

        {status === 'loading' && (
          <div className="flex justify-center items-center py-4">
            <span className="text-xl text-blue-500">Loading...</span>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center py-4">
            <span className="text-xl text-red-500">Error fetching products: {error}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;

