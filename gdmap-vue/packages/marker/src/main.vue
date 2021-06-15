<template></template>

<script>
import addMarker from './add-overlay'
export default {
  name: 'LhpAmapMarker',
  props: {
    id: undefined,
    position: undefined,
    content: undefined,
    icon: undefined,
    options: {
      type: Object,
      default() { return {} }
    },
    extData: undefined,
    events: {
      type: Object,
      default() { return {} }
    },
    map: undefined,
    feature: undefined
  },
  watch: {
    position(val, oldval) {
      this.$$feature.setPosition(val)
    },
    content(val) {
      this.$$feature.setContent(val)
    },
    icon(val) {
      this.$$feature.setIcon(val)
    },
    extData(val) {
      this.$$feature.setExtData(val)
    },
    map(_map) {
      this.$$feature.setMap(_map)
    }
  },
  created () {
    if(this.feature) {
      this.$$feature = this.feature
      this.$emit('onCreated', this.$$feature)
      return
    }

    let feature = addMarker({
      options: this.options,
      map: this.map,
      position: this.position,
      content: this.content,
      icon: this.icon,
      extData: this.extData,
      id: this.id,
      events: this.events
    })

    this.$$feature = feature
    this.$emit('onCreated', this.$$feature)
  },
  destroyed() {
    this.$$feature.emit('destroyed', this)
    this.$emit('onDestroyed', this.$$feature)
    this.$$feature.setMap(null)
  }
};
</script>
