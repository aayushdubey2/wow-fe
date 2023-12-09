<template>
    <NavbarComponent />
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-5">
      <!-- Loop through each location -->
      <div v-for="(location, index) in locations" :key="index" class="bg-gray-300 p-4 rounded-lg shadow-md">
        <!-- Shop Image -->
        <img :src="require(`@/assets/img/${location.Image}`)" alt="Shop Image" class="w-full h-40 object-cover mb-4 rounded-md">
  
        <!-- Location Information -->
        <div>
          <!-- Full Address -->
          <div class="flex mb-2 ">
          <img :src="require('@/assets/img/location.svg')" class="inline h-5 mr-2" alt="">
          <p class="text-xl font-semibold">{{ location.FullAddress }}</p>
        </div>
          <!-- Phone Number -->
          <div class="flex">
            <img :src="require('@/assets/img/phone.svg')" class="inline h-5 mr-2" alt="">
            <p class="text-gray-700 inline">{{ location.PhoneNumber }}</p>
          </div>
          
  
          <!-- Additional Information, if needed -->
          <!-- <p class="text-gray-500">{{ location.OtherInfo }}</p> -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import axios from 'axios';
  export default {
    data() {
      return {
        locations: []
      };
    },
    components: {
        NavbarComponent
    },
    created() {
        axios.get(`http://127.0.0.1:5000/api/rentallocations`)
        .then(response => {
          this.locations = response.data;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles here if needed */
  </style>
  