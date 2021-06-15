<template>
  <lhp-amap-polygon ref="overlay" v-bind="$props" v-on="$listeners" @onCreated="openEdit"></lhp-amap-polygon>
</template>

<script>
import LhpAmapPolygon from 'lhp-amap/packages/polygon'
import emitter from 'lhp-amap/src/mixins/emitter'
import config from 'lhp-amap/packages/config'
import { getFeatureParams } from 'lhp-amap/packages/compute/src/main.js'
let _default = config.getEditor('polygon')

export default {
  name: 'LhpAmapEditorPolygon',
  mixins: [emitter],
  props: {
    ...LhpAmapPolygon.props,
    map: {
      required: true
    },
    options: {
      type: Object,
      default() { return _default }
    }
  },
  components: {
    LhpAmapPolygon
  },
  data() {
    return {
      pluginName: 'PolyEditor'
    }
  },
  methods: {
    openEdit(feature) {
      this.map.plugin(["AMap."+ this.pluginName], () => {
        this.$$editor = new window.AMap[this.pluginName](this.map, feature)
        this.$$editor.open()
      })
      feature.setDraggable(true)
      this.$$feature = feature
    },
    getParams() {
      let params = getFeatureParams(this.$$feature)
      return {
        id: this.id,
        extData: this.extData,
        params: params
      }
    }
  },
  created() {
    this.dispatch('LhpAmapEditor', 'amap.editor.addVm', [this]);
  },
  destroyed() {
    this.$$editor && this.$$editor.close()
    this.dispatch('LhpAmapEditor', 'amap.editor.removeVm', [this]);
  }
};
</script>