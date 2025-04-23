import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, addShare, toggleLove, addReview, addToCart, updateQuantity } from '../../redux/reducers/productSlice';
import ProductReviews from './ReviewForm';
import QuantityControl from './QuantityControl';
import { Heart, SquareArrowUpRight } from "lucide-react";

function SingleProduct() {
  const { id } = useParams();  // Get the product ID from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select product details from the store
  const { selectedProduct, status, error } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user || "");

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProductDetails(id));  // Dispatch an action to fetch product details by ID
    }
  }, [id, dispatch, status]);

  // Memoize the love status check to avoid unnecessary recalculations
  const isLoved = useMemo(() => selectedProduct?.lovedUsers?.includes(user?.id), [selectedProduct, user]);

  const handleLoveClick = () => {
    dispatch(toggleLove({ id: selectedProduct._id, userId: user.id }));
  };

  const handleShareClick = () => {
    const productUrl = window.location.href;

    // Check if Clipboard API is supported
    if (navigator.clipboard) {
      navigator.clipboard.writeText(productUrl)
        .then(() => {
          toast.success("Link copied to clipboard!");
          dispatch(addShare(selectedProduct._id))
            .unwrap()
            .then(() => toast.success("Share count updated!"))
            .catch((error) => toast.error(`Failed to update share count: ${error.message}`));
        })
        .catch((err) => {
          toast.error("Failed to copy the link to clipboard!");
          console.error(err);
        });
    } else {
      toast.error("Clipboard API is not supported in this browser. Please copy the URL manually.");
      console.warn("Clipboard API not supported.");
    }
  };

  const addToCartHandle = () => {
    dispatch(addToCart(selectedProduct));
    navigate("/cart");
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 0) return; // Prevent negative values
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleUpdateQuantity = (productId, change) => {
    dispatch(updateQuantity({ productId, quantity: change }));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 border my-2 relative">
      <div className="flex flex-col md:flex-row items-center justify-between border gap-4 group p-4">
        <div className="p-6 md:p-8 w-full md: flex flex-col items-center md:items-start border">
          <img src={selectedProduct?.imageUrl} alt={selectedProduct?.title} className="rounded-lg w-full h-60 object-cover" />
        </div>

        <div className="p-6 md:p-8 w-full md: flex flex-col items-center md:items-start border">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 text-center md:text-left">{selectedProduct?.title}</h1>
          <p>{selectedProduct?.category}</p>
          <p className="text-xl md:text-2xl font-semibold text-blue-700 mt-2 text-center md:text-left">{selectedProduct?.price}</p>
          <ProductReviews product={selectedProduct} id={id} />
          <p className="text-gray-600 mt-4 text-base md:text-[15px] leading-relaxed text-center md:text-left">{selectedProduct?.description}</p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full justify-center sm:justify-start">
            <QuantityControl
              productId={selectedProduct?._id}
              quantity={selectedProduct?.quantity}
              onIncrease={handleUpdateQuantity}
              onDecrease={handleUpdateQuantity}
              onChange={handleQuantityChange}
            />
            <button
              onClick={addToCartHandle}
              className="bg-gray-700 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              Add to Cart
            </button>

            <button
              onClick={handleLoveClick}
              aria-label={isLoved ? "Unfavorite" : "Favorite"}
              className={`absolute top-4 right-4 text-3xl ${isLoved ? "text-red-600" : "text-gray-400"} transition duration-300 ease-in-out`}
            >
              <Heart />
            </button>

            <button
              onClick={handleShareClick}
              className="bg-gray-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-110 w-full sm:w-auto"
            >
              <SquareArrowUpRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;



