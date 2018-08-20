import map from './map.js'

export default{
  install (Vue, options) {
    Vue.prototype.$ajax = {
		map: map
	}
  }
}
