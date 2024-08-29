<template>
  <div class="booking-container">
    <h2>Book Tickets for {{ movie.title }}</h2>
    <div class="movie-info">
      <img :src="movie.poster" alt="Movie Poster" />
      <div>
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.details }}</p>
      </div>
    </div>

    <div class="showtime-selection">
      <h3>Select Showtime</h3>
      <div class="date-picker">
        <div
          v-for="date in availableDates"
          :key="date"
          :class="{ selected: selectedDate === date }"
          @click="selectDate(date)"
        >
          {{ date }}
        </div>
      </div>
      <div class="time-picker">
        <div
          v-for="time in availableTimes"
          :key="time"
          :class="{ selected: selectedTime === time }"
          @click="selectTime(time)"
        >
          {{ time }}
        </div>
      </div>
    </div>

    <div class="seat-selection" v-if="seats.length > 0">
      <h3>Select Seats</h3>
      <div class="seat-grid">
        <div
          v-for="(seat, index) in seats"
          :key="index"
          :class="{ occupied: seat.occupied, selected: seat.selected }"
          @click="selectSeat(seat)"
        >
          {{ seat.label }}
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading seats...</p>
    </div>

    <div class="payment-details">
      <h3>Enter Payment Details</h3>
      <input v-model="card.firstName" placeholder="First Name" />
      <input v-model="card.lastName" placeholder="Last Name" />
      <input v-model="card.number" placeholder="Card Number" />
      <input v-model="card.expiryMonth" placeholder="Expiry Month" />
      <input v-model="card.expiryYear" placeholder="Expiry Year" />
      <input v-model="card.cvv" placeholder="CVV" />
    </div>

    <div class="booking-summary">
      <h3>Booking Summary</h3>
      <p>Date: {{ selectedDate || 'Not selected' }}</p>
      <p>Time: {{ selectedTime || 'Not selected' }}</p>
      <p>Seats: {{ selectedSeats.join(', ') || 'None' }}</p>
      <p>Total: R{{ totalPrice.toFixed(2) }}</p>
    </div>

    <button @click="confirmBooking">Confirm Booking</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      movie: {
        title: 'Galactic Uprising',
        poster: 'poster.jpg',
        details: 'Sci-Fi, Action | 2h 15min | PG-13',
      },
      availableDates: ['Tue, May 9', 'Wed, May 10', 'Thu, May 11'],
      availableTimes: ['10:00 AM', '1:30 PM', '4:45 PM', '8:00 PM'],
      seats: [],
      selectedDate: null,
      selectedTime: null,
      card: {
        firstName: '',
        lastName: '',
        number: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
      },
    };
  },
  computed: {
    selectedSeats() {
      return this.seats.filter(seat => seat.selected).map(seat => seat.label);
    },
    totalPrice() {
      return this.selectedSeats.length * 200; // Assuming R200 per seat
    },
  },
  methods: {
    async fetchSeats() {
      try {
        // Fetch available seats from the API Axios based on the selected date and time
        const response = await axios.get('/api/seats', {
          params: {
            date: this.selectedDate,
            time: this.selectedTime,
          },
        });
        this.seats = response.data;
      } catch (error) {
        console.error('Error fetching seats:', error);
        alert('Failed to load seat availability.');
      }
    },
    selectDate(date) {
      this.selectedDate = date;
      this.selectedTime = null; // Reset time when date changes
      this.seats = []; // Clear seats when date/time changes
    },
    selectTime(time) {
      this.selectedTime = time;
      this.fetchSeats(); // Fetch seats when time is selected
    },
    selectSeat(seat) {
      if (!seat.occupied) {
        seat.selected = !seat.selected;
      }
    },
    async confirmBooking() {
      if (!this.selectedDate || !this.selectedTime || !this.selectedSeats.length) {
        alert('Please select a date, time, and seats.');
        return;
      }

      try {
        // Reserve the selected seats via the API Axios
        await axios.post('/api/seats/reserve', {
          date: this.selectedDate,
          time: this.selectedTime,
          seats: this.selectedSeats,
        });

        alert('Booking Confirmed!');
        // Redirect to confirmation page
        this.$router.push({
          path: '/confirmation',
          query: {
            date: this.selectedDate,
            time: this.selectedTime,
            seats: this.selectedSeats.join(', '),
            price: this.totalPrice.toFixed(2),
          },
        });
      } catch (error) {
        console.error('Error confirming booking:', error);
        alert('Failed to confirm booking. Please try again.');
      }
    },
  },
};
</script>

<style scoped>
nav {
    background-color: #333;
    padding: 0.5rem;
  }
  nav ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
  }
  nav ul li {
    margin: 0 1rem;
  }
  nav ul li a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
  }
  nav ul li a.active {
    color: #e50914;
  }
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
  color: #e50914;
}
.movie-info {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
.movie-info img {
  width: 150px;
  height: 225px;
  object-fit: cover;
  border-radius: 4px;
}
.showtime-selection, .seat-selection, .payment-details, .booking-summary {
  margin-bottom: 2rem;
}
.date-picker, .time-picker {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}
.date-option, .time-option {
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}
.date-option.selected, .time-option.selected {
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
.payment-details input {
  width: calc(50% - 1rem);
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: block;
}
.payment-details input + input {
  margin-left: 1rem;
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
