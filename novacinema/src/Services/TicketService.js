import axios from "axios";

const TICKET_API_BASE_URL = "http://localhost:8080/ticket";

class TicketService {
  // Fetch all tickets
  getAllTickets() {
    return axios.get(`${TICKET_API_BASE_URL}/getAll`);
  }

  // Fetch a single ticket by ID
  getTicketById(id) {
    return axios.get(`${TICKET_API_BASE_URL}/read/${id}`);
  }

  // Create a new ticket
  createTicket(ticket) {
    return axios.post(`${TICKET_API_BASE_URL}/create`, ticket);
  }

  // Update a ticket
  updateTicket(ticket) {
    return axios.post(`${TICKET_API_BASE_URL}/update`, ticket);
  }
}

export default new TicketService();
