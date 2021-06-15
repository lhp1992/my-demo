<template>
  <div>
    <template v-for="data in value">
      <lhp-amap-marker v-if="data.type === 'marker'" :position="data.position" :ext-data="{ type: data.type }" :map="map" @onCreated="feature => features.push(feature)"></lhp-amap-marker>
      <lhp-amap-polyline v-if="data.type === 'polyline'" :path="data.path" :ext-data="{ type: data.type }" :map="map" @onCreated="feature => features.push(feature)"></lhp-amap-polyline>
      <lhp-amap-polygon v-if="data.type === 'polygon'" :path="data.path" :ext-data="{ type: data.type }" :map="map" @onCreated="feature => features.push(feature)"></lhp-amap-polygon>
      <lhp-amap-circle v-if="data.type === 'circle'" :center="data.center" :ext-data="{ type: data.type }" :radius="data.radius" :map="map" @onCreated="feature => features.push(feature)"></lhp-amap-circle>
      <lhp-amap-rectangle v-if="data.type === 'rectangle'" :bounds="data.bounds" :ext-data="{ type: data.type }" :map="map" @onCreated="feature => features.push(feature)"></lhp-amap-rectangle>
    </template>
  </div>
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
  data() {
    return {
      features: []
    }
  }
};
</script>
