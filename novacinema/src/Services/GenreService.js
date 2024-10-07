import axios from "axios";

const GENRE_API_BASE_URL = "http://localhost:8080/genre";

class GenreService {
  // Fetch all genres
  getAllGenres() {
    return axios.get(`${GENRE_API_BASE_URL}/getAll`);
  }

  // Fetch a single genre by ID
  getGenreById(id) {
    return axios.get(`${GENRE_API_BASE_URL}/read${id}`);
  }

  // Create a new genres
  createGenre(genre) {
    return axios.post(`${GENRE_API_BASE_URL}/create`, genre);
  }

  // Update a genre
  updateGenre(genre) {
    return axios.post(`${GENRE_API_BASE_URL}/update`, genre);
  }
}

export default new GenreService;