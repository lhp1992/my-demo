<template></template>

<script>
import config from 'lhp-amap/packages/config'
let _default = config.getOptions('text')
export default {
  name: 'LhpAmapText',
  props: {
    id: undefined,
    position: undefined,
    text: String,
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
    position(val, oldval) {
      this.$$feature.setPosition(val)
    },
    text(val) {
      this.$$feature.setText(val)
    },
    extData(val) {
      this.$$feature.setExtData(val)
    },
    map(_map) {
      this.$$feature.setMap(_map)
    }
  },
  created () {
    let feature = new AMap.Text(Object.assign(
      {},
      _default,
      this.options,
      {
        map: this.map,
        position: this.position,
        text: this.text,
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
