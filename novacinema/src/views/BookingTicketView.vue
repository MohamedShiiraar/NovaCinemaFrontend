<template>
  <div class="booking-container">
    <div class="movie-info">
      <div class="imageURL">
        <img :src="'http://localhost:8080' + movie.imageURL" alt="Movie Image" v-if="movie.imageURL" style="width: 300px; height: 300px; border: 3px solid #000; border-radius: 15px;  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);">
      </div>
      <div class="movie-details">
        <h3 style="text-align: center;font-weight: bold;">{{ movie.title }}</h3>
        <p style="text-align: center;font-weight: bold;"> {{ movie.duration }} | {{ movie.ageRestriction }}</p>
        <p style="text-align: center;font-weight: bold;text-transform: capitalize;">{{ movie.genre.name }}</p>
        <p style="text-align: center;">{{ movie.movieDescription }}</p>

      </div>
    </div>

    <div class="showtime-selection">
      <h3>Select Showtime</h3>
      <div class="date-picker">
        <div
          v-for="date in availableDates"
          :key="date"
          :class="{ 'date-option': true, selected: selectedDate === date }"
          @click="selectDate(date)"
        >
          {{ date }}
        </div>
      </div>
      <div class="time-picker">
        <div
          v-for="time in availableTimes"
          :key="time"
          :class="{ 'time-option': true, selected: selectedTime === time }"
          @click="selectTime(time)"
        >
          {{ time }}
        </div>
      </div>
    </div>

    <div class="seat-selection">
      <h3>Select Seats</h3>
      <p>Click on the seats to select them. Gray seats are already occupied.</p>
      <div class="seat-grid">
        <div
          v-for="(seat, index) in seats"
          :key="index"
          :class="{
            seat: true,
            occupied: seat.occupied,
            selected: seat.selected,
          }"
          @click="selectSeat(seat)"
        >
          {{ seat.label }}
        </div>
      </div>
    </div>

    <div class="booking-summary">
      <h3>Booking Summary</h3>
      <p style="font-weight: bold;">Date: {{ selectedDate || 'Not selected' }}</p>
      <p style="font-weight: bold;">Time: {{ selectedTime || 'Not selected' }}</p>
      <p style="font-weight: bold;">Seats: {{ selectedSeats.join(', ') || 'None' }}</p>
      <p style="font-weight: bold;">Total: R{{ totalPrice.toFixed(2) }}</p>
    </div>
    <button class="cta-button" @click="confirmBooking">Confirm Booking</button>
  </div>
</template>

<script>
import TicketService from '@/Services/TicketService';
import CinemaService from "@/Services/CinemaService"; 

async function fetchCinemaDetails(cinemaId) {
    try {
        // Use CinemaService to fetch the cinema by ID
        const response = await CinemaService.getCinemaById(cinemaId);
        return response.data; // Return the cinema details from the response
    } catch (error) {
        console.error('Error fetching cinema details:', error);
        return null; // Handle error appropriately
    }
}

export default {
  data() {
    return {
      movie: {
        title: this.$route.query.title || 'Unknown Title',
        imageURL: this.$route.query.imageURL || 'https://via.placeholder.com/200x300?text=No+Image',
        genre: this.$route.query.genre ? JSON.parse(this.$route.query.genre) : ['Unknown Genre'], 
        duration: this.$route.query.duration || 'Unknown Duration',
        ageRestriction: this.$route.query.ageRestriction || 'Unrated',
        movieDescription: this.$route.query.movieDescription || 'No Description Available', // Added default description
      },
      availableDates: ['Tue, May 9', 'Wed, May 10', 'Thu, May 11', 'Fri, May 12', 'Sat, May 13'],
      availableTimes: ['10:00 AM', '1:30 PM', '4:45 PM', '8:00 PM', '10:30 PM'],
      seats: this.generateSeats(),
      selectedDate: null,
      selectedTime: null,
    };
  },
  computed: {
    selectedSeats() {
      return this.seats.filter(seat => seat.selected).map(seat => seat.label);
    },
    totalPrice() {
      return this.selectedSeats.length * 120; // Adjust price as needed
    },
  },
  
  methods: {
    generateSeats() {
      const seats = [];
      for (let i = 0; i < 100; i++) {
        seats.push({
          label: String.fromCharCode(65 + Math.floor(i / 10)) + (i % 10 + 1),
          occupied: Math.random() < 0.2, // 20% chance of being occupied
          selected: false,
        });
      }
      return seats;
    },
    selectDate(date) {
      this.selectedDate = date;
      this.selectedTime = null; // Reset time when date is selected
    },
    selectTime(time) {
      this.selectedTime = time;
    },
    selectSeat(seat) {
      if (!seat.occupied) {
        seat.selected = !seat.selected; // Toggle seat selection
      }
    },
    async confirmBooking() {
      // Check for required selections
      if (!this.selectedDate || !this.selectedTime || !this.selectedSeats.length) {
        alert('Please select a date, time, and at least one seat before confirming your booking.');
        return;
      }

      const user = JSON.parse(localStorage.getItem('loggedInUser'));

      if (!user) {
        alert('User is not logged in. Please log in to proceed with booking.');
        return;
      }

      const selectedCinemaId = 1; // Replace with the actual selected cinema ID
      const cinema = await fetchCinemaDetails(selectedCinemaId);
      if (!cinema) {
          console.error('Cinema not found');
          return; // Handle the case when the cinema is not found
      }

      // Prepare booking details
      const bookingDetails = {
        movie: this.movie,
        showtime: this.selectedTime,
        seat: this.selectedSeats.join(', '),
        theatre: 'Theatre 1', // Change as needed
        cinema: cinema,
        ticketPrice: this.totalPrice,
        userID: { 
          id: user.userID, 
          name: user.name, 
          email: user.emailAddress 
        },
      };

      console.log(bookingDetails); // For debugging
      // Send booking details to the backend
      TicketService.createTicket(bookingDetails)
        .then(() => {
          alert(`Booking confirmed!\n\nDate: ${this.selectedDate}\nTime: ${this.selectedTime}\nSeats: ${this.selectedSeats.join(', ')}\nTotal: R${this.totalPrice.toFixed(2)}`);
          // Redirect to confirmation page with booking details
          this.$router.push({
            path: '/confirmation',
            query: {
              date: this.selectedDate,
              time: this.selectedTime,
              seats: this.selectedSeats.join(', '),
              price: this.totalPrice.toFixed(2),
            },
          });
        })
        .catch((error) => {
          console.error('There was an error adding the ticket:', error);
          alert('There was an error confirming your booking. Please try again.');
        });
    },
  },
};
</script>


<style scoped>
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
  color: #333;
}
.booking-container {
  background-color: #fff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 2rem auto;
}
h2 {
  margin-top: 0;
  color: black;
}
.movie-info {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
.movie-poster img {
  width: 150px;
  height: 225px;
  object-fit: cover;
  border-radius: 4px;
}
.showtime-selection,
.seat-selection,
.booking-summary {
  margin-bottom: 2rem;
}
.date-picker,
.time-picker {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}
.date-option,
.time-option {
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}
.date-option.selected,
.time-option.selected {
  background-color: #e50914;
  color: #fff;
  border-color: #e50914;
}
.seat-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 0.5rem;
  margin-top: 1rem;
}
.seat {
  width: 30px;
  height: 30px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.seat.selected {
  background-color: #e50914;
  color: #fff;
  border-color: #e50914;
}
.seat.occupied {
  background-color: #ccc;
  cursor: not-allowed;
}
.booking-summary {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #ccc;
}
.cta-button {
  background-color: #e50914;
  color: #fff;
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  display: inline-block;
  border: none;
  cursor: pointer;
}
.cta-button:hover {
  background-color: #ff0a16;
}
</style>
