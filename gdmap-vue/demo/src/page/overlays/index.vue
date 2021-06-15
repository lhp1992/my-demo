<template>
  <div>
    <lhp-amap-marker ref="marker" :position="point" :map="map"></lhp-amap-marker>
    <lhp-amap-polyline ref="polyline" :path="line" :map="map"></lhp-amap-polyline>
    <lhp-amap-polygon ref="polygon" :path="polygon" :map="map"></lhp-amap-polygon>
    <lhp-amap-circle ref="circle" :center="circle.center" :radius="circle.radius" :map="map"></lhp-amap-circle>
    <lhp-amap-rectangle ref="rectangle" :bounds="bounds" :map="map"></lhp-amap-rectangle>
    <lhp-amap-text ref="text" :position="text" :map="map" text="test text"></lhp-amap-text>

    <div class="layout-fixed-box">
      <el-button @click="setFitView('marker')">marker</el-button>
      <el-button @click="setFitView('polyline')">polyline</el-button>
      <el-button @click="setFitView('polygon')">polygon</el-button>
      <el-button @click="setFitView('circle')">circle</el-button>
      <el-button @click="setFitView('rectangle')">rectangle</el-button>
      <el-button @click="setFitView('text')">text</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let point = this.$units.getPoints()[0]
    let line = this.$units.getLines()[0]
    let polygon = this.$units.getPolygons()[0]
    let circle = this.$units.getCircles()[0]
    let bounds = this.$units.getBounds()[0]
    let text = this.$units.getPoints()[0]
    return {
      map: window.$$amap,
      point: point,
      line: line,
      polygon: polygon,
      circle: circle,
      bounds: bounds,
      text: text
    }
  },
  methods: {
    setFitView(type) {
      this.map.setFitView(this.$refs[type].$$feature)
    }
  }
};
</script>
