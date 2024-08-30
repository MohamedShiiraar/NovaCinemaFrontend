import axios from "axios";

const CINEMA_API_BASE_URL = "http://localhost:8080/cinema";

class CinemaService {
  // Fetch all cinemas
  getAllCinemas() {
    return axios.get(`${CINEMA_API_BASE_URL}/getAll`);
  }

  // Fetch a single cinema by ID
  getCinemaById(id) {
    return axios.get(`${CINEMA_API_BASE_URL}/read${id}`);
  }

  // Create a new cinema
  createCinema(cinema) {
    return axios.post(`${CINEMA_API_BASE_URL}/create`, cinema);
  }

  // Update a cinema
  updateCinema(cinema) {
    return axios.post(`${CINEMA_API_BASE_URL}/update`, cinema);
  }
}

export default new CinemaService();
