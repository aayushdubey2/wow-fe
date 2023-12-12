<template>
    <div class="h-screen">
        <NavbarComponent />
        <div class="flex justify-around mx-20 text-left">
            <div class="mt-10 p-6 bg-white shadow-lg rounded-lg w-1/3 text-sm">
                <div class="flex items-center mb-6">
                    <img :src="require('@/assets/img/car.svg')" alt="" class="inline h-10 mr-2">
                    <h2 class="text-2xl font-bold inline">New Car</h2>
                </div>
                <hr class="mb-5">
                <form @submit.prevent="addVehicle" class="space-y-4">
                    <!-- Car Details Form -->
                    <div class="flex justify-between">
                        <div class="w-1/2 mr-5">
                            <label class="block text-gray-700">Make</label>
                            <input v-model="vehicleDetails.Make" class="mt-1 p-2 w-full border rounded-md" required>
                        </div>

                        <div class="w-1/2">
                            <label class="block text-gray-700">Model</label>
                            <input v-model="vehicleDetails.Model" class="mt-1 p-2 w-full border rounded-md" required>
                        </div>
                    </div>

                    <div class="flex justify-between items-end">
                        <div class="mr-5 w-1/2">
                            <label class="block text-gray-700">Year</label>
                            <input v-model="vehicleDetails.Year" type="number" class="mt-1 p-2 w-full border rounded-md"
                                required>
                        </div>

                        <div class="w-1/2">
                            <label class="block text-gray-700">Plate Number</label>
                            <input v-model="vehicleDetails.LicensePlateNumber" type="text"
                                class="mt-1 p-2 w-full border rounded-md" required>
                        </div>
                    </div>



                    <div class="flex justify-between items-end">
                        <div class="w-1/2 mr-5">
                            <label for="class" class="block text-gray-700 text-sm mb-2">Vehicle Class</label>
                            <select v-model="vehicleDetails.Class" id="class" name="class" required
                                class="w-full px-3 py-2 border rounded-md">
                                <option v-for="classOption in classes" :key="classOption" :value="classOption">
                                    {{ classOption }}
                                </option>
                            </select>
                        </div>
                        <div class="w-1/2">
                            <label class="block text-gray-700">Odometer Reading</label>
                            <input v-model="vehicleDetails.OdometerReading" type="number"
                                class="mt-1 p-2 w-full border rounded-md" required>
                        </div>
                    </div>


                    <div>
                        <label class="block text-gray-700">Car Image</label>
                        <input type="file" @change="handleFileChange" class="mt-1 p-2 w-full border rounded-md" required>
                    </div>

                    <!-- Add other vehicle details fields here -->

                    <div class="flex justify-end mt-5">
                        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Add
                            Vehicle</button>
                    </div>
                </form>
            </div>
            <div class="mt-10 p-6 bg-white text-sm shadow-lg rounded-lg w-1/3">

                <div class="flex items-center mb-6">
                    <img :src="require('@/assets/img/wheel.svg')" alt="" class="inline h-10 ">
                    <h2 class="text-2xl font-bold inline">Rental class</h2>
                </div>
                <hr class="mb-5">
                <form @submit.prevent="addClass" class="space-y-4">
                    <!-- Rental Class Form -->
                    <div>
                        <label class="block text-gray-700">Class:</label>
                        <input v-model="rentalClassDetails.Class" class="mt-1 p-2 w-full border rounded-md" required>
                    </div>

                    <div>
                        <label class="block text-gray-700">Daily Rate:</label>
                        <input v-model="rentalClassDetails.DailyRate" type="number"
                            class="mt-1 p-2 w-full border rounded-md" required>
                    </div>

                    <div>
                        <label class="block text-gray-700">Over Mileage Fee:</label>
                        <input v-model="rentalClassDetails.OverMileageFee" type="number"
                            class="mt-1 p-2 w-full border rounded-md" required>
                    </div>

                    <div class="flex justify-end mt-5">
                        <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Add
                            Class</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import NavbarComponent from '@/components/NavbarComponent.vue';

export default {
    data() {
        return {
            vehicleDetails: {
                Make: null,
                Model: null,
                Year: null,
                LicensePlateNumber: null,
                OdometerReading: null,
                Class: null,
                Image: null
            },
            rentalClassDetails: {
                Class: null,
                DailyRate: null,
                OverMileageFee: null
            },
            classes: []
        };
    },
    components: {
        NavbarComponent
    },
    methods: {
        handleFileChange(event) {
            this.vehicleDetails.Image = event.target.files[0].name;
        },
        addVehicle() {
            axios.post(`${process.env.VUE_APP_API_BASE_URL}api/addvehicle`, this.vehicleDetails)
                .then(response => {
                    alert(response.data.message)
                })
                .catch(error => {
                    console.error(error);
                }).finally(() => {
                    this.vehicleDetails = {
                        Make: null,
                        Model: null,
                        Year: null,
                        LicensePlateNumber: null,
                        OdometerReading: null,
                        Class: null,
                        Image: null
                    }
                    this.$router.push('/cars')
                });
        },
        addClass() {
            axios.post(`${process.env.VUE_APP_API_BASE_URL}api/addclass`, this.rentalClassDetails)
                .then(response => {
                    this.getAllClasses()
                    alert(response.data.message)
                })
                .catch(error => {
                    console.error(error);
                }).finally(() => {
                    this.rentalClassDetails = {
                        Class: null,
                        DailyRate: null,
                        OverMileageFee: null
                    }
                });;
        },
        getAllClasses() {
            axios.get(`${process.env.VUE_APP_API_BASE_URL}api/getallclasses`)
                .then(response => {
                    this.classes = response.data.map((carClass) => carClass.Class)
                })
                .catch(error => {
                    console.error(error);
                });
        },
    },
    created() {
        this.getAllClasses()
    }
};
</script>