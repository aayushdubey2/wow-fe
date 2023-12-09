import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AdminHomeView from "../views/AdminHomeView.vue";
import LoginView from "../views/LoginView.vue";
import CarCatalogue from '../views/CarCatalogue.vue'
import CarDetailsView from '../views/CarDetailsView.vue'
import BookingsView from '../views/BookingsView.vue'
import RentalLocationsView from '../views/RentalLocationsView.vue'
import AddCarOrClassView from '../views/AddCarOrClassView.vue'
import AddLocationView from '../views/AddLocationView.vue'

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
    path: "/adminhome",
    name: "adminhome",
    component: AdminHomeView,
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
    path: "/contactus",
    name: "contactus",
    component: RentalLocationsView,
  },
  {
    path: "/carorclass",
    name: "carorclass",
    component: AddCarOrClassView,
  },
  {
    path: "/addlocation",
    name: "addlocation",
    component: AddLocationView,
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
