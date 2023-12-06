<!-- ModalForm.vue -->
<template>
    <div>
      <!-- Overlay -->
      <div v-if="isOpen" class="fixed inset-0 z-10 bg-black opacity-50"></div>
      <!-- Modal -->
      <div v-if="isOpen" class=" text-left fixed inset-0 z-20 flex items-center justify-center">
        <div class="bg-white p-8 rounded shadow-md w-1/2">
          <h2 class="text-2xl font-semibold mb-4">Login</h2>
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label for="username" class="block text-sm font-medium text-gray-600">Email</label>
              <input v-model="username" type="email" id="username" name="username" class="mt-1 p-2 w-full border rounded-md">
            </div>
            <div class="mb-4">
              <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
              <input v-model="password" type="password" id="password" name="password" class="mt-1 p-2 w-full border rounded-md">
            </div>
            <div class="flex justify-end">
              <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
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
        username: '',
        password: '',
      };
    },
    props: {
        isOpen: false
    },
    methods: {
      submitForm() {
        // Add form submission logic here
        console.log('Form submitted');
        this.$emit('close-form')
        this.$router.push({ name: 'home' });
      },
    },
  };
  </script>
  