<template>
    <div class="h-screen">
      <NavbarComponent />
    <div class="p-4 overflow-auto h-80" style="height: 87vh;">
      <div v-if="bookings.length === 0" class="text-gray-600">No bookings available.</div>
      <div v-else>
        <booking v-for="booking in bookings" :key="booking.id" :booking="booking" @update-bookings="getAllBookings"/>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  import Booking from '@/components/Booking.vue'; // Adjust the path based on your project structure
  import NavbarComponent from '@/components/NavbarComponent.vue';
  import axios from 'axios';
  export default {
    components: {
      Booking,
      NavbarComponent
    },
    data() {
      return {
        bookings: [], // Your actual list of bookings will be fetched here
      };
    },
    created() {
      this.getAllBookings()
    },
    methods: {
      getAllBookings(){
        const bookingsEndpoint = this.getType == 'Admin' ? `${process.env.VUE_APP_API_BASE_URL}api/rentals` : `${process.env.VUE_APP_API_BASE_URL}api/rentals/${this.getCustomerID}`
        axios.get(bookingsEndpoint)
        .then(response => {
          this.bookings = response.data.reverse();
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
      }
    },
    computed: {
      getType(){
        return localStorage.getItem('type')
      },
      getCustomerID(){
        return localStorage.getItem('customerID')
      }
    }
  };
  </script>
  