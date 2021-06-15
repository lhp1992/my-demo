<template>
  <lhp-amap-polyline ref="overlay" v-bind="$props" v-on="$listeners" @onCreated="openEdit"></lhp-amap-polyline>
</template>

<script>
import LhpAmapPolyline from 'lhp-amap/packages/polyline'
import emitter from 'lhp-amap/src/mixins/emitter'
import config from 'lhp-amap/packages/config'
import { getFeatureParams } from 'lhp-amap/packages/compute/src/main.js'
let _default = config.getEditor('polyline')

export default {
  name: 'LhpAmapEditorPolyline',
  mixins: [emitter],
  props: {
    ...LhpAmapPolyline.props,
    map: {
      required: true
    },
    options: {
      type: Object,
      default() { return _default }
    }
  },
  components: {
    LhpAmapPolyline
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