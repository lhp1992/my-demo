<template>
  <div><slot></slot></div>
</template>

<script>
export default {
  data() {
    return {
      roads: [],
      data: null
    }
  },
  props: ['path', 'map', 'item', 'params'],
  methods: {
    submit() {
      return this.data
    }
  },
  mounted () {
    const path = this.path || [this.item.start, ...this.item.waypoints, this.item.end]
    this.map.plugin("AMap.DragRoute", () => {
      this.route = new AMap.DragRoute(this.map, path, AMap.DrivingPolicy.LEAST_TIME, {
        showTraffic: false
      })
      this.route.search()
      this.route.on('complete', msg => this.data = msg.data)
    });
  },
  destroyed () {
    this.route.destroy()
  }
}
</script>
