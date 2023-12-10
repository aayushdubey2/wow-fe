<template>
  <header class="bg-black text-white justify-between flex items-center py-3 pb-4 pl-5 rounded-br-lg">
    <img :src="require('@/assets/img/logo.svg')" alt="" class="inline-block mr-1" style="height: 50px;" />

    <!-- Links -->
    <div class="w-1/5 flex items-center justify-end">
      <!-- Home logo -->
      <router-link :to="getHomeRoute" class="flex items-center text-white group relative">
        <img :src="icons['homeIcon']" alt="" class="inline-block mr-1 h-3" />
        <span class="inline-block align-middle">Home</span>
        <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-800 to-purple-400"></div>
      </router-link>

      <!-- User Dropdown -->
      <div class="relative" v-click-outside="closeDropdown">
        <button @click="toggleDropdown" class="flex mx-5 items-center space-x-1 text-white focus:outline-none">
          <img class="rounded-full mr-2" style="height: 2rem; width: 2rem" :src="icons['userIcon']" />
          <div>
            <p class="text-left text-sm">{{ getName }}</p>
            <p style="font-size: 0.6rem" class="text-left">{{ getType + ' user' }}</p>
          </div>
          <img :src="icons['dropdownIcon']" alt="" class="h-1" />
        </button>

        <!-- Dropdown Content -->
        <div v-if="dropdownOpen" class="absolute right-0 mt-2 bg-white border rounded-md shadow-md">
          <router-link to="/profile" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">View Profile</router-link>
          <button @click="logout" class="w-100 block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
        </div>
      </div>
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
        homeIcon: require("@/assets/img/Home.svg"),
        userIcon:  require("@/assets/img/user.svg")
      },
    };
  },
  props: {
    name: {
      type: String,
      default: 'John Doe'
    },
    sideNavOpen: Boolean
  },
  computed: {
    getName(){
      const storedName = localStorage.getItem('name');
      return storedName.charAt(0).toUpperCase() + storedName.slice(1);
    },
    getType(){
      const type = localStorage.getItem('type')
      return type.charAt(0).toUpperCase() + type.slice(1);
    },
    getHomeRoute(){
      const type  = localStorage.getItem('type')
      if(type == 'Admin') {
        return '/adminhome'
      } else {
        return '/home'
      }
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    closeDropdown() {
      this.dropdownOpen = false;
    },
    logout() {
      localStorage.clear()
      this.$router.replace({ name: 'login' });
    }
  },
};
</script>

<style>
/* Add your styling here */
</style>
