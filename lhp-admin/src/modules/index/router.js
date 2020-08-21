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
        path: '/unpermission',
        name: 'UnPermission',
        component: () => import('@/page/unpermission')
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
        name: 'Error',
        component: () => import('@/page/error')
      }
    ]
  }
]

export default router
