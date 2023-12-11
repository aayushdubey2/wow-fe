<template>
    <div>
        <div v-if="showInvoicePopup"
            class="fixed text-sm inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div class="text-left bg-white p-5 shadow-md rounded-md max-w-md w-1/2">
                <div class="flex mb-3 items-center">
                    <img :src="require('@/assets/img/invoice.svg')" alt="" class="inline h-10">
                    <h2 class="text-lg font-semibold inline">Invoice Details</h2>
                </div>
                <hr class="mb-5">
                <p>Invoice ID: {{ invoice.InvoiceID }}</p>
                <p>Rental ID: {{ invoice.RentalID }}</p>
                <p>Invoice Date: {{ invoice.InvoiceDate }}</p>
                <p>Total Amount: $ {{ invoice.InvoiceAmount }}</p>
                <div v-if="paymentDetails.PaymentID" class="mt-5">
                    <div>
                        <p class="inline">Payment Status: <v-badge color="success" content="Done" inline></v-badge> </p>
                    </div>
                    <div class="flex justify-between mt-5">
                        <button @click="openPayment" class="bg-green-500 text-white px-4 py-2 mt-3 rounded-md">View payment
                            details</button>
                        <button @click="$emit('close-invoice')"
                            class="bg-gray-400 text-white px-4 py-2 mt-3 rounded-md">Cancel</button>
                    </div>
                </div>
                <div v-else class="mt-5">
                    <div>
                        <p class="inline">Payment Status: <v-badge color="error" content="Pending" inline></v-badge> </p>
                    </div>
                    <div class="flex justify-between mt-5">
                        <button @click="openPayment" class="text-white px-4 py-2 mt-3 rounded-md"
                            style="background-color: #BE3144;">Make Payment</button>
                        <button @click="$emit('close-invoice')"
                            class="bg-gray-400 text-white px-4 py-2 mt-3 rounded-md">Cancel</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            selectedPaymentMode: null,
            cardNumber: null,
            cashAmount: null,
            invoice: Object,
            paymentDetails: Object,
            showPaymentForm: false
        }
    },
    props: {
        showInvoicePopup: false,
        booking: Object
    },
    watch: {
        booking: {
            handler(newBooking, oldBooking) {
                if (newBooking.RentalStatus !== oldBooking.RentalStatus) {
                    this.getInvoiceDetails()
                }
            },
            deep: true
        }
    },
    methods: {
        makePayment() {
            console.log('Payment made with mode:', this.selectedPaymentMode);
            console.log('Card Number:', this.cardNumber);
            console.log('Cash Amount:', this.cashAmount);
        },
        handlePaymentModeChange() {
            this.cardNumber = '';
            this.cashAmount = 0;
        },
        getInvoiceDetails() {
            axios.post(`http://127.0.0.1:5000/api/invoice`, {
                'RentalID': this.booking.RentalID
            })
                .then(response => {
                    if (response.status == 201) {
                        this.invoice = response.data;
                        this.getPaymentDetails()
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                }).finally(() => {
                    this.loading = false;
                });
        },
        getPaymentDetails() {
            axios.post(`http://127.0.0.1:5000/api/getpayment`, {
                'InvoiceID': this.invoice.InvoiceID
            })
                .then(response => {
                    if (response.status == 201) {
                        this.paymentDetails = response.data;
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                })
        },
        openPayment() {
            this.$emit('open-payment', { 'id': this.invoice.InvoiceID, 'amount': this.invoice.InvoiceAmount })
            this.$emit('close-invoice')
        }
    },
    created() {
        this.getInvoiceDetails()
    }
}
</script>