import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListMovies from '@/views/ListMovies.vue'
import RegisterUserView from '@/views/RegisterUserView.vue'
import LoginUserView from '@/views/LoginUserView.vue'
import MyAccountView from '@/views/MyAccountView.vue'

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
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
