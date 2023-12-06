<template>
  <div class="flex items-center h-screen">
    <!-- Left half with an image -->
    <!-- <Loader :loading="loading" /> -->
    <LoginForm :isOpen="isOpen" @close-form="isOpen = false" />
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
            @click="isRegistrationFormOpen = true">register</button></p>
        <div class="w-2/3 text-justify text-xs mt-10">
          By clicking on 'Sign In', you confirm to have read the 'World on wheels
          Privacy Statement' and provide consent to use your personal
          information like Name and Email ID.
        </div>
      </div>
    </div>

    <div class="w-1/2 h-screen relative flex justify-center items-center">
      <img :src="require('@/assets/img/sso.jpg')" alt="Image" class="w-full h-screen object-cover" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Loader from '@/components/Loader.vue'
import { useStore } from "vuex";
import LoginForm from '@/components/LoginForm.vue'
import RegistrationForm from '@/components/RegistrationForm.vue'
export default {
  name: "LoginView",
  data() {
    return {
      isOpen: false,
      isRegistrationFormOpen: false,
    }
  },
  components: {
    Loader,
    LoginForm,
    RegistrationForm
  },
  methods: {
    signIn() {
      loading.value = true;
      fetch(`${process.env.VUE_APP_API_BASE_URL}api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          'email': email,
          'password': password
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.message){
            this.$router.push('home')
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          loading.value = false;
        });
    }
  }
};
</script>

<style scoped>
.privacy-statement {
  color: #a0186a;
  text-decoration: underline;
}
</style>
