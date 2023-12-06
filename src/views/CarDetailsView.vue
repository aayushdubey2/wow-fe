<template>
  <NavbarComponent class="fixed top-0 left-0 right-0 z-10 h-15" />
  <div>
    <!-- Car image and details -->
    <div class="max-w-2xl mx-auto mt-20 bg-white rounded-lg overflow-hidden shadow-md">
      <!-- Car image -->
      <img :src="require(`@/assets/img/${car.image}`)" class="w-full h-64 object-cover">

      <!-- Car details -->
      <div class="p-4 text-sm text-right">
        <h1 class="text-2xl font-semibold mb-2">{{ car.name }}</h1>
        <p class="text-gray-600 mb-2">Color: {{ car.color }}</p>
        <p class="text-gray-600 mb-2">Rent: ${{ car.rent }}/day</p>
        <p class="text-gray-600 mb-2">Mileage: {{ car.mileage }} miles</p>

        <div v-if="!showForm" class="text-center">
          <button v-ripple @click="showForm = true" class="px-10 py-3 border">Rent Now!</button>
        </div>

        <!-- Form for user details -->
        <form v-if="showForm" @submit.prevent="rentCar" class="text-left mt-5">

          <div class="flex justify-between">
            <div class="mb-4 w-1/2 mr-5">
              <label for="date" class="block text-gray-700 text-sm font-bold mb-2">Pickup Date:</label>
              <input v-model="date" type="date" id="date" name="date" class="w-full px-3 py-2 border rounded-md">
            </div>

            <div class="mb-4 w-1/2">
              <label for="date" class="block text-gray-700 text-sm font-bold mb-2">Drop off Date:</label>
              <input v-model="date" type="date" id="date" name="date" class="w-full px-3 py-2 border rounded-md">
            </div>
          </div>

          <div class="mb-4">
            <label for="pickupLocation" class="block text-gray-700 text-sm font-bold mb-2">Pickup Location:</label>
            <select v-model="pickupLocation" id="pickupLocation" name="pickupLocation"
              class="w-full px-3 py-2 border rounded-md">
              <option value="" disabled>Select Pickup Location</option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Chicago">Chicago</option>
              <option value="Houston">Houston</option>
              <option value="San Francisco">San Francisco</option>
              <option value="Miami">Miami</option>
              <option value="Seattle">Seattle</option>
              <option value="Boston">Boston</option>
              <option value="Atlanta">Atlanta</option>
              <option value="Dallas">Dallas</option>
            </select>
          </div>

          <div class="mb-4">
            <label for="dropLocation" class="block text-gray-700 text-sm font-bold mb-2">Drop Location:</label>
            <select v-model="dropLocation" id="dropLocation" name="dropLocation"
              class="w-full px-3 py-2 border rounded-md">
              <option value="" disabled>Select Drop Location</option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Chicago">Chicago</option>
              <option value="Houston">Houston</option>
              <option value="San Francisco">San Francisco</option>
              <option value="Miami">Miami</option>
              <option value="Seattle">Seattle</option>
              <option value="Boston">Boston</option>
              <option value="Atlanta">Atlanta</option>
              <option value="Dallas">Dallas</option>
            </select>
          </div>


          <!-- Rent button -->
          <button v-ripple type="submit"
            class="bg-blue-500 text-white py-2 px-10 text-center hover:bg-blue-600 rounded-md">
            Book
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
  
<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
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
      showForm: ''
    };
  },
  components: {
    NavbarComponent
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
  