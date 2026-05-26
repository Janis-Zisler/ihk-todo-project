import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../pages/Auth.vue'
import Dashboard from '../pages/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
  ],
})

export default router
