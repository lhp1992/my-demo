<template></template>

<script>
import config from 'lhp-amap/packages/config'
let _default = config.getOptions('polyline')
export default {
  name: 'LhpAmapPolyline',
  props: {
    id: undefined,
    path: Array,
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
    path(val) {
      this.$$feature.setPath(val ? [...val] : undefined)
    },
    extData(val) {
      this.$$feature.setExtData(val)
    },
    map(_map) {
      this.$$feature.setMap(_map)
    }
  },
  created () {
    let feature = new AMap.Polyline(Object.assign(
      {},
      _default,
      this.options,
      {
        map: this.map,
        path: this.path ? [...this.path] : undefined,
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
