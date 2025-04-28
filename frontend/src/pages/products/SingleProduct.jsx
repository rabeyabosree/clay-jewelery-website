import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductDetails,
  addShare,
  toggleLove,
  addToCart,
  updateQuantity,
} from '../../redux/reducers/productSlice';
import QuantityControl from './QuantityControl';
import { Heart, SquareArrowUpRight } from 'lucide-react';
import ProductReviews from './ProductReviews';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share';
import { FaFacebook, FaWhatsapp, FaLinkedin, FaTwitter } from 'react-icons/fa';

function SingleProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1); // Local state for quantity

  const { selectedProduct, status, error } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    if (status === 'idle' && id) {
      dispatch(fetchProductDetails(id));
    }
  }, [id, dispatch, status]);

  const isLoved = useMemo(() => {
    return selectedProduct?.lovedUsers?.some(
      (lovedUserId) => lovedUserId?.toString() === user?._id?.toString()
    );
  }, [selectedProduct, user]);

  const handleLoveClick = () => {
    if (user?._id) {
      dispatch(toggleLove({ id: selectedProduct._id, userId: user._id }));
    } else {
      toast.error('You need to be logged in to love this product!');
    }
  };

  const handleShareClick = () => {
    setIsShareModalOpen(!isShareModalOpen);
  };

  const addToCartHandle = () => {
    dispatch(addToCart({ ...selectedProduct, quantity }));
    navigate('/cart');
  };

  // Update quantity when the user changes it
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative or zero quantities
    setQuantity(newQuantity); // Update local state
  };

  // Handle increasing or decreasing the quantity
  const handleUpdateQuantity = (productId, delta) => {
    const newQty = quantity + delta;
    if (newQty < 1) return; // Prevent negative or zero quantities
    setQuantity(newQty); // Update local state
  };

  if (status === 'loading') return <div className="text-center py-10">Loading product...</div>;
  if (status === 'failed') return <div className="text-center py-10 text-red-600">Error: {error}</div>;
  if (!selectedProduct) return <div className="text-center py-10">Product not found.</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 border my-4 rounded-lg relative">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={selectedProduct.imageUrl}
            alt={selectedProduct.title}
            className="rounded-lg w-full h-60 object-cover"
          />
        </div>

        {/* Product Info Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{selectedProduct.title}</h1>
            <p className="text-sm text-gray-600 mb-1">{selectedProduct.category}</p>
            <p className="text-xl font-semibold text-blue-700 mt-2">{selectedProduct.price}</p>

            <ProductReviews product={selectedProduct} id={id} />

            <p className="text-gray-700 mt-4 text-sm leading-relaxed">
              {selectedProduct.description}
            </p>
          </div>

          {/* Controls */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <QuantityControl
              productId={selectedProduct._id}
              quantity={quantity} // Pass the local quantity
              onIncrease={handleUpdateQuantity} // Increase function
              onDecrease={handleUpdateQuantity} // Decrease function
              onChange={handleQuantityChange} // Change quantity directly
            />

            <button
              onClick={addToCartHandle}
              className="bg-gray-800 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition-transform transform hover:scale-105 w-full sm:w-auto"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Love and Share */}
      <div className="absolute top-4 right-4 flex gap-3">
        <button
          onClick={handleLoveClick}
          aria-label={isLoved ? "Unfavorite" : "Favorite"}
          className={`text-3xl ${isLoved ? 'text-red-600' : 'text-gray-400'} transition duration-300`}
        >
          <Heart />
        </button>
        
        <button
          onClick={handleShareClick}
          className="bg-gray-500 text-white p-3 rounded-full hover:bg-green-600 transition transform hover:scale-110"
        >
          <SquareArrowUpRight />
        </button>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Share this product</h2>
            <div className="flex justify-between gap-4 text-3xl">
              <FacebookShareButton url={window.location.href}>
                <FaFacebook className="text-blue-600 hover:scale-110 transition" />
              </FacebookShareButton>
              <WhatsappShareButton url={window.location.href}>
                <FaWhatsapp className="text-green-500 hover:scale-110 transition" />
              </WhatsappShareButton>
              <LinkedinShareButton url={window.location.href}>
                <FaLinkedin className="text-blue-700 hover:scale-110 transition" />
              </LinkedinShareButton>
              <TwitterShareButton url={window.location.href}>
                <FaTwitter className="text-blue-400 hover:scale-110 transition" />
              </TwitterShareButton>
            </div>
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleProduct;









