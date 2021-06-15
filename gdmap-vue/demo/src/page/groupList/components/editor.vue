<template>
  <lhp-amap-editor ref="editor">
    <template v-for="data in value">
      <lhp-amap-editor-marker v-if="data.type === 'marker'" :position="data.position" :ext-data="{ type: data.type }" :map="map"></lhp-amap-editor-marker>
      <lhp-amap-editor-polyline v-if="data.type === 'polyline'" :path="data.path" :ext-data="{ type: data.type }" :map="map"></lhp-amap-editor-polyline>
      <lhp-amap-editor-polygon v-if="data.type === 'polygon'" :path="data.path" :ext-data="{ type: data.type }" :map="map"></lhp-amap-editor-polygon>
      <lhp-amap-editor-circle v-if="data.type === 'circle'" :center="data.center" :ext-data="{ type: data.type }" :radius="data.radius" :map="map"></lhp-amap-editor-circle>
      <lhp-amap-editor-rectangle v-if="data.type === 'rectangle'" :bounds="data.bounds" :ext-data="{ type: data.type }" :map="map"></lhp-amap-editor-rectangle>
    </template>
  </lhp-amap-editor>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default() { return [] }
    },
    map: undefined
  },
  methods: {
    submit() {
      return this.$refs.editor.getParams()
    }
  }
};
</script>
