<template>
  <div></div>
</template>

<script>
export default {
  props: ['item', 'map', 'params'],
  methods: {
    search() {
      this.driving.search(this.item.start, this.item.end, {
        waypoints: this.item.waypoints
      })
    }
  },
  watch: {
    item() {
      this.search()
    }
  },
  mounted () {
    this.driving = new AMap.Driving({
      map: this.map,
      panel: "panel"
    })
    this.search()
  },
  destroyed () {
    this.driving.clear()
  },
  created () {
    this.map.plugin(["AMap.Driving"])
  }
}
</script>

<style>
  .amap-call{
    display: none
  }
  .icon-arrow-up:before{
    content: ''
  }
</style>
