import api from "./api";

export const fetchReviews = async (productId: string) => {
  const response = await api.get(`/reviews`, { params: { productId } });
  return response.data;
};

export const postReview = async (review: { productId: string; rating: number; comment: string }) => {
  const response = await api.post("/reviews", review);
  return response.data;
};































