<template>
  <div><slot></slot></div>
</template>

<script>
import json from '../../assets/sc.json'
export default {
  data () {
    return {
      features: null,
      data: []
    }
  },
  props: ['onclick', 'options', 'map', 'onload', 'params'],
  methods: {
    load (data) {
      this.data = data
      this.features = new gdMap.GeoJSON()
      this.features.load(data)
      this.onload && this.onload(this)
    }
  },
  mounted () {
    this.load(json)
    this.map.setCenter([107.8967,30.3223])
    this.map.setZoom(8)
  },
  destroyed () {
    this.features.remove()
    this.map.setCenter([112.982279, 28.19409])
    this.map.setZoom(15)
  }
}
</script>
