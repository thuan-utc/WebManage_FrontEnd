import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Adminpage.vue')
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('../components/Product.vue')
    }
  ]
})

export default router
