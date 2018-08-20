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
  props: ['onclick', 'options', 'map', 'onload'],
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
  },
  destroyed () {
    this.features.remove()
  }
}
</script>
