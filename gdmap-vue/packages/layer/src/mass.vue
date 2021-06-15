<template>
  <div>
    <lhp-amap-cluster 
      ref="cluster"
      :features="clusterFeatures" 
      :map="map" 
      :options="clusterOptions" 
      :gently="gently" 
      :visible="!disabled && !isAlone && visible"
    ></lhp-amap-cluster>
    <lhp-amap-cluster 
      ref="clusterAlone"
      v-if="alone" 
      :features="aloneFeatures" 
      :map="map" 
      :options="clusterOptions" 
      :visible="!disabled && isAlone"
    ></lhp-amap-cluster>
  </div>
</template>
<script>
import mixin from './mixin'
import addMarker from 'lhp-amap/packages/marker/src/add-overlay'
export default {
  name: 'LhpAmapLayerMass',
  mixins: [mixin],
  computed: {
    clusterFeatures() {
      return this.data.filter(item => !this.unvisibleIdsObj[item[this.defaultProps.id]]).map(item => this.getMarker(item))
    },
    aloneFeatures() {
      return this.aloneList.filter(item => !this.unvisibleIdsObj[item[this.defaultProps.id]]).map(item => this.getMarker(item))
    }
  },
  methods: {
    getMarker(item) {
      let id = item[this.defaultProps.id]
      
      if(this.features[id]) {
        return this.features[id]
      }

      let feature = addMarker({
        options: this.markerOptions,
        position: item[this.defaultProps.position],
        content: item[this.defaultProps.content],
        extData: item,
        id: id,
        events: this.events
      })

      this.features[id] = feature
      return feature
    }
  }
};
</script>