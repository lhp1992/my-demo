<template>
  <my-feature :onload="onload" :map="map"></my-feature>
</template>
<script>
export default {
  components: {
    'my-feature': () => import('./map-feature/marker')
  },
  props: ['map'],
  methods: {
    onload(e) {
      this.list = e.data
      this.features = e.features

      this.running = new gdMap.MarkerRunning({
        markers: this.features,
        endKey: 'center'
      })
      
      this.running.startTrack(1)
      this.getPoints()
      this.t = setInterval(() => this.getPoints(), 10000)
    },
    getPoints() {
      this.$ajax.map.getPoints({}, (data) => {
        this.running.running(data)
      })
    }
  },
  destroyed () {
    clearInterval(this.t)
    this.running.remove()
  }
}
</script>
