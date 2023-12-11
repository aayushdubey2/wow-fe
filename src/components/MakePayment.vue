<template>
    <div v-if="showPaymentPopup" class="fixed text-sm inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
        <div class="text-left bg-white p-5 shadow-md rounded-md max-w-md w-1/2">
            <div class="flex mb-3 items-center">
                    <img :src="require('@/assets/img/payment.svg')" alt="" class="inline h-10 mr-1">
                    <h2 class="text-lg font-semibold inline">Make Payment</h2>
                </div>
            <!-- Payment Mode Dropdown -->
            <div>
                <hr class="my-5">
                <div class="flex justify-between">
                    <div class="w-1/2 mr-5">
                        <label for="amountToBePaid" class="block text-gray-700 text-sm  mb-2">Amount to be paid</label>
                        <input type="text" v-model="amountToBePaid" class="w-full px-3 py-2 border rounded-md" disabled>
                    </div>
                    
                    <div class="w-1/2">
                        <label for="couponAvailable" class="block text-gray-700 text-sm  mb-2">Have a coupon code?</label>
                        <select v-model="couponAvailable"
                            class="w-full px-3 py-2 border rounded-md">
                            <option value='Yes'>Yes</option>
                            <option value='No'>No</option>
                        </select>
                    </div>

                </div>

                <div v-if="couponAvailable == 'Yes'" class="mt-5">
                    <label for="coupon" class="block text-gray-700 text-sm  mb-2">Enter Code</label>
                    <div class="flex justify-start items-center">
                        <input type="text" v-model="coupon.CouponCode" class="w-1/2 px-3 py-2 border rounded-md mr-5">
                        <div class="w-1/2">
                        <button v-if="showApply" @click="applyCoupon" class="border text-white rounded-lg py-1 px-2 w-1/3" style="background-color: #FF9209;">Apply</button>
                        <v-badge v-if="!showApply" color="success" content="Applied" inline></v-badge>
                        </div>
                    </div>
                    <i v-if="showExpiry" class="text-xs text-gray-700">This coupon is either expired or invalid.</i>
                </div>

                <div class="flex justify-between mt-5 items-end">
                    <div class="w-1/2 mr-5">
                    <label for="finalAmount" class="block text-gray-700 text-sm  mb-2">Final amount (After Discount)</label>
                    <input type="number" v-model="finalAmount" class="w-full px-3 py-2 border rounded-md" disabled>
                    </div>
                    <div class="w-1/2">
                        <label for="paymentMode" class="block text-gray-700 text-sm  mb-2">Select Payment
                            Mode:</label>
                        <select v-model="selectedPaymentMode" @change="handlePaymentModeChange"
                            class="w-full px-3 py-2 border rounded-md">
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="Cash">Cash</option>
                        </select>
                    </div>
                </div>

                <!-- Inputs based on Payment Mode -->
                <div v-if="selectedPaymentMode === 'Credit Card' || selectedPaymentMode === 'Debit Card'" class="mt-3">
                    <div class="flex justify-between">
                        <div class="w-1/2 mr-5">
                            <label for="cardNumber" class="block text-gray-700 text-sm  mb-2">Card Number:</label>
                            <input type="text" v-model="cardNumber" class="w-full px-3 py-2 border rounded-md">
                        </div>
                        <div class="w-1/2">
                            <label for="name" class="block text-gray-700 text-sm  mb-2">Name on card</label>
                            <input type="text" v-model="name" class="w-full px-3 py-2 border rounded-md">
                        </div>
                    </div>

                    <div class="flex justify between mt-2">
                        <div class="w-1/2 mr-5">
                            <label for="cardNumber" class="block text-gray-700 text-sm mb-2">Expiry
                                Date</label>
                            <div class="flex justify-between">
                                <input type="text" v-model="month" class="w-1/2 px-3 py-2 border rounded-md mr-5"
                                    placeholder="mm">
                                <input type="text" v-model="year" class="w-1/2 px-3 py-2 border rounded-md"
                                    placeholder="yy">
                            </div>
                        </div>

                        <div class="w-1/2">
                            <label for="cvv" class="block text-gray-700 text-sm  mb-2">CVV</label>
                            <input type="text" v-model="cvv" class="w-1/2 px-3 py-2 border rounded-md">
                        </div>
                    </div>
                </div>

                <div class="mt-5">
                    <button @click="makePayment" class="text-white bg-green-500 px-4 py-2 mt-3 rounded-md">Pay</button>
                    <button @click="$emit('close-payment')"
                        class="bg-gray-400 text-white px-4 py-2 ml-3 mt-3 rounded-md">Cancel</button>
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
            couponAvailable: null,
            selectedPaymentMode: null,
            cardNumber: null,
            amountToBePaid: null,
            name: null,
            month: null,
            year: null,
            coupon: {'CouponCode': null},
            finalAmount: null,
            showApply: true,
            showExpiry: false
        }
    },
    props: {
        showPaymentPopup: false,
        amount: null,
        invoiceID: null
    },
    watch: {
        amount(newAmount, oldAmount) {
            this.amountToBePaid = newAmount
            this.finalAmount = newAmount
        }
    },
    methods: {
        makePayment() {
            axios.post(`http://127.0.0.1:5000/api/addpayment`, {
                "InvoiceID": this.invoiceID,
                "CouponID": this.coupon?.CouponID,
                "PaymentMethod": this.selectedPaymentMode,
                "CardNumber": this.cardNumber
        })
            .then(response => {
                if(response.status == 201){
                    console.log(response)
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            }).finally(()=> {
                this.$emit('close-payment')
            })
        },
        handlePaymentModeChange() {
            this.cardNumber = '';
            this.cashAmount = 0;
        },
        applyCoupon() {
            axios.post(`http://127.0.0.1:5000/api/getcoupon`, {
            'CouponCode': this.coupon.CouponCode
        })
            .then(response => {
                if(response.status == 201){
                    this.coupon = response.data
                    if(new Date() < new Date(response.data.ValidityEndDate)){
                        this.finalAmount = this.amountToBePaid * (100 - response.data.DiscountPercentage)/100;
                        this.showApply = false
                        this.showExpiry = false
                    } else {
                        this.showExpiry= true
                    }
                }
                if(response.status == 200) {
                    this.showExpiry= true
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
        }
    }
}
</script>