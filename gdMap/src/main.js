// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import APIs from './api'

Vue.use(APIs)
Vue.use(ElementUI)
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.innerText
    el.remove()
  }
})
Vue.config.productionTip = false

/* eslint-disable no-new */
window.onload = function(){
  new Vue({
    el: '#app',
    router,
    store: Store,
    components: { App },
    template: '<App/>'
  })
}
