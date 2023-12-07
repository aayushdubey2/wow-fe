<!-- ModalForm.vue -->
<template>
  <div>
    <!-- Overlay -->
    <div v-if="isOpen" class="fixed inset-0 z-10 bg-black opacity-60"></div>
    <!-- Modal -->
    <div v-if="isOpen" class="text-left fixed inset-0 z-20 flex items-center justify-center">
      <div class="bg-white p-8 rounded shadow-md w-2/5">
        <h2 class="text-2xl font-semibold mb-4">Sign In</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
            <input v-model="email" type="email" id="email" name="email"
              class="mt-1 p-2 w-full border rounded-md">
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
            <input v-model="password" type="password" id="password" name="password"
              class="mt-1 p-2 w-full border rounded-md">
          </div>
          <div class="flex justify-end">
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
      email: '',
      password: '',
    };
  },
  props: {
    isOpen: false
  },
  methods: {
    submitForm() {
      fetch(`${process.env.VUE_APP_API_BASE_URL}api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          'Email': this.email,
          'Password': this.password
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message == 'Login successful') {
            localStorage.setItem('name', data.name)
            localStorage.setItem('type', data.type)
            localStorage.setItem('customerID', data.id)
            this.$router.push('home')
          } else {
            alert('Authentication failed!')
            this.$router.push('login')
          }
        })
        .catch((error) => {
          console.log(error);
        })
      this.$emit('close-form')
    },
  },
};
</script>
  