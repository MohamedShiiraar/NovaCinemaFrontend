import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/user";

class UserService {
  // Fetch all users
  getAllUsers() {
    return axios.get(`${USER_API_BASE_URL}/getAll`);
  }

  // Fetch a single user by ID
  getUserById(id) {
    return axios.get(`${USER_API_BASE_URL}/read/${id}`);
  }

  // Create a new user
  createUser(user) {
    return axios.post(`${USER_API_BASE_URL}/create`, user);
  }

  // Update a user
  updateUser(user) {
    console.log("Data SENDING TO BACKEND",user);
    return axios.post(`${USER_API_BASE_URL}/update`, user);
  }
}

export default new UserService;
