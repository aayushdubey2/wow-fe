<template>
  <div class="h-screen">
    <NavbarComponent />
    <Loader :loading="loading" />
    <div v-if="!loading">
      <!-- Car image and details -->
      <div class="max-w-2xl mx-auto my-10 bg-white rounded-lg overflow-auto cardetails shadow-lg">
        <!-- Car image -->
        <img :src="require(`@/assets/img/${car.Image}`)" class="w-full h-64 object-cover">

        <!-- Car details -->
        <div class="p-4 text-sm text-right">
          <h1 class="text-2xl font-semibold mb-2">{{ car.Make + ' ' + car.Model }}</h1>
          <div class="flex justify-end">
            <p class="text-gray-600 mb-2 inline-block mr-5">Year: {{ car.Year }}</p>
            <p class="text-gray-600 mb-2 inline-block">Class: {{ car.RentalClass.Class }}</p>
          </div>

          <p class="text-gray-600 mb-2">Over Mileage Fee: ${{ car.RentalClass.OverMileageFee }}/mile</p>
          <p class="text-gray-600 mb-2">License Plate Number: {{ car.LicensePlateNumber }}</p>


          <div v-if="!showForm" class="text-center">
            <button v-ripple @click="showForm = true"
              class="px-10 rent-button py-3 text-white font-bold border bg-black mt-5 rounded-lg">Rent Now @ ${{
                car.RentalClass.DailyRate }}/day today!</button>
          </div>

          <!-- Form for user details -->
          <form v-if="showForm" @submit.prevent="rentCar" class="text-left mt-10">
            <hr class="mb-5">

            <div class="flex justify-between">
              <div class="mb-4 w-1/2 mr-5">
                <label for="pickupdate" class="block text-gray-700 text-sm font-bold mb-2">Pickup Date:</label>
                <input v-model="pickupdate" type="date" id="pickupdate" name="pickupdate"
                  class="w-full px-3 py-2 border rounded-md">
              </div>

              <div class="mb-4 w-1/2">
                <label for="dropdate" class="block text-gray-700 text-sm font-bold mb-2">Drop off Date:</label>
                <input v-model="dropdate" type="date" id="dropdate" name="dropdate"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
            </div>

            <div class="flex justify-between">
              <div class="mb-4 w-1/2 mr-5">
                <label for="pickupLocation" class="block text-gray-700 text-sm font-bold mb-2">Pickup Location:</label>
                <select v-model="pickupLocation" id="pickupLocation" name="pickupLocation"
                  class="w-full px-3 py-2 border rounded-md">
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

              <div class="mb-4 w-1/2">
                <label for="dropLocation" class="block text-gray-700 text-sm font-bold mb-2">Drop Location:</label>
                <select v-model="dropLocation" id="dropLocation" name="dropLocation"
                  class="w-full px-3 py-2 border rounded-md">
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
            </div>

            <div class="flex justify-start">
              <div class="mb-4 w-1/2 pr-5">
                <label for="unlimitedMileage" class="block text-gray-700 text-sm font-bold mb-2">Do you want unlimited
                  mileage?</label>
                  
                <select v-model="unlimitedMileage" id="dropLocation" name="unlimitedMileage"
                  class="w-1/2 block px-3 py-2 border rounded-md">
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
                <i class="text-xs text-gray-500">Pay 1.5*(Daily rate) and drive unlimited miles every day</i>
              </div>
            </div>
            <!-- Rent button -->
            <div class="flex justify-end mt-5">
              <button v-ripple type="submit" class="text-white py-2 px-10 text-center bg-gray-600 rounded-md">
                Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
import Loader from '@/components/Loader.vue'
import axios from 'axios';
export default {
  data() {
    return {
      car: null,
      pickupdate: null,
      dropdate: null,
      pickupLocation: null,
      dropLocation: null,
      showForm: false,
      carid: null,
      loading: true,
      unlimitedMileage: null
    };
  },
  components: {
    NavbarComponent,
    Loader
  },
  mounted() {
    this.getCarDetails();
  },
  methods: {
    getCarDetails() {
      this.loading = true;
      this.carid = this.$route.params.carId;
      axios.get(`http://127.0.0.1:5000/api/vehicle/${this.carid}`)
        .then(response => {
          this.car = response.data;
          console.log(this.car);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        }).finally(() => {
          this.loading = false;
        });
    },
    rentCar() {
      axios.post('http://127.0.0.1:5000/api/rental', {
        VehicleID: this.car.VIN,
        CustomerID: localStorage.getItem('customerID'),
        PickupLocation: this.pickupLocation,
        DropOffLocation: this.dropLocation,
        PickupDate: this.pickupdate,
        DropOffDate: this.dropdate,
        StartOdometer: this.car.OdometerReading,
        DailyOdometerLimit: 500,
        UnlimitedMileageOption: this.unlimitedMileage == '1' ? true : false,
        RentalStatus: 'Active'
      })
        .then(response => {
          console.log('Success:', response.data);
        })
        .catch(error => {
          console.error('Error:', error.response.data);
        }).finally(() => {
          this.clearData()
          this.$router.push('/bookings')
        });
    },
    clearData() {
      this.pickupLocation = null
      this.dropLocation = null
      this.pickupdate = null
      this.dropdate = null
    }
  }
};
</script>
  
<style scoped>
.rent-button {
  transition: transform 0.2s ease;
}

.cardetails{
  border: 1px solid black;
}

.rent-button:hover {
  transform: scale(1.04);
}
</style>
  