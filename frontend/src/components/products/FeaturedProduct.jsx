import React from 'react';
import { useSelector } from 'react-redux';

function FeaturedProduct() {
  // Extract products and status from Redux state
  const { items, status, error } = useSelector((state) => state.products);

  // Filter featured products
  const featuredProducts = items.filter(product => product.featured);

  return (
    <div>
      <h1>Featured Products</h1>
      {status === "loading" && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Render the filtered featured products */}
      <div className="grid grid-cols-4 gap-4">
        {featuredProducts.length > 0 ? (
          featuredProducts.map((product) => (
            <div key={product._id} className="border p-4 rounded">
              <img src={product.imageUrl} alt={product.title} className="w-full h-32 object-cover" />
              <h3 className="font-bold">{product.title}</h3>
              <p>{product.description}</p>
              <p className="text-lg">${product.price}</p>
            </div>
          ))
        ) : (
          <p>No featured products available.</p>
        )}
      </div>
    </div>
  );
}

export default FeaturedProduct;
