<template>
  <div class="split-horizontal flex justify-start carousel">
    <router-link v-ripple v-if="items[0]" to="rentcar" @click="handleRouterLinkClick(items[1].id)"
      class="yield-card card hover:shadow-2xl w-1/2 py-5 px-5 flex-col">
      <div class="text-left flex items-center justify-between" style="height: 20%;">
        <div class="flex items-center">
          <img :src="icons['rentCar']" alt="" class="inline h-9 m-1">
          <span class="font-bold text-lg">{{ items[0].title }}</span>
        </div>
        <img v-if="!items[0].id" :src="icons['clockIconPurple']" alt="" class="inline mr-1 h-4">
      </div>
      <div class="items-end mt-5" style="height: 50%;">
        <span>{{ items[0].description }}</span>
        <img v-if="items[0].id" :src="icons['purpleArrowIcon']" alt="" class="inline m-2">
      </div>
    </router-link>

    <router-link v-ripple v-if="items[1]" to="bookings" @click="handleRouterLinkClick(items[1].id)"
      class="combustion-card card hover:shadow-2xl w-1/2 py-5 px-5 flex-col">
      <div class="text-left flex items-center justify-between" style="height: 20%;">
        <div class="flex items-center">
          <img :src="icons['bookings']" alt="" class="inline h-9 m-1">
          <span class="font-bold text-lg">{{ items[1].title }}</span>
        </div>
        <img v-if="!items[1].id" :src="icons['clockIconRed']" alt="" class="inline mr-1 h-4">
      </div>
      <div class="items-end mt-5" style="height: 50%;">
        <span>{{ items[1].description }}</span>
        <img v-if="items[1].id" :src="icons['redArrowIcon']" alt="" class="inline m-2">
      </div>
    </router-link>

    <router-link v-ripple v-if="items[2]" to="contactus" @click="handleRouterLinkClick(items[1].id)"
      class="blowing-card card hover:shadow-2xl w-1/2 py-5 px-5 flex-col">
      <div class="text-left flex items-center justify-between" style="height: 20%;">
        <div class="flex items-center">
          <img :src="icons['contactUs']" alt="" class="inline h-9 m-1">
          <span class="font-bold text-lg">{{ items[2].title }}</span>
        </div>
        <img v-if="!items[2].id" :src="icons['clockIconRed']" alt="" class="inline mr-1 h-4">
      </div>
      <div class="items-end mt-5" style="height: 50%;">
        <span>{{ items[2].description }}</span>
        <img v-if="items[2].id" :src="icons['aquaArrowIcon']" alt="" class="inline m-2">
      </div>
    </router-link>

  </div>
</template>

<script>
export default {
  name: 'CarouselRow',
  props: {
    items: Object
  },
  data() {
    return {
      icons: {
        rentCar: require('@/assets/img/rent-car.svg'),
        bookings: require('@/assets/img/bookings.svg'),
        contactUs: require('@/assets/img/contact-us.svg'),
        purpleArrowIcon: require('@/assets/img/purple-arrow-icon.svg'),
        redArrowIcon: require('@/assets/img/red-arrow-icon.svg'),
        aquaArrowIcon: require('@/assets/img/aqua-arrow-icon.svg'),
        clockIconPurple: require('@/assets/img/sand-clock.svg'),
        clockIconRed: require('@/assets/img/sand-clock-red.svg')
      }
    };
  },
  methods: {
    handleRouterLinkClick(subOptionId) {
      this.$emit("sub-option-selected", subOptionId);
    }
  }
};
</script>

<style scoped>
.card {
  height: auto;
  border: 1px solid #ccc;
  text-decoration: none;
  color: inherit;
  display: flex;
  border-radius: 10px;
  margin: 1rem;
  background-color: white;
  padding: 20px;
  transition: transform 0.2s ease;
  box-shadow: 10px 10px 10px #4b4747;
}

.carousel {
  font-size: 0.7rem;
}

.card:hover {
  transform: scale(1.03);
}

.yield-card {
  border: 2px solid #7823DC;
  /* background: linear-gradient(to right, #d1a3e2, #a2b9e6); */
}

.combustion-card {
  border: 2px solid #FF0101;
  /* background: linear-gradient(to right, #ffcccc, #ff9999); */
}

.blowing-card {
  border: 2px solid #5BB1BF;
  /* background: linear-gradient(to right, #a4d3e3, #5bb1bf); */
}
</style>
