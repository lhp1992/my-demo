<template>
  <lhp-amap-circle ref="overlay" v-bind="$props" v-on="$listeners" @onCreated="openEdit"></lhp-amap-circle>
</template>

<script>
import LhpAmapCircle from 'lhp-amap/packages/circle'
import emitter from 'lhp-amap/src/mixins/emitter'
import config from 'lhp-amap/packages/config'
import { getFeatureParams } from 'lhp-amap/packages/compute/src/main.js'
let _default = config.getEditor('circle')

export default {
  name: 'LhpAmapEditorCircle',
  mixins: [emitter],
  props: {
    ...LhpAmapCircle.props,
    map: {
      required: true
    },
    options: {
      type: Object,
      default() { return _default }
    }
  },
  components: {
    LhpAmapCircle
  },
  data() {
    return {
      pluginName: 'CircleEditor'
    }
  },
  methods: {
    openEdit(feature) {
      this.map.plugin(["AMap."+ this.pluginName], () => {
        this.$$editor = new window.AMap[this.pluginName](this.map, feature)
        this.$$editor.open()
      })
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