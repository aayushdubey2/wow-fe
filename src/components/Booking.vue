<template>
  <div class="max-w-md mx-auto bg-white border-2 shadow-lg overflow-hidden md:max-w-2xl  p-5 m-5 ">
    <div class="flex justify-between">
      <img :src="require(`@/assets/img/${car.Image}`)" class="w-50 h-48 object-cover">
      <div class="px-4 text-right">
        <v-badge v-if="booking.RentalStatus === 'Active'" color="success" content="Active" inline></v-badge>
        <v-badge v-if="booking.RentalStatus === 'Closed'" color="error" content="Closed" inline></v-badge>
        <h2 class="text-md font-semibold text-gray-800 mt-3">Booking ID: {{ booking.RentalID }}</h2>
        <p class="text-sm text-gray-600">{{ booking.PickupLocation }} to {{ booking.DropOffLocation }}</p>
        <p class="text-sm text-gray-600">Pickup Date: {{ booking.PickupDate }}</p>
        <p class="text-sm text-gray-600">Drop-off Date: {{ booking.DropOffDate }}</p>
        <p class="text-sm text-gray-600">Start Odometer: {{ booking.StartOdometer }}</p>
        <p v-if="booking.RentalStatus === 'Closed'" class="text-sm text-gray-600">End Odometer: {{ booking.EndOdometer }}
        </p>
        <p class="text-sm text-gray-600">Daily Odometer Limit: {{ booking.DailyOdometerLimit }}</p>
        <p class="text-sm text-gray-600">Unlimited Mileage: {{ booking.UnlimitedMileageOption ? 'Yes' : 'No' }}</p>
      </div>
    </div>
    <div class="flex mt-2"><button v-ripple v-if="booking.RentalStatus === 'Closed'" @click="openInvoicePopup" class="px-5 py-1 rounded-lg" style="background-color: #F0ECE5;">View Invoice</button></div>
    <Invoice :showInvoicePopup="showInvoicePopup" @close-invoice="closeInvoicePopup" :booking="booking"
      @open-payment="openPaymentPopup" />
    <MakePayment :showPaymentPopup="showPaymentPopup" @close-payment="closePaymentPopup" :amount="amount"
      :invoiceID="invoiceID" />
    <div v-if="isAdmin">
      <div class="flex">
        <button v-if="booking.RentalStatus === 'Active' && !showForm" @click="showForm = true"
          class="px-2 py-1 change-status text-white font-semibold border bg-gray-700 mt-5 rounded-lg">Close
          Booking</button>
      </div>
      <form v-if="showForm" @submit.prevent="closeBooking(booking)" class="text-left mt-10">
        <hr class="mb-5">
        <div class="mb-4 mr-5 w-1/2">
          <label for="endOdometerReading" class="block text-gray-700 text-sm font-bold mb-2">End Odometer Reading</label>
          <input type="number" class="w-full px-3 py-2 border rounded-md" v-model="endOdometerReading"
            id="endOdometerReading" name="endOdometerReading">
        </div>
        <div class="flex justify-start mt-5">
          <button v-ripple type="submit" class="text-white py-2 px-10 text-center bg-gray-600 rounded-md">
            Confirm
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
  
<script>
import Invoice from '@/components/Invoice.vue'
import MakePayment from './MakePayment.vue'
import axios from 'axios';
export default {
  props: {
    booking: Object,
  },
  data() {
    return {
      invoiceID: null,
      car: {'Image': 'car1.jpeg'},
      amount: null,
      showForm: false,
      showInvoicePopup: false,
      showPaymentPopup: false,
      endOdometerReading: null
    }
  },
  components: {
    MakePayment, Invoice 
  },
  methods: {
    closeBooking(booking) {
      axios.put(`http://127.0.0.1:5000/api/rental/${booking.RentalID}`, {
        'EndOdometer': this.endOdometerReading,
        'RentalStatus': 'Closed'
      })
        .then(response => {
          if(response.status==200){
            this.updateVehicleOdometer(this.endOdometerReading, booking.VehicleID)
          }     
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        }).finally(() => {
          this.showForm = false
        });
    },
    updateVehicleOdometer(odometerRating, vehicleID) {
      console.log('dubey')
      console.log(vehicleID)
      axios.put(`http://127.0.0.1:5000/api/vehicle/${vehicleID}`, {
        'OdometerReading': odometerRating
      })
        .then(response => {
          console.log(response)
          console.log('dubey1')
          console.log(response.data);
          console.log('dubey2')
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        }).finally(()=> {
          this.$emit('update-bookings')
        })
    },
    openInvoicePopup() {
      this.showInvoicePopup = true;
    },
    closeInvoicePopup() {
      this.showInvoicePopup = false;
    },
    closePaymentPopup() {
      this.showPaymentPopup = false;
      this.$emit('update-bookings')
    },
    openPaymentPopup(obj) {
      this.showPaymentPopup = true;
      this.amount = obj.amount
      this.invoiceID = obj.id
    },
    getCarDetails() {
      axios.get(`http://127.0.0.1:5000/api/vehicle/${this.booking.VehicleID}`)
        .then(response => {
          this.car = response.data;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
    },
  },
  created() {
    this.getCarDetails()
  },
  computed: {
    isAdmin() {
      return localStorage.getItem('type') === 'Admin'
    }
  }
};
</script>
  
<style scoped>
.change-status {
  transition: transform 0.2s ease;
  background-color: #88AB8E;
}

.change-status:hover {
  transform: scale(1.04);
}
</style>
  