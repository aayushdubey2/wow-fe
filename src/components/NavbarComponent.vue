<template>
  <header class="bg-black text-white justify-between flex items-center py-3 pb-4 pl-5 rounded-br-lg">

    <div class="text-xl font-bold">WOW</div>

    <!-- Links -->
    <div class="w-1/5 flex items-center justify-end">
      <!-- Home logo -->
      <router-link to="home" class="flex items-center text-white group relative">
        <img :src="icons['homeIcon']" alt="" class="inline-block mr-1 h-3" />
        <span class="inline-block align-middle">Home</span>
        <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-800 to-purple-400"></div>
      </router-link>
      <button @click="dropdownOpen = !dropdownOpen"
        class="flex mx-5 items-center space-x-1 text-white focus:outline-none">
        <img class="rounded-full mr-2" style="height: 2rem; width: 2rem"
          src="https://learnyzen.com/wp-content/uploads/2017/08/test1-481x385.png" />
        <div class="">
          <p class="text-left text-sm">{{ name }}</p>
          <p style="font-size: 0.6rem" class="text-left">Individual User</p>
        </div>
        <img :src="icons['dropdownIcon']" alt="" class="h-1" />
      </button>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      dropdownOpen: false,
      icons: {
        dropdownIcon: require("@/assets/img/dropdown-icon.svg"),
        homeIcon: require("@/assets/img/Home.svg")
      },
    };
  },
  props: {
    name: {
      type: String,
      default: 'John Doe'
    },
    sideNavOpen: Boolean
  }
};
</script>

<style>/* Add your styling here */</style>
