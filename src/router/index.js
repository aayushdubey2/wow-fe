import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import CarCatalogue from '../views/CarCatalogue.vue'
import CarDetailsView from '../views/CarDetailsView.vue'
import BookingsView from '../views/BookingsView.vue'

const routes = [
  {
    path: "/",
    component: LoginView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/",
    component: LoginView,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/bookings",
    name: "bookings",
    component: BookingsView,
  },
  {
    path: "/rentcar",
    name: "rentcar",
    component: CarCatalogue,
  },
  {
    path: "/cardetails/:carId",
    name: "cardetails",
    component: CarDetailsView,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
