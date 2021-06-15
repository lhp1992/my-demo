<template>
  <div>
    <lhp-amap-layer ref="layer" :data="list" :map="map" alone></lhp-amap-layer>

    <div class="layout-fixed-box">
      <el-button @click="toggle">toggle</el-button>
      <el-button @click="setAlone">setAlone</el-button>
      <el-button @click="clearAlone">clearAlone</el-button>
    </div>
  </div>
</template>

<script>
import { getPointList } from '@/public/units'
let points = getPointList(15)
let points2 = getPointList(8)
let points3 = points2.concat(points.slice(0, 5))

export default {
  data() {
    return {
      list: points,
      aloneList: points3,
      map: window.$$amap
    }
  },
  methods: {
    toggle() {
      this.$refs.layer.toggle()
    },
    setAlone() {
      this.$refs.layer.setAlone(this.aloneList)
    },
    clearAlone() {
      this.$refs.layer.clearAlone()
    }
  }
};
</script>