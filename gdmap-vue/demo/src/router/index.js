import Vue from 'vue'
import Router from 'vue-router'
import { router } from '../config'

Vue.use(Router)

export default new Router({
  routes: [
    ...router.map(e => {
      return {
        path: '/' + e.path,
        name: e.path,
        component: () => import('@/page/' + e.path +'/index')
      }
    })
  ]
})
