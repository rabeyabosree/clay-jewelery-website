import React, { useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function TrendingProducts() {

  const navigate = useNavigate()
  const { items, status, error } = useSelector((state) => state.products);

  // Filter only popular products
  const popularProducts = items.filter(product => product.isPopular);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Trending Products</h2>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p className="text-red-500">Error: {error}</p>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {popularProducts.map(product => (
          <div
            key={product._id}
            className=" p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              onClick={()=> navigate(`/products/${product._id}`)}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{product.category}</p>
            <p className="text-blue-600 font-bold text-md mt-1">₹{product.price}</p>

            <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
              <span>❤️ {product.loveCount}</span>
              <span>🔁 {product.shareCount}</span>
              <span>⭐ {product.rating || 0}</span>
            </div>
          </div>
        ))}
      </div>

      {status === 'succeeded' && popularProducts.length === 0 && (
        <p>No trending products found.</p>
      )}
    </div>
  );
}

export default TrendingProducts;

