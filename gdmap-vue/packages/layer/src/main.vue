<template>
  <div>
    <div>
      <lhp-amap-cluster 
        ref="cluster"
        :features="clusterFeatures" 
        :map="map" 
        :options="clusterOptions" 
        :gently="gently" 
        :visible="!disabled && !isAlone && visible"
      ></lhp-amap-cluster>
      <lhp-amap-marker 
        v-for="item in data" 
        :feature="cacheFeatures[item[defaultProps.id]]"
        :key="item[defaultProps.id]" 
        :id="item[defaultProps.id]"
        :position="item[defaultProps.position]" 
        :content="item[defaultProps.content]"
        :ext-data="item"
        :options="markerOptions"
        :events="events"
        @onCreated="feature => onCreated(feature, item[defaultProps.id])" 
        @onDestroyed="() => $delete(features, item[defaultProps.id])"
      ></lhp-amap-marker>
    </div>

    <div v-if="alone">
      <lhp-amap-cluster 
        ref="clusterAlone"
        :features="aloneFeatures" 
        :map="map" 
        :options="clusterOptions"
        :visible="!disabled && isAlone"
      ></lhp-amap-cluster>
      <lhp-amap-marker 
        v-for="item in aloneFilterList"
        :key="item[defaultProps.id]" 
        :id="item[defaultProps.id]"
        :feature="cacheFeatures[item[defaultProps.id]]"
        :position="item[defaultProps.position]" 
        :content="item[defaultProps.content]"
        :ext-data="item"
        :options="markerOptions"
        :events="events"
        @onCreated="feature => onCreatedAlone(feature, item[defaultProps.id])"  
        @onDestroyed="() => $delete(aloneFeatures, item[defaultProps.id])"
      ></lhp-amap-marker>
    </div>
  </div>
</template>
<script>
import mixin from './mixin'
import LhpAmapMarker from 'lhp-amap/packages/marker'
export default {
  name: 'LhpAmapLayer',
  mixins: [mixin],
  components: {
    LhpAmapMarker
  },
  data() {
    return {
      cacheFeatures: {}
    }
  },
  computed: {
    clusterFeatures() {
      return Object.values(this.features).filter(feature => !this.unvisibleIdsObj[feature.$$lhpid])
    },
    aloneFilterList() {
      return this.aloneList.filter(e => !this.listObj[e[this.defaultProps.id]])
    },
    aloneFeatures() {
      return this.aloneList
      .filter(item => !this.unvisibleIdsObj[item[this.defaultProps.id]])
      .map(e => this.cacheFeatures[e[this.defaultProps.id]])
    }
  },
  methods: {
    onCreated(feature, id) {
      this.$set(this.features, id, feature)
      if(!this.cacheFeatures[id]) this.$set(this.cacheFeatures, id, feature)
    },
    onCreatedAlone(feature, id) {
      if(!this.cacheFeatures[id]) this.$set(this.cacheFeatures, id, feature)
    }
  }
};
</script>