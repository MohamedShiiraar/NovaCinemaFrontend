import axios from "axios";

const MOVIE_API_BASE_URL = "http://localhost:8080/movie";

class MovieService {
  // Fetch all movies
  getAllMovies() {
    return axios.get(`${MOVIE_API_BASE_URL}/getAll`);
  }

  // Fetch a single movie by ID
  getMovieById(id) {
    return axios.get(`${MOVIE_API_BASE_URL}/read${id}`);
  }

  // Create a new movie
  createMovie(movie) {
    return axios.post(`${MOVIE_API_BASE_URL}/create`, movie);
  }

  // Update a movie
  updateMovie(movie) {
    return axios.post(`${MOVIE_API_BASE_URL}/update`, movie);
  }
}

export default new MovieService;