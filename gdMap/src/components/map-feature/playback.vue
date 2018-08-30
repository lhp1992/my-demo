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
  props: ['onclick', 'options', 'map', 'onload', 'onstart', 'params'],
  methods: {
    load (data) {
      this.data = data
      this.feature = new gdMap.Playback({
        map: this.map,
        polylineDefault: {
          // strokeStyle: 'dashed',
          // strokeWeight: 1,
          strokeWeight: 7,
          showDir: true,
          strokeColor: '#f00'
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