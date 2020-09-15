import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Signin from '../views/Signin.vue'
import WelcomePage from '../components/WelcomePage.vue';

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Welcome',
    component: WelcomePage
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router