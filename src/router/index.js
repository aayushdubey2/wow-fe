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
import ProfileView from '../views/ProfileView.vue'

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
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/adminhome",
    name: "adminhome",
    component: AdminHomeView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/bookings",
    name: "bookings",
    component: BookingsView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/rentcar",
    name: "rentcar",
    component: CarCatalogue,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/cars",
    name: "cars",
    component: CarCatalogue,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/contactus",
    name: "contactus",
    component: RentalLocationsView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/carorclass",
    name: "carorclass",
    component: AddCarOrClassView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/addlocation",
    name: "addlocation",
    component: AddLocationView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/cardetails/:carId",
    name: "cardetails",
    component: CarDetailsView,
    meta: {
      requiresAuth: true,
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const customerID = localStorage.getItem("name");
    
    if (!customerID) {
      // If CustomerID is not found in local storage, redirect to login page
      next({ name: "login" });
      alert("Please log in to access this page.");
    } else {
      // Continue with the navigation
      next();
    }
  } else {
    // For routes that don't require authentication, proceed with the navigation
    next();
  }
});


export default router;
