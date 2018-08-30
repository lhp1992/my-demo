<template>
  <div>
    <my-feature ref="child" v-if="isShow" :path="path" :map="map"></my-feature>
    <div v-else class="tip">鼠标在地图上点击添加起点、终点</div>
  </div>
</template>

<script>
export default {
  components: {
    'my-feature': () => import('./map-feature/dragroute')
  },
  data () {
    return {
      path: [],
      isShow: false
    }
  },
  props: ['map'],
  methods: {
    onclick(e) {
      const position = [e.lnglat.lng, e.lnglat.lat]
      if (this.path.length > 0) {
        this.map.off('click', this.onclick)
        this.isShow = true
        this.clear()
      } else {
        this.start = new AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
          position: position,
          map: this.map
        })
      }
      this.path.push(position)
    },
    clear() {
      this.start && this.start.setMap(null)
    },
    submit() {
      return this.path.length === 2 ? this.$refs.child.submit() : false
    }
  },
  mounted () {
    this.map.on('click', this.onclick)
  },
  destroyed () {
    this.clear()
  }
}
</script>
