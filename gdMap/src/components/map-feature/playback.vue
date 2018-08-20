<template>
  <div><slot></slot></div>
</template>

<script>
export default {
  data () {
    return {
      feature: null,
      data: []
    }
  },
  props: ['onclick', 'options', 'map', 'onload', 'onstart'],
  methods: {
    load (data) {
      this.data = data
      this.feature = new gdMap.Playback({
        map: this.map,
        polylineDefault: {
          strokeStyle: 'dashed',
          strokeColor: '#f00',
          strokeWeight: 1
        },
        onStart: this.onstart || null
      })
      this.feature.setData(data)
      this.onload && this.onload(this)
    }
  },
  mounted () {
    this.$ajax.map.getRun({}, this.load)
  },
  destroyed () {
    this.feature.remove()
  }
}
</script>