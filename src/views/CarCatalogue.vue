<template>
  <div class="h-screen">
    <NavbarComponent class="fixed top-0 left-0 right-0 z-10 h-15" />
    <br>
    <div v-if="cars.length === 0" class="text-gray-600 mt-20">No Cars available.</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mx-5 mt-20 pb-10">
      <!-- Loop through the list of cars and display each as a card -->
      <router-link title="Click to rent the car" :to="isAdmin ? '': '/cardetails/' + car.VIN" class="car-card" v-ripple="!isAdmin" v-for="(car, index) in cars" :key="index">
        <div class="bg-white rounded-lg overflow-hidden shadow-lg border-2">
          <!-- Car image -->
          <img :src="require(`@/assets/img/${car.Image}`)" alt="Car Image" class="w-full h-48 object-cover">

          <!-- Car details -->
          <div class="p-4 text-left">
            <h2 class="text-xl font-semibold mb-2">{{ car.Make + " " + car.Model }}</h2>
            <p class="text-gray-600 mb-1">Class: {{ car.RentalClass.Class }}</p>
            <p class="text-gray-600 mb-1">Rent: ${{ car.RentalClass.DailyRate }}/day</p>
          </div>
          <div v-if="isAdmin" class="flex justify-start p-4">
            <button v-ripple @click="deleteCar(car.VIN)" class="border rounded-lg py-1 px-5 text-white bg-red">Delete car</button>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import axios from 'axios';

export default {
  components: { NavbarComponent },
  data() {
    return {
      message: "Cannot delete vehicle, related objects exist",
      cars: []  // Initialize cars as an empty array
    };
  },
  mounted() {
    this.getAllAvailableCars();
  },
  computed: {
    isAdmin() {
      return localStorage.getItem('type') === 'Admin'
    }
  },
  methods: {
    getAllAvailableCars() {
      axios.get('http://127.0.0.1:5000/api/getallvehicles')
        .then(response => {
          this.cars = response.data;
          console.log(this.cars);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    deleteCar(vin){
      axios.delete(`http://127.0.0.1:5000/api/vehicle/${vin}`)
        .then(response => {
          if(response.status == 201) {
            this.message = response.data.message
        }
      })
        .catch(error => {
          console.error('Error fetching data:', error);
        }).finally(()=>{
          alert(this.message)
          this.getAllAvailableCars();
        });
    }
  }
};
</script>

<style scoped>
.car-card {
  transition: transform 0.2s ease;
}

.car-card:hover {
  transform: scale(1.04);
}
</style>
