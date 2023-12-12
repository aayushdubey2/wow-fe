<template>
    <div class="h-screen">
        <NavbarComponent />
    <div class="w-1/2 mx-auto mt-20 border-2 rounded-lg p-10 profile">
        <div class="flex items-center text-left">
            <!-- Display user image in a circle -->
            <div class="h-25 w-50 rounded-full overflow-hidden">
                <img :src="userImageSource" alt="User Image" class="w-full h-full object-cover inline">
            </div>

            <!-- Display user information on the right -->
            <div class="ml-4">
                <h2 class="text-3xl font-bold">{{ user.FullName }}</h2>
                <p>Customer ID: {{ user.CustomerID }}</p>
                <p>User Type: {{ user.Type }}</p>
                <p>Phone: {{ user.Phone }}</p>
                <p>Email: {{ user.Email }}</p>
                <p>Address: {{ user.Address }}</p>
            </div>
        </div>
    
    <hr class="my-5">
    <div class="text-left">
        <div v-if="user.Type=='corporate'">
        <p>Corporation Name: {{ user.CorporationName }}</p>
        <p>Registration Number: {{ user.RegistrationNumber }}</p>
        <p>Employee ID: {{ user.EmployeeID }}</p>
      </div>

      <div v-else>
        <p>Driver License Number: {{ user.DriverLicenseNumber }}</p>
        <p>Insurance Company: {{ user.InsuranceCompanyName }}</p>
        <p>Insurance Policy Number: {{ user.InsurancePolicyNumber }}</p>
      </div>
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
            user: {}
        }
    },
    components: {
        NavbarComponent
    },
    computed: {
    userImageSource() {
      const defaultImage = require('@/assets/img/user.svg');
      return this.user && this.user.Image ? require(`@/assets/img/${this.user.Image}`) : defaultImage;
    },
  },
    methods: {
        getUserInformation() {
            axios.get(`http://127.0.0.1:5000/api/${localStorage.getItem('customerID')}`)
                .then(response => {
                    if (response.status == 201) {
                        this.user = response.data;
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                })
        }
    },
    created() {
        this.getUserInformation()
    }
};
</script>

<style scoped>
.profile{
background: #003973;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #E5E5BE, #003973);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #E5E5BE, #003973); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
color: white;

}
</style>
