<template>
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-semibold mb-4">My Bookings</h1>
      <div v-if="bookings.length === 0" class="text-gray-600">No bookings available.</div>
      <div v-else>
        <booking v-for="booking in bookings" :key="booking.id" :booking="booking" />
      </div>
    </div>
  </template>
  
  <script>
  import Booking from '@/components/Booking.vue'; // Adjust the path based on your project structure
  import axios from 'axios';
  export default {
    components: {
      Booking,
    },
    data() {
      return {
        bookings: [], // Your actual list of bookings will be fetched here
      };
    },
    created() {
        axios.get(`http://127.0.0.1:5000/api/rentals`)
        .then(response => {
          this.bookings = response.data;
          console.log(this.bookings);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
    },
  };
  </script>
  