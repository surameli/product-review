import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Product {
  name: string;
  description: string;
  price: string;
  category: string;
  tags: string[];
  use: string;
  minimumQuantity: number;
  sellingPrice: string;
  addedBy: string;
  expiresAt: string | undefined;
  quantityOnHand: number;
  reservedQuantity: number;
  discount: number;
  imageUrls: string[] | undefined;
}

interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
}

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [reviewerName, setReviewerName] = useState<string>("");

  // Fetch product and reviews details
  useEffect(() => {
    const fetchProductAndReviews = async () => {
      try {
        const productResponse = await axios.get(
          `https://test-api.nova-techs.com/products/${id}`
        );
        setProduct(productResponse.data);

        const reviewsResponse = await axios.get(
          `https://test-api.nova-techs.com/reviews/${id}`
        );
        setReviews(reviewsResponse.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching product or reviews:", err);
        setError("Error fetching product or reviews. Please try again later.");
        setLoading(false);

        // If API fails, use mock data for testing
        const mockProduct = {
          name: "Sample Product",
          description: "This is a mock product for testing.",
          price: "99.99",
          category: "Electronics",
          tags: ["New", "Featured"],
          use: "For testing only",
          minimumQuantity: 1,
          sellingPrice: "89.99",
          addedBy: "Admin",
          expiresAt: "2025-01-01",
          quantityOnHand: 100,
          reservedQuantity: 5,
          discount: 10,
          imageUrls: ["https://via.placeholder.com/150"],
        };
        const mockReviews = [
          { id: "1", reviewerName: "User1", rating: 5, comment: "Great product!" },
          { id: "2", reviewerName: "User2", rating: 4, comment: "Very good." },
        ];

        setProduct(mockProduct);
        setReviews(mockReviews);
      }
    };

    fetchProductAndReviews();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://test-api.nova-techs.com/products/${id}`);
      alert("Product deleted successfully.");
      navigate("/products");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete the product.");
    }
  };

  const handleUpdate = () => {
    navigate(`/update-product/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const toggleReviewForm = () => setShowReviewForm(!showReviewForm);

  const handleSubmitReview = async () => {
    if (rating < 1 || rating > 5) {
      alert("Rating should be between 1 and 5.");
      return;
    }
    if (!comment.trim() || !reviewerName.trim()) {
      alert("Name and comment cannot be empty.");
      return;
    }

    try {
      const newReview = {
        productId: id,
        reviewerName,
        rating,
        comment,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `https://test-api.nova-techs.com/reviews`,
        newReview,
        config
      );

      if (response.status >= 200 && response.status < 300) {
        setReviews([
          ...reviews,
          { id: Date.now().toString(), reviewerName, rating, comment },
        ]);
        setRating(0);
        setComment("");
        setReviewerName("");
        setShowReviewForm(false);
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Error submitting review. Please try again later.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4 ">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
          <h2 className="text-xl font-semibold">{product?.name}</h2>
          <span className="text-lg font-bold">${product?.price}</span>
        </div>

        <div className="flex justify-center my-4">
          {product?.imageUrls && product.imageUrls.length > 0 && (
            <img
              src={product?.imageUrls[0]}
              alt={product?.name}
              className="w-2/4 rounded-lg shadow-md"
            />
          )}
        </div>

        <p className="text-gray-700 text-center mb-3 px-4">{product?.description}</p>

        <div className="grid grid-cols-2 gap-4 px-4 py-4">
          {[{ label: "Category", value: product?.category },
            { label: "Price", value: `$${product?.price}` },
            { label: "Minimum Quantity", value: product?.minimumQuantity },
            { label: "Discount", value: `${product?.discount}%` },
            { label: "Quantity on Hand", value: product?.quantityOnHand },
            { label: "Reserved Quantity", value: product?.reservedQuantity },
            { label: "Added By", value: product?.addedBy },
            { label: "Expires At", value: product?.expiresAt ? new Date(product?.expiresAt).toLocaleDateString() : "N/A" },
            { label: "Selling Price", value: product?.sellingPrice },
            { label: "Use", value: product?.use }].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm text-gray-600">
              <p className="font-medium">{label}:</p>
              <p>{value}</p>
            </div>
          ))}
        </div>

        <div className="px-4 py-4">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Delete
          </button>
        </div>

        <div className="mt-6">
          <button
            onClick={toggleReviewForm}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
          >
            {showReviewForm ? "Cancel" : "Write a Review"}
          </button>
        </div>

        {showReviewForm && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Write a Review</h3>
            <div>
              <label htmlFor="name" className="block text-sm font-medium">Your Name:</label>
              <input
                type="text"
                id="name"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                className="border p-2 w-full mb-3"
              />
            </div>
            <div>
              <label htmlFor="rating" className="block text-sm font-medium">Rating (1-5):</label>
              <input
                type="number"
                id="rating"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border p-2 w-full mb-3"
              />
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium">Your Comment:</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border p-2 w-full mb-3"
              />
            </div>
            <button
              onClick={handleSubmitReview}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
            >
              Submit Review
            </button>
          </div>
        )}

        <div className="mt-6">
          {reviews.length === 0 ? (
            <p>No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
                <div className="flex justify-between">
                  <p className="font-medium text-lg">{review.reviewerName}</p>
                  <p className="text-sm text-gray-600">{review.rating} / 5</p>
                </div>
                <p className="text-gray-700 mt-2">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
