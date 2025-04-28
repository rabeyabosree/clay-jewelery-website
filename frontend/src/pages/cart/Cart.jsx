import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/reducers/productSlice";


function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.products.items.filter(item => item.quantity > 0)); // Filters cart items

  const handleQuantityChange = (productId, quantity) => {
    if (quantity >= 1) {
      dispatch(updateQuantity({ productId, quantity }));
    }
  };

  const handleDecreaseQuantity = (productId, quantity) => {
    if (quantity > 1) {
      dispatch(updateQuantity({ productId, quantity: quantity - 1 }));
    }
  };

  const handleIncreaseQuantity = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity: quantity + 1 }));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handlePaymentProcessed = () => {
    window.location.href = "/payment";
  };

  const totalPrice = cartItems.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-lg text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          <ul className="space-y-4">
            {cartItems.map((product) => (
              <li
                key={product._id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-semibold text-lg">{product.title}</p>
                    <p className="text-gray-500">Price: ${product.price}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDecreaseQuantity(product._id, product.quantity)}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) =>
                      handleQuantityChange(product._id, parseInt(e.target.value) || 1)
                    }
                    min="1"
                    className="w-12 text-center border border-gray-300 rounded"
                  />
                  <button
                    onClick={() => handleIncreaseQuantity(product._id, product.quantity)}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(product._id)}
                    className="text-red-600 hover:text-red-800 font-semibold ml-4"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between text-lg font-semibold mt-6">
            <p>Total:</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handlePaymentProcessed}
              className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 transition duration-300"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;