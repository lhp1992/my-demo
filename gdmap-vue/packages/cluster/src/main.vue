<template></template>

<script>
import debounce from 'throttle-debounce/debounce'
export default {
  name: 'LhpAmapCluster',
  props: {
    features: {
      type: Array,
      default() {
        return []
      }
    },
    options: Object,
    map: {
      required: true
    },
    visible: {
      type: Boolean,
      default: true
    },
    gently: Boolean
  },
  data() {
    return {
      hasReload: false
    }
  },
  watch: {
    features(val) {
      this.debouncedFeatures(val)
    },
    visible(val) {
      this.$$cluster.setMap(val ? this.map : null)
      if(val && this.hasReload) {
        this.$$cluster.setMarkers(this.features)
        this.hasReload = false
        this.debouncedFeatures(undefined, true)
      }
    }
  },
  methods: {
    sortCluster(target) {
      if(!this.$$cluster) return

      if(!this.visible) {
        this.hasReload = true
        return
      }
      
      target = target.filter(e => e)
      
      if(this.gently) {
        if(target.length === 0) {
          this.$$cluster.clearMarkers()
          return
        }
        let targetObj = {}
        target.forEach(e => targetObj[e._amap_id] = true)

        let current = this.$$cluster.getMarkers()
        let currentObj = {}
        current.forEach(e => currentObj[e._amap_id] = true)

        let removeMarkers = current.filter(e => !targetObj[e._amap_id])
        let addMarkers = target.filter(e => !currentObj[e._amap_id])

        this.$$cluster.removeMarkers(removeMarkers)
        this.$$cluster.addMarkers(addMarkers)
      } else {
        this.$$cluster.setMarkers(target)
      }
    }
  },
  created() {
    this.map.plugin(["AMap.MarkerClusterer"], () => {
      let cluster = new AMap.MarkerClusterer(this.map, [], this.options)
      this.$$cluster = cluster
      this.$nextTick(() => {
        this.$$cluster.setMarkers(this.features)
        if(!this.visible) this.$$cluster.setMap(null)
      })
    });

    this.debouncedFeatures = debounce(100, (val, isStop) => {
      if(val === undefined || isStop) return
      this.sortCluster(val)
    });
  },
  destroyed() {
    this.$$cluster.setMap(null)
  }
};
</script>