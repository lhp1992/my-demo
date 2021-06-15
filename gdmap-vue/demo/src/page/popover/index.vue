<template>
  <div>
    <lhp-amap-marker 
      v-for="point in points" 
      :key="point.id" 
      :id="point.id" 
      :position="point.position" 
      :extData="point"
      :map="map"
      :events="events"
    ></lhp-amap-marker>

    <div class="layout-fixed-box">
      <el-button @click="openPopover">openPopover</el-button>
      <el-button @click="closePopover">closePopover</el-button>
      <el-button @click="destroyedMarkers">destroyedMarkers</el-button>
      <el-button @click="loadMarkers">loadMarkers</el-button>
    </div>
  </div>
</template>

<script>
import Popover from './components/popover'
import Vue from 'vue'
const Constructor = Vue.extend(Popover)
let instance = new Constructor({
  el: document.createElement('div')
})

export default {
  data() {
    let points = this.$units.getPointList(10)
    return {
      map: window.$$amap,
      points: points,
      center: window.$$amap.getCenter(),
      events: {
        click: this.handleClick
      }
    }
  },
  methods: {
    handleClick({target}) {
      this.$lhpamap.popover.open({
        map: this.map, 
        position: target.getPosition(), 
        data: target.getExtData(), 
        instance: instance
      }, target)
    },
    openPopover() {
      this.$lhpamap.popover.open({
        map: this.map, 
        position: this.center,
        options: {
          width: 320,
          title: 'test title',
          buttons: ['无绑定事件', {
            text: '绑定事件',
            action(data, vm) {
              console.log(data)
              console.log(vm)
            }
          }]
        }
      })
    },
    closePopover() {
      this.$lhpamap.popover.close()
    },
    destroyedMarkers() {
      this.points = []
    },
    loadMarkers() {
      let points = this.$units.getPointList(10)
      this.points = points
    }
  },
  destroyed() {
    this.$lhpamap.popover.close()
  }
};
</script>
