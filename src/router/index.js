import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../components/Login.vue'
import DashboardAdmin from '../components/DashboardAdmin.vue'
import DetailView from '../components/Detail.vue'
import Tambah from '../components/Tambah.vue'
import Edit from '../components/Edit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboardAdmin',
      name: 'dashboard',
      component: DashboardAdmin
    },
    {
      path: '/detail',
      name: 'detail',
      component: DetailView
    },
    {
      path: '/tambah',
      name: 'tambah',
      component: Tambah
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
