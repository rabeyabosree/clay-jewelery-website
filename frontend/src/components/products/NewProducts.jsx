import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/reducers/productSlice';
import { useNavigate } from 'react-router-dom';


function NewProducts() {
  const dispatch = useDispatch();
  const naigate = useNavigate()
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle' || status === 'failed') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleAddToCart = (productId) => {
    naigate(`/products/${productId}`)
  };

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const newProducts = items.filter((product) => new Date(product.createdAt) >= thirtyDaysAgo);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🆕 New Products</h2>

      {newProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center transition-transform hover:scale-105"
            >
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-48 object-cover rounded-xl mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
              <p className="text-gray-500 mb-2">{product.category}</p>
              <p className="text-xl font-bold text-green-600 mb-2">${product.price}</p>
              <button
                onClick={() => handleAddToCart(product._id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 mt-auto"
              >
                Add to Cart 🛒
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No new products available</p>
      )}
    </div>
  );
}

export default NewProducts;

