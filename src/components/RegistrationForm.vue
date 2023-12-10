<!-- ModalForm.vue -->
<template>
  <div>
    <!-- Overlay -->
    <div v-if="isOpen" class="fixed inset-0 z-10 bg-black opacity-50"></div>
    <!-- Modal -->
    <div v-if="isOpen" class="fixed inset-0 z-20 flex items-center justify-center text-left">
      <div class="bg-white p-8 rounded shadow-md w-1/2">
        <h2 class="text-2xl font-semibold mb-4">Register</h2>
        <hr class="mb-5">
        <form @submit.prevent="submitForm">
          <div class="flex justify-between">
            <div class="mb-2 w-1/2 mr-5">
              <label for="name" class="block text-sm font-sm text-gray-600">Name</label>
              <input v-model="name" type="text" id="name" name="name" class="mt-1 p-2 w-full border rounded-md" required>
            </div>
            <div class="mb-2 w-1/2">
              <label for="phone" class="block text-sm font-sm text-gray-600">Phone Number</label>
              <input v-model="phone" type="tel" id="phone"  pattern="[0-9]{1,10}" name="phone" class="mt-1 p-2 w-full border rounded-md">
            </div>
          </div>

          <div class="flex justify-between">
            <div class="mb-2 w-1/2 mr-5">
              <label for="email" class="block text-sm font-sm text-gray-600">Email</label>
              <input v-model="email" type="email" id="email" name="email" class="mt-1 p-2 w-full border rounded-md" required>
            </div>

            <div class="mb-2 w-1/2">
              <label for="password" class="block text-sm font-sm text-gray-600">Password</label>
              <input v-model="password" type="password" id="password" name="password"
                class="mt-1 p-2 w-full border rounded-md" required>
            </div>

          </div>
          <div class="mb-2">
            <label for="address" class="block text-sm font-sm text-gray-600">Address</label>
            <input v-model="address" type="text" id="address" name="address" class="mt-1 p-2 w-full border rounded-md">
          </div>

          <div class="flex justify-between">
            <div class="w-1/2 mr-5">
              <div class="mb-2">
                <label for="userType" class="block text-sm font-sm text-gray-600">User Type</label>
                <select v-model="userType" id="userType" name="userType" class="mt-1 p-2 w-full border rounded-md" required>
                  <option value="individual">Individual</option>
                  <option value="corporate">Corporate</option>
                </select>
              </div>
            </div>
            <div class="w-1/2">
              <div v-if="userType === 'individual'" class="mb-2">
                <label for="driverLicense" class="block text-sm font-sm text-gray-600">Driver License Number</label>
                <input v-model="driverLicense" type="text" id="driverLicense" name="driverLicense"
                  class="mt-1 p-2 w-full border rounded-md">
                <label for="insuranceCompany" class="block text-sm font-sm text-gray-600">Insurance Company Name</label>
                <input v-model="insuranceCompany" type="text" id="insuranceCompany" name="insuranceCompany"
                  class="mt-1 p-2 w-full border rounded-md">
                <label for="insurancePolicy" class="block text-sm font-sm text-gray-600">Insurance Policy Number</label>
                <input v-model="insurancePolicy" type="text" id="insurancePolicy" name="insurancePolicy"
                  class="mt-1 p-2 w-full border rounded-md">
              </div>

              <div v-if="userType === 'corporate'" class="mb-2">
                <label for="corporateName" class="block text-sm font-sm text-gray-600">Corporate Name</label>
                <input v-model="corporateName" type="text" id="corporateName" name="corporateName"
                  class="mt-1 p-2 w-full border rounded-md">
                <label for="registrationNumber" class="block text-sm font-sm text-gray-600">Registration Number</label>
                <input v-model="registrationNumber" type="text" id="registrationNumber" name="registrationNumber"
                  class="mt-1 p-2 w-full border rounded-md">
                <label for="employeeId" class="block text-sm font-sm text-gray-600">Employee ID</label>
                <input v-model="employeeId" type="text" id="employeeId" name="employeeId"
                  class="mt-1 p-2 w-full border rounded-md">
              </div>
            </div>
          </div>
          <div class="flex justify-end">
            <button @click.prevent="$emit('close-registration-form')" class="px-4 py-2 mr-2 bg-gray-400 text-white rounded">Close</button>
            <button type="submit" class="px-4 py-2 k-bg-pink text-white rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      name: '',
      phone: '',
      address: '',
      email: '',
      userType: '',
      driverLicense: '',
      insuranceCompany: '',
      insurancePolicy: '',
      corporateName: '',
      registrationNumber: '',
      employeeId: '',
    };
  },
  methods: {
    submitForm() {
      fetch(`${process.env.VUE_APP_API_BASE_URL}api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          'Type': this.userType,
          'FullName': this.name, 'Address': this.address,
          'Email': this.email, 'Password': this.password, 'Phone': this.phone,
          "DriverLicenseNumber": this.driverLicense,
          "InsuranceCompanyName": this.insuranceCompany, "InsurancePolicyNumber": this.insurancePolicy,
          "CorporationName": this.corporateName, "RegistrationNumber": this.registrationNumber, "EmployeeID": this.employeeId
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.full_name && data.type) {
            localStorage.setItem('name', data.full_name)
            localStorage.setItem('type', data.type)
            localStorage.setItem('customerID', data.id)
            this.$router.push('home')
          } else {
            alert('Registration failed!')
            this.$router.push('login')
          }
        })
        .catch((error) => {
          console.log(error);
        })
      this.$emit('close-form')
      console.log('Form submitted', this.$data);
      this.$emit('close-registration-form');
    },
  },
  props: {
    isOpen: Boolean,
  },
};
</script>

<style scoped></style>
