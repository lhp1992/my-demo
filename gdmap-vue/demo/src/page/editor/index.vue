<template>
  <div>
    <lhp-amap-editor ref="editor">
      <lhp-amap-editor-marker :position="point" :map="map"></lhp-amap-editor-marker>
      <lhp-amap-editor-polyline :path="line" :map="map"></lhp-amap-editor-polyline>
      <lhp-amap-editor-polygon :path="polygon" :map="map"></lhp-amap-editor-polygon>
      <lhp-amap-editor-circle :center="circle.center" :radius="circle.radius" :map="map"></lhp-amap-editor-circle>
      <lhp-amap-editor-rectangle :bounds="bounds" :map="map"></lhp-amap-editor-rectangle>
    </lhp-amap-editor>

    <div class="layout-fixed-box">
      <el-button @click="getParams">getParams</el-button>
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
    getParams(type) {
      console.log(this.$refs.editor.getParams())
    }
  }
};
</script>
