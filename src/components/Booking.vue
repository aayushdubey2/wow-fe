<template>
    <div class="max-w-md mx-auto bg-white shadow-lg overflow-hidden md:max-w-2xl">
      <img v-if="booking.Image" :src="booking.Image" alt="Car Image" class="w-full h-48 object-cover">
      <div class="px-4 py-2">
        <h2 class="text-xl font-semibold text-gray-800">{{ booking.RentalID }}</h2>
        <p class="text-sm text-gray-600">{{ booking.PickupLocation }} to {{ booking.DropOffLocation }}</p>
        <p class="text-sm text-gray-600">Pickup Date: {{ booking.PickupDate }}</p>
        <p class="text-sm text-gray-600">Drop-off Date: {{ booking.DropOffDate }}</p>
        <p class="text-sm text-gray-600">Start Odometer: {{ booking.StartOdometer }}</p>
        <p class="text-sm text-gray-600">Daily Odometer Limit: {{ booking.DailyOdometerLimit }}</p>
        <p class="text-sm text-gray-600">Unlimited Mileage: {{ booking.UnlimitedMileageOption ? 'Yes' : 'No' }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      booking: Object,
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional styles or Tailwind classes as needed */
  </style>
  