import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Manage from '../views/Manage.vue'
import store from '../store'

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
    meta: {
      needAuth: false
    }
  },
  {
    name: 'Login',
    path: '/login',
    component: Login,
    meta: {
      needAuth: false
    }
  },
  {
    name: 'Manage',
    path: '/admin/manage',
    component: Manage,
    meta: {
      needsAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// ROUTE META-FIELDS DECLARED ABOVE ---^ DETERMINE WEATHER A ROUTES NEEDS AUTHORIZED USE TO BE ACCESSED.
// PERFORMS SIMPLE CHECK AGAINS META FIELD AND JWT EXISTENCE TO PROVE AUTHORIZATION.FAILURE TO PROVE AUTHORITY FALLS BACK TO LOGIN PAGE.
router.beforeEach((to, from) => {
  const jwt = store.state.jwt
  if (to.meta.needsAuth && !jwt) {
    return '/login'
  }
})

export default router
