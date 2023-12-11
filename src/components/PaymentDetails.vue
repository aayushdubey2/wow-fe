<template>
    <div>
      <div v-if="showPaymentDetails" class="fixed text-sm inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
        <div class="text-left bg-white p-5 shadow-md rounded-md max-w-md w-1/2">
          <div class="flex mb-3 items-center">
            <img :src="require('@/assets/img/payment.svg')" alt="" class="inline h-10">
            <h2 class="text-lg font-semibold inline">Payment Details</h2>
          </div>
          <hr class="mb-5">
          <p>Payment ID: {{ paymentDetails.PaymentID }}</p>
          <p>Invoice ID: {{ paymentDetails.InvoiceID }}</p>
          <p>Paid On: {{ paymentDetails.PaymentDate }}</p>
          <p>Coupon Applied: {{ paymentDetails.CouponID ? 'Yes' : 'No' }}</p>
          <p>Mode of Payment: {{ paymentDetails.PaymentMethod }}</p>
          <p v-if="paymentDetails.CardNumber">Card Number: {{ paymentDetails.CardNumber }}</p>
          <p>Amount Paid: $ {{ amount }}</p>
          <div class="flex justify-end mt-5">
            <button @click="$emit('close-payment-details')" class="bg-green-500 text-white px-4 py-2 mt-3 rounded-md">Close</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      showPaymentDetails: Boolean,
      paymentDetails: Object,
      amount: null
    },
    methods: {

    }
  };
  </script>
  