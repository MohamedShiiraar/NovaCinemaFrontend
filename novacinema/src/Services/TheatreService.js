import axios from 'axios';

const THEATRE_API_BASE_URL = "http://localhost:8080/theatre";

class TheatreService {
  // Fetch all theatres
  getAllTheatres() {
    return axios.get(`${THEATRE_API_BASE_URL}/getAll`);
  }

  // Fetch a single theatre by ID
  getTheatreById(theatreID) {
    return axios.get(`${THEATRE_API_BASE_URL}/read${theatreID}`);
  }

  // Create a new theatre
  createTheatre(theatre) {
    return axios.post(`${THEATRE_API_BASE_URL}/create`, theatre);
  }

  // Update a theatre
  updateTheatre(theatre) {
    return axios.post(`${THEATRE_API_BASE_URL}/update`, theatre);
  }
}

export default new TheatreService();
