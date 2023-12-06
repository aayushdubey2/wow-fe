<template>
    <NavbarComponent/>
    <div>
      <h1 class="text-3xl font-semibold mb-4">Available Cars</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Loop through the list of cars and display each as a card -->
        <router-link to="cardetails" v-ripple v-for="(car, index) in cars" :key="index">
          <div class="bg-white rounded-lg overflow-hidden shadow-md">
            <!-- Car image -->
            <img :src="require(`@/assets/img/${car.image}`)" alt="Car Image" class="w-full h-48 object-cover">
  
            <!-- Car details -->
            <div class="p-4">
              <h2 class="text-xl font-semibold mb-2">{{ car.name }}</h2>
              <p class="text-gray-600 mb-2">Color: {{ car.color }}</p>
              <p class="text-gray-600 mb-2">Rent: ${{ car.rent }}/day</p>
              <p class="text-gray-600">Mileage: {{ car.mileage }} miles</p>
            </div>
  
            <!-- Rent button with router-link to navigate to the details page -->
            <!-- <router-link :to="{ name: 'CarDetails', params: { id: car.id } }" class="block bg-blue-500 text-white py-2 px-4 text-center hover:bg-blue-600">
              Rent
            </router-link> -->
          </div>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
import NavbarComponent from '@/components/NavbarComponent.vue';
  export default {
  components: { NavbarComponent },
    data() {
      return {
        cars: [
          {
            id: 1,
            name: 'Car 1',
            color: 'Red',
            rent: 50,
            mileage: 10000,
            image: 'car1.jpeg',
          },
          {
            id: 2,
            name: 'Car 2',
            color: 'Blue',
            rent: 60,
            mileage: 12000,
            image: 'car2.jpg',
          },
          {
            id: 3,
            name: 'Car 1',
            color: 'Red',
            rent: 50,
            mileage: 10000,
            image: 'car1.jpeg',
          },
          {
            id:4,
            name: 'Car 2',
            color: 'Blue',
            rent: 60,
            mileage: 12000,
            image: 'car2.jpg',
          },{
            id: 5,
            name: 'Car 1',
            color: 'Red',
            rent: 50,
            mileage: 10000,
            image: 'car1.jpeg',
          },
          {
            id: 6,
            name: 'Car 2',
            color: 'Blue',
            rent: 60,
            mileage: 12000,
            image: 'car2.jpg',
          },
          {
            id: 7,
            name: 'Car 1',
            color: 'Red',
            rent: 50,
            mileage: 10000,
            image: 'car1.jpeg',
          },
          {
            id: 8,
            name: 'Car 2',
            color: 'Blue',
            rent: 60,
            mileage: 12000,
            image: 'car2.jpg',
          },
          {
            id: 9,
            name: 'Car 1',
            color: 'Red',
            rent: 50,
            mileage: 10000,
            image: 'car1.jpeg',
          }
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional styling here */
  </style>
  