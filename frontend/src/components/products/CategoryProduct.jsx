import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CategoryProduct() {
  const { categoryName } = useParams();
  const { items } = useSelector((state) => state.products);

  const filteredProducts = items.filter((item) => item.category === categoryName);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Category: {categoryName}</h2>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
            >
              <img src={product.imageUrl} alt={product.title} className="w-full h-48 object-cover rounded" />
              <h3 className="mt-2 font-semibold">{product.title}</h3>
              <p className="text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
}

export default CategoryProduct;
