<template></template>

<script>
import config from 'lhp-amap/packages/config'
let _default = config.getOptions('rectangle')
export default {
  name: 'LhpAmapRectangle',
  props: {
    id: undefined,
    bounds: undefined,
    options: {
      type: Object,
      default() { return {} }
    },
    extData: undefined,
    events: {
      type: Object,
      default() { return {} }
    },
    map: undefined
  },
  watch: {
    bounds(val) {
      let bounds = new AMap.Bounds(val[0], val[1])
      this.$$feature.setBounds(bounds)
    },
    extData(val) {
      this.$$feature.setExtData(val)
    },
    map(_map) {
      this.$$feature.setMap(_map)
    }
  },
  created () {
    let bounds
    if(this.bounds) bounds = new AMap.Bounds(this.bounds[0], this.bounds[1])
    let feature = new AMap.Rectangle(Object.assign(
      {},
      _default,
      this.options,
      {
        map: this.map,
        bounds: bounds,
        extData: this.extData
      }
    ))

    if(this.id) feature.$$lhpid = this.id

    this.$$feature = feature

    for (let key in this.events) {
      feature.on(key, this.events[key])
    }

    this.$emit('onCreated', feature)
  },
  destroyed() {
    this.$$feature.emit('destroyed', this)
    this.$emit('onDestroyed', this.$$feature)
    this.$$feature.setMap(null)
  }
};
</script>
