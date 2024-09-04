import axios from 'axios';

const PROMOTION_API_BASE_URL = "http://localhost:8080/promotion";

class PromotionService {
  // Fetch all promotions
  getAllPromotions() {
    return axios.get(`${PROMOTION_API_BASE_URL}/getAll`);
  }

  // Fetch a single promotion by ID
  getPromotionById(promotionID) {
    return axios.get(`${PROMOTION_API_BASE_URL}/read${promotionID}`);
  }

  // Create a new promotion
  createPromotion(promotion) {
    return axios.post(`${PROMOTION_API_BASE_URL}/create`, promotion);
  }

  // Update a promotion
  updatePromotion(promotion) {
    return axios.post(`${PROMOTION_API_BASE_URL}/update`, promotion, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  deletePromotion(promotionID) {
    return axios.delete(`${PROMOTION_API_BASE_URL}/delete/${promotionID}`);
  }
}

export default new PromotionService();
