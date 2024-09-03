import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListMovies from '@/views/ListMovies.vue'
import RegisterUserView from '@/views/RegisterUserView.vue'
import LoginUserView from '@/views/LoginUserView.vue'
import MyAccountView from '@/views/MyAccountView.vue'
import BookingTicketView from '@/views/BookingTicketView.vue'
import ConfirmationView from '@/views/ConfirmationView.vue'
import PromotionInformation from '@/views/PromotionInformation.vue'
import ListCinemaView from '@/views/ListCinemaView.vue'
import AddMovie from '@/views/AddMovie.vue'
import ReviewsView from '@/views/ReviewsView.vue'
import AdminLogin from '@/views/AdminLoginView.vue' // Corrected to reference AdminLogin.vue in Views folder
import AdminDashboard from '@/views/AdminDashboardView.vue' // Corrected to reference AdminDashboard.vue in Views folder
import ManageMovies from '@/views/ManageMoviesView.vue' // Add this if you want routes for managing movies
import ManageUsers from '@/views/ManageUserView.vue' // Add this if you want routes for managing users
import ViewReports from '@/views/ViewReports.vue' // Add this if you want routes for viewing reports

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/movies',
    name: 'movies',
    component: ListMovies
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginUserView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterUserView
  },
  {
    path: '/myaccount',
    name: 'MyAccount',
    component: MyAccountView
  },
  {
    path: '/booking',
    name: 'Booking',
    component: BookingTicketView
  },
  {
    path: '/confirmation',
    name: 'Confirmation',
    component: ConfirmationView
  },
  {
    path: '/cinema',
    name: 'Cinema',
    component: ListCinemaView
  },
  {
    path: '/promotions',
    name: 'Promotions',
    component: PromotionInformation
  },
  {
    path: '/add-movie',
    name: 'AddMovie',
    component: AddMovie
  },
  {
    path: '/reviews',
    name: 'reviews',
    component: ReviewsView
  },
  {
    path: '/admin-login',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard
  },
  {
    path: '/manage-movies',
    name: 'ManageMovies',
    component: ManageMovies
  },
  {
    path: '/manage-users',
    name: 'ManageUsers',
    component: ManageUsers
  },
  {
    path: '/view-reports',
    name: 'ViewReports',
    component: ViewReports
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
