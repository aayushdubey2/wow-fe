<template>
    <div>
      <!-- Car image and details -->
      <div class="max-w-2xl mx-auto mt-8 bg-white rounded-lg overflow-hidden shadow-md">
        <!-- Car image -->
        <img :src="require(`@/assets/img/${car.image}`)" class="w-full h-64 object-cover">
  
        <!-- Car details -->
        <div class="p-4">
          <h1 class="text-2xl font-semibold mb-2">{{ car.name }}</h1>
          <p class="text-gray-600 mb-2">Color: {{ car.color }}</p>
          <p class="text-gray-600 mb-2">Rent: ${{ car.rent }}/day</p>
          <p class="text-gray-600 mb-2">Mileage: {{ car.mileage }} miles</p>
  
          <!-- Form for user details -->
          <form @submit.prevent="rentCar">
            <div class="mb-4">
              <label for="fullName" class="block text-gray-700 text-sm font-bold mb-2">Full Name:</label>
              <input v-model="fullName" type="text" id="fullName" name="fullName" class="w-full px-3 py-2 border rounded-md">
            </div>
  
            <div class="mb-4">
              <label for="date" class="block text-gray-700 text-sm font-bold mb-2">Date:</label>
              <input v-model="date" type="date" id="date" name="date" class="w-full px-3 py-2 border rounded-md">
            </div>
  
            <div class="mb-4">
              <label for="pickupLocation" class="block text-gray-700 text-sm font-bold mb-2">Pickup Location:</label>
              <input v-model="pickupLocation" type="text" id="pickupLocation" name="pickupLocation" class="w-full px-3 py-2 border rounded-md">
            </div>
  
            <div class="mb-4">
              <label for="dropLocation" class="block text-gray-700 text-sm font-bold mb-2">Drop Location:</label>
              <input v-model="dropLocation" type="text" id="dropLocation" name="dropLocation" class="w-full px-3 py-2 border rounded-md">
            </div>
  
            <!-- Rent button -->
            <button type="submit" class="bg-blue-500 text-white py-2 px-4 text-center hover:bg-blue-600">
              Rent
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        car: {
          id: 1,
          name: 'Car 1',
          color: 'Red',
          rent: 50,
          mileage: 10000,
          image: 'car2.jpg',
        },
        fullName: '',
        date: '',
        pickupLocation: '',
        dropLocation: '',
      };
    },
    methods: {
      rentCar() {
        // Implement your logic for renting the car with user details
        console.log('Car rented!', {
          fullName: this.fullName,
          date: this.date,
          pickupLocation: this.pickupLocation,
          dropLocation: this.dropLocation,
        });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional styling here */
  </style>
  