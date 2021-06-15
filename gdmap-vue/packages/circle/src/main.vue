<template></template>

<script>
import config from 'lhp-amap/packages/config'
let _default = config.getOptions('circle')
export default {
  name: 'LhpAmapCircle',
  props: {
    id: undefined,
    center: undefined,
    radius: Number,
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
    center(val) {
      this.$$feature.setCenter(val)
    },
    radius(val) {
      this.$$feature.setRadius(val)
    },
    extData(val) {
      this.$$feature.setExtData(val)
    },
    map(_map) {
      this.$$feature.setMap(_map)
    }
  },
  created () {
    let feature = new AMap.Circle(Object.assign(
      {},
      _default,
      this.options,
      {
        map: this.map,
        center: this.center,
        radius: this.radius,
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
