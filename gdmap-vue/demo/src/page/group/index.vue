<template>
  <div>
    <my-overlay
      v-for="item in list"
      :key="item.id"
      :map="map"
      :data="item"
      :events="events"
    ></my-overlay>
  </div>
</template>

<script>
import Mock from 'mockjs'
import MyOverlay from './components/overlays'
export default {
  components: {
    MyOverlay
  },
  data() {
    let list = this.$units.getPolygons(10).map(e => {
      return Mock.mock({
        path: e,
        id: '@id',
        name: '@cname',
        'radius|2000-4000': 0,
        title: '@ctitle'
      })
    })
    return {
      list: list,
      map: window.$$amap,
      events: { click: this.handleClick }
    }
  },
  methods: {
    handleClick({target}) {
      let extData = target.getExtData()
      this.$lhpamap.popover.open({
        map: this.map, 
        position: extData.center,
        data: extData.data,
        options: {
          width: 320,
          title: '复杂覆盖物',
          field: { id: 'id', name: '名称', title: '内容' }
        }
      })
    }
  }
};
</script>