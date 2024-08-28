
<template>
    <div class="confirmation-container">
      <h2>Booking Confirmed!</h2>
      <p>Date: {{ $route.query.date }}</p>
      <p>Time: {{ $route.query.time }}</p>
      <p>Seats: {{ $route.query.seats }}</p>
      <p>Total: R{{ $route.query.price }}</p>
      <p>Your Ticket ID: {{ ticketID }}</p>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      ticketID() {
        return Math.floor(Math.random() * 1000000000);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  