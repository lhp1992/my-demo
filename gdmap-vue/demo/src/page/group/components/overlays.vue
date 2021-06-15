<template>
  <div v-if="data">
    <lhp-amap-polygon :map="map" :events="events" :extData="extData" :path="data.path"></lhp-amap-polygon>
    <lhp-amap-circle :map="map" :events="events" :extData="extData" :center="center" :radius="data.radius"></lhp-amap-circle>
    <lhp-amap-marker :map="map" :events="events" :extData="extData" :position="center"></lhp-amap-marker>
  </div>
</template>

<script>
import * as turf from '@turf/turf'
export default {
  props: {
    data: Object,
    map: undefined,
    events: Object
  },
  computed: {
    center() {
      let feature = {
        geometry: {
          type: "Polygon", 
          coordinates: [this.data.path]
        },
        properties: {},
        type: "Feature"
      }
      return turf.centerOfMass(feature).geometry.coordinates
    },
    extData() {
      return {
        center: this.center,
        data: this.data
      }
    }
  }
};
</script>