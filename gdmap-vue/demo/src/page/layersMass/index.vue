<template>
  <div>
    <lhp-amap-layer-mass ref="layer" v-model="visible" :data="list" :map="map" alone></lhp-amap-layer-mass>

    <div class="layout-fixed-box">
      <el-button @click="toggle">toggle</el-button>
      <el-button @click="setAlone">setAlone</el-button>
      <el-button @click="clearAlone">clearAlone</el-button>
    </div>
  </div>
</template>

<script>
import { getPointList } from '@/public/units'
let points = getPointList(15000)
let points2 = getPointList(8000)
let points3 = points2.concat(points.slice(0, 5000))
export default {
  data() {
    return {
      list: [],
      map: window.$$amap,
      isRender: false,
      visible: false
    }
  },
  methods: {
    toggle() {
      if(!this.isRender) {
        this.isRender = true
        this.list = points
      }
      this.$refs.layer.toggle()
    },
    setAlone() {
      this.$refs.layer.setAlone(points3)
    },
    clearAlone() {
      this.$refs.layer.clearAlone()
    }
  }
};
</script>