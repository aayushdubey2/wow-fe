<template>
    <div class="h-screen">
        <NavbarComponent />
        <div class="mt-10 text-left mx-auto p-6 bg-white text-sm shadow-lg rounded-lg w-1/3">

            <h2 class="text-2xl font-bold my-6">Location</h2>
            <form @submit.prevent="addLocation" class="space-y-4">
                <!-- Rental Class Form -->
                <div>
                    <label class="block text-gray-700">Full Address</label>
                    <input v-model="locationDetails.FullAddress" class="mt-1 p-2 w-full border rounded-md" required>
                </div>

                <div>
                    <label class="block text-gray-700">Phone Number</label>
                    <input v-model="locationDetails.PhoneNumber" type="text" class="mt-1 p-2 w-full border rounded-md"
                        required>
                </div>

                <div>
                    <label class="block text-gray-700">Location Image</label>
                    <input type="file" @change="handleFileChange" class="mt-1 p-2 w-full border rounded-md" required>
                </div>

                <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Add
                    Location</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import NavbarComponent from '@/components/NavbarComponent.vue';

export default {
    data() {
        return {
            locationDetails: {
                FullAddress: null,
                PhoneNumber: null,
                Image: null
            },
        };
    },
    components: {
        NavbarComponent
    },
    methods: {
        handleFileChange(event) {
            this.locationDetails.Image = event.target.files[0].name;
        },
        addLocation() {
            axios.post(`${process.env.VUE_APP_API_BASE_URL}api/addLocation`, this.locationDetails)
                .then(response => {
                    console.log(response.data.message);
                })
                .catch(error => {
                    console.error(error);
                });
        },
    },
};
</script>

<style>
/* Add any additional styling here if needed */
</style>
