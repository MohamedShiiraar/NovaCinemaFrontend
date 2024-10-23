import axios from "axios";

const MOVIE_API_BASE_URL = "http://localhost:8080/movie";

class MovieService {
  // Fetch all movies
  getAllMovies() {
    return axios.get(`${MOVIE_API_BASE_URL}/getAll`);
  }

  // Fetch a single movie by ID
  getMovieById(id) {
    return axios.get(`${MOVIE_API_BASE_URL}/read/${id}`);
  }

  // Create a new movie
  createMovie(formData) {
    return axios.post(`${MOVIE_API_BASE_URL}/create`, formData,{
      headers:{
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // Update a movie
  updateMovie(formData) {
    return axios.post(`${MOVIE_API_BASE_URL}/update`, formData,{
      headers:{
        'Content-Type':'multipart/form-data',
      },
    });
  }
}

export default new MovieService;