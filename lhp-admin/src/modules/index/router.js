import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/page/layout'

Vue.use(Router)

let routes = [
  {
    path: '',
    component: Layout, 
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/page/home')
      }, {
        path: '/403',
        name: '403',
        component: () => import('@/page/403')
      }
    ]
  }
]

const router = new Router({
  routes: routes
})

export let asyncRoutes = [
  {
    path: '',
    component: Layout, 
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/page/login')
      }, {
        path: '*',
        name: '404',
        component: () => import('@/page/404')
      }
    ]
  }
]

export default router
