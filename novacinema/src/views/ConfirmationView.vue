
<template>
  <div class="confirmation-wrapper">
    <div class="confirmation-container">
      <h2>Booking Confirmed!</h2>
      <p>Date: {{ $route.query.date }}</p>
      <p>Time: {{ $route.query.time }}</p>
      <p>Seats: {{ $route.query.seats }}</p>
      <p>Total: R{{ $route.query.price }}</p>
      <p>Your Ticket ID: {{ ticketID }}</p>
      <button @click="printTicket" class="print-button">Print Ticket</button>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    computed: {
      ticketID() {
        return Math.floor(Math.random() * 1000000000);
      },
    },
    methods: {
    printTicket() {
      window.print();
    },
  },
  };
  </script>
  
  <style scoped>

.confirmation-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  background-color: #f0f0f0;
}

.confirmation-container {
  background: #f8f9fa;
  padding: 20px;
  border: 2px dashed #dcdcdc;
  border-radius: 10px;
  max-width: 400px;
  margin: 50px auto;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  font-family: 'Courier New', Courier, monospace;
  position: relative;
  overflow: hidden;
}

.confirmation-container h2 {
  text-align: center;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
}

.confirmation-container p {
  font-size: 1.2rem;
  color: #555;
  margin: 10px 0;
}

.confirmation-container:before,
.confirmation-container:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 15px;
  background: repeating-linear-gradient(
    -45deg,
    #dcdcdc,
    #dcdcdc 10px,
    transparent 10px,
    transparent 20px
  );
}

.confirmation-container:before {
  top: -15px;
  left: 0;
}

.confirmation-container:after {
  bottom: -15px;
  left: 0;
}

.confirmation-container::before,
.confirmation-container::after {
  z-index: -1;
}

.print-button {
  display: block;
  margin: 20px auto 0;
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.print-button:hover {
  background-color: #0056b3;
}
  </style>
  