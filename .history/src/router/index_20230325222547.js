import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('../views/AdminPage.vue'),
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import('../components/Dashboard.vue')
        },
        {
          path: '/customer',
          name: 'Customer',
          component: () => import('../components/Customer.vue')
        },
        {
          path: '/order',
          name: 'Order',
          component: () => import('../components/Order.vue')
        },
        {
          path: '/invoice',
          name: 'Invoice',
          component: () => import('../components/Invoice.vue')
        },
        {
          path: '/order',
          name: 'Order',
          component: () => import('../components/Order.vue')
        }
      ]
    }
  ]
})

export default router
