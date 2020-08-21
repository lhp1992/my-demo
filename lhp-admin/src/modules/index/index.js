// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { default as router, asyncRoutes } from './router'
import Authority from '../../public/authority'
import Breadcrumbs from '../../public/breadcrumbs'
import Ajax from '../../public/ajax';
import Plugin from './plugin';

// import '../../public/mock';

Vue.use(ElementUI)
Vue.use(Ajax)
Vue.use(Plugin)
Vue.use(Breadcrumbs)
Vue.config.productionTip = false


// setTimeout(() => {
  let authorityList
  let _authoritys = localStorage.getItem('authority')
  if (_authoritys) {
    authorityList = _authoritys.split(',')
  } else {
    authorityList = []
  }
  Vue.use(Authority, {
    name: 'index',
    router: router,
    asyncRoutes: asyncRoutes,
    authorityList: authorityList
  })

  
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
// }, 1000)
