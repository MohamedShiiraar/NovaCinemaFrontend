import axios from "axios";

const REVIEWS_API_BASE_URL = "http://localhost:8080/review";

class ReviewsService {
  // Fetch all reviews
  getAllReviews() {
    return axios.get(`${REVIEWS_API_BASE_URL}/getAll`);
  }

  // Fetch a single review by ID
  getReviewById(id) {
    return axios.get(`${REVIEWS_API_BASE_URL}/read/${id}`);
  }

  // Create a new review
  createReview(review) {
    return axios.post(`${REVIEWS_API_BASE_URL}/create`, review);
  }

  // Update a review
  updateReview(review) {
    return axios.post(`${REVIEWS_API_BASE_URL}/update`, review);
  }

  // Delete a review
  deleteReview(id) {
    return axios.delete(`${REVIEWS_API_BASE_URL}/delete/${id}`);
  }
}

export default new ReviewsService();
