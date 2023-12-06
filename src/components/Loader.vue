<template>
  <div v-if="loading" class="loader">
    <div class="cube-loader-grid">
      <div class="cube-loader cube1" />
      <div class="cube-loader cube2" />
      <div class="cube-loader cube3" />
      <div class="cube-loader cube4" />
      <div class="cube-loader cube5" />
      <div class="cube-loader cube6" />
      <div class="cube-loader cube7" />
      <div class="cube-loader cube8" />
      <div class="cube-loader cube9" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    loading: {
      default: false,
      type: Boolean,
    },
  },
};
</script>

<style scoped>
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  z-index: 99;
}
.cube-loader-grid {
  width: 40px;
  height: 40px;
  margin: 100px auto;
}
.cube-loader {
  width: 33%;
  height: 33%;
  background-color: #8737e1;
  float: left;
  -webkit-animation: cubeGridScaleDelay 1.3s infinite ease-in-out;
  animation: cubeGridScaleDelay 1.3s infinite ease-in-out;
}
.cube1 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.cube2 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.cube3 {
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}
.cube4 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}
.cube5 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.cube6 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.cube7 {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
.cube8 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}
.cube9 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

@keyframes cubeGridScaleDelay {
  0%,
  70%,
  100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }
  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}
</style>
