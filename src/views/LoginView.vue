<template>
  <div class="flex items-center h-screen">
    <!-- Left half with an image -->
    <!-- <Loader :loading="loading" /> -->
    <LoginForm :isOpen="isOpen" :isAdminLogin="isAdminLogin" @close-form="isOpen = false" />
    <RegistrationForm :isOpen="isRegistrationFormOpen" @close-registration-form="isRegistrationFormOpen = false" />
    <div class="w-1/2 h-screen relative flex justify-center items-center">
      <div class="flex flex-col items-center">
        <h2 class="font-bold text-3xl">World on wheels!</h2>
        <p class="text-md text-gray-500 my-5">
          Welcome back! Please Sign in to your account.
        </p>
        <button v-ripple @click="isOpen = true" class="k-bg-pink text-white py-3 rounded-lg mt-5"
          style="padding-left: 180px; padding-right: 180px">
          Sign In
        </button>
        <p class="mt-3 text-xs">Don't have an account? <button class="k-text-pink"
            @click="isRegistrationFormOpen = true">Register</button></p>
        <p class="mt-3 text-xs">Are you an admin? <button class="k-text-pink" @click="isAdminLogin=true; isOpen = true">Login
            here</button></p>
        <div class="w-2/3 text-justify text-xs mt-10">
          By clicking on 'Sign In', you confirm to have read the 'World on wheels
          Privacy Statement' and provide consent to use your personal
          information like Name and Email ID.
        </div>
      </div>
    </div>

    <div class="w-1/2 h-screen relative">
    <img :src="require('@/assets/img/rental.jpg')" alt="Image" class="w-full h-screen object-cover" />
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="text-white text-center">
        <h1 class="text-5xl font-bold mb-4">WOW</h1>
        <p class="text-xl font-bold">Your Journey, Your Car, Your Way</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Loader from '@/components/Loader.vue'
import LoginForm from '@/components/LoginForm.vue'
import RegistrationForm from '@/components/RegistrationForm.vue'
export default {
  name: "LoginView",
  data() {
    return {
      isOpen: false,
      isAdminLogin: false,
      isRegistrationFormOpen: false,
    }
  },
  components: {
    Loader,
    LoginForm,
    RegistrationForm
  }
};
</script>

<style scoped>
.privacy-statement {
  color: #a0186a;
  text-decoration: underline;
}
</style>
