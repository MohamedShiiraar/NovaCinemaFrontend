import axios from 'axios';

const SEAT_API_BASE_URL = "http://localhost:8080/seat";

class SeatService {
  // Fetch all seats
  getAllSeats() {
    return axios.get(`${SEAT_API_BASE_URL}/getAll`);
  }

  // Fetch a single seat by ID
  getSeatById(seatID) {
    return axios.get(`${SEAT_API_BASE_URL}/read${seatID}`);
  }

  // Create a new seat
  createSeat(seat) {
    return axios.post(`${SEAT_API_BASE_URL}/create`, seat);
  }

  // Update a seat
  updateSeat(seat) {
    return axios.post(`${SEAT_API_BASE_URL}/update`, seat);
  }
}

export default new SeatService();
