import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListMovies from '@/views/ListMovies.vue'
import RegisterUserView from '@/views/RegisterUserView.vue'
import MyAccountView from '@/views/MyAccountView.vue'
import BookingTicketView from '@/views/BookingTicketView.vue'
import ConfirmationView from '@/views/ConfirmationView.vue'
import PromotionInformation from '@/views/PromotionInformation.vue'
import ListCinemaView from '@/views/ListCinemaView.vue'
import AddMovie from '@/views/AddMovie.vue'
import MovieReviews from '@/views/MovieReviews.vue'
import AdminDashboard from '@/views/AdminDashboardView.vue' 
import ManageUsers from '@/views/ManageUserView.vue' 
import LoginUserView from '@/views/LoginUserView.vue'


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
    path: '/movie-reviews',
    name: 'movie-reviews',
    component: MovieReviews,
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard
  },
  {
    path: '/manage-users',
    name: 'ManageUsers',
    component: ManageUsers
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
