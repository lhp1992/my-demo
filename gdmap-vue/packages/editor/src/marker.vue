<template>
  <lhp-amap-marker ref="overlay" v-bind="$props" v-on="$listeners" @onCreated="openEdit"></lhp-amap-marker>
</template>

<script>
import LhpAmapMarker from 'lhp-amap/packages/marker'
import emitter from 'lhp-amap/src/mixins/emitter'
import icon from './mark_r.png'
import config from 'lhp-amap/packages/config'
import { getFeatureParams } from 'lhp-amap/packages/compute/src/main.js'
let _default = config.getEditor('marker')

export default {
  name: 'LhpAmapEditorMarker',
  mixins: [emitter],
  props: {
    ...LhpAmapMarker.props,
    options: {
      type: Object,
      default() { return _default }
    },
    icon: {
      default: icon
    }
  },
  components: {
    LhpAmapMarker
  },
  methods: {
    openEdit(feature) {
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
    this.dispatch('LhpAmapEditor', 'amap.editor.removeVm', [this]);
  }
};
</script>