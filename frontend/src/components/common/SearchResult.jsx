import React from 'react';
import { useSelector } from 'react-redux';

function SearchResult({ query, products }) {
  const { items, status, error } = useSelector((state) => state.products);
  // Query-based filtering (case-insensitive)
  const filtered = items.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-semibold mb-4">
        Searching results for "{query}"
      </h2>

      {filtered.length === 0 && (
        <p className="text-red-500">No products found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <div key={product._id} className="bg-white border rounded-lg shadow-md overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="font-bold text-lg">₹{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResult;

