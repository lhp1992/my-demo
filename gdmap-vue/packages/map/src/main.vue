<template>
  <div class="lhp-amap" style="">
    <div class="lhp-amap-container" :id="idName"></div>
    <template v-if="visible">
      <slot :map="map"></slot>
    </template>
  </div>
</template>

<script>
import guid from 'lhp-amap/src/units/guid'
export default {
  name: 'LhpAmap',
  props: {
    options: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      map: null,
      visible: false,
      idName: guid(),
      zoom: undefined
    }
  },
  mounted () {
    let options = Object.assign({}, this.options)
    let map = new AMap.Map(this.idName, options)

    window.$$amap = map
    map.$$vue = this

    this.$set(this, 'zoom', map.getZoom())
    map.on('zoomchange', () => this.$set(this, 'zoom', map.getZoom()))

    this.map = map
    this.$emit('onLoad', this.map)
    this.visible = true
  }
};
</script>

<style scoped>
  .lhp-amap {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .lhp-amap-container {
    width: 100%;
    height: 100%;
  }
</style>
