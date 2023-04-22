import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/product',
      name: 'product',
      component: () => import('../components/Product.vue')
    },
    {
      path: '/customer',
      name: 'Customer',
      component: () => import('../components/Customer.vue')
    },
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/AdminPage.vue')
    }
  ]
})

export default router
