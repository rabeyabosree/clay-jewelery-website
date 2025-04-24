import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addReview,
  deleteReview,
  fetchProductDetails,
} from "../../redux/reducers/productSlice";
import { SlStar } from "react-icons/sl";
import { MdDeleteOutline } from "react-icons/md";

const ReviewForm = ({ id, reviews }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { status } = useSelector((state) => state.products);

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!comment.trim()) return toast.error("Write something!");
    if (!rating) return toast.error("Select a rating!");

    const reviewData = { user: user.name, comment, rating, userId: user.id };

    dispatch(addReview({ id, ...reviewData }))
      .unwrap()
      .then(() => {
        toast.success("Thanks for your review!");
        dispatch(fetchProductDetails(id));
        setComment("");
        setRating(5);
      })
      .catch(() => toast.error("Couldn't submit review"));
  };

  const handleDelete = (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      dispatch(deleteReview({ id, reviewId }))
        .unwrap()
        .then(() => {
          toast.success("Review deleted!");
          dispatch(fetchProductDetails(id));
        })
        .catch(() => toast.error("Failed to delete review"));
    }
  };

  return (
    <div className="mt-4">
      {/* Review Form */}
      <form onSubmit={handleReviewSubmit} className="mb-4">
        <textarea
          rows="2"
          className="w-full p-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Write a review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex items-center justify-between mt-2">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((num) => (
              <SlStar
                key={num}
                onClick={() => setRating(num)}
                className={`cursor-pointer text-lg ${
                  num <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="text-sm px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {status === "loading" ? "Submitting..." : "Post"}
          </button>
        </div>
      </form>

      {/* Reviews */}
      <div className="space-y-2">
        {reviews?.length === 0 && (
          <p className="text-gray-500 text-sm">No reviews yet.</p>
        )}

        {reviews?.map((r) => (
          <div
            key={r._id}
            className="relative border p-3 rounded-md bg-gray-50 flex justify-between items-start"
          >
            <div>
              <div className="text-sm font-semibold text-gray-700">{r.user}</div>
              <div className="flex items-center text-yellow-500 text-xs mb-1">
                {[...Array(r.rating)].map((_, i) => (
                  <SlStar key={i} />
                ))}
              </div>
              <p className="text-sm text-gray-600">{r.comment}</p>
            </div>

            {r.userId === user.id && (
              <button
                onClick={() => handleDelete(r._id)}
                className="text-red-500 hover:text-red-700 text-xl ml-4"
              >
                <MdDeleteOutline />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewForm;




