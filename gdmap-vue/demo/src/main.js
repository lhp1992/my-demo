// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
Vue.use(ElementUI)
import 'element-ui/lib/theme-chalk/index.css'

// import LhpAmap from 'lhp-amap/lib'
// import 'lhp-amap/lib/lhp-amap.css'
import LhpAmap from 'lhp-amap/index.js'
Vue.use(LhpAmap)

import Units from './public/units'
Vue.use(Units)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
