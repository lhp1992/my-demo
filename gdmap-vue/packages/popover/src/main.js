import Vue from 'vue'
import MapPopover from './main.vue'
const Constructor = Vue.extend(MapPopover)

export default {
  isInit: false,
  init() {
    this.$$infoWindow = new AMap.InfoWindow({
      // closeWhenClickMap: true
    })
    this.$$instance = new Constructor({
      el: document.createElement('div')
    })
    this.isInit = true
  },
  open({map, position, data = {}, instance, options = {}}, feature) {
    if (!this.isInit) this.init()
    let _instance = instance || this.$$instance

    if(_instance.__options) {
      for(let key in _instance.__options) {
        _instance[key] = undefined
      }
    }
    _instance.__options = options

    for(let key in options) {
      _instance[key] = options[key]
    }
    _instance.data = data
    _instance.close = () => {
      this.close()
    }

    this.$$infoWindow.setContent(_instance.$el)
    this.$$infoWindow.open(map, position)

    if(feature) {
      let onFeatureDestroyed = () => {
        this.close()
      }
      feature.on('destroyed', onFeatureDestroyed)

      let onInfoWindowClose = () => {
        feature.off('destroyed', onFeatureDestroyed)
        this.$$infoWindow.off('close', onInfoWindowClose)
        this.$$infoWindow.off('open', onInfoWindowClose)
      }
      this.$$infoWindow.on('close', onInfoWindowClose)
      this.$$infoWindow.on('open', onInfoWindowClose)
    }
    return _instance
  },
  close() {
    if(this.$$infoWindow) this.$$infoWindow.close()
  }
}
