<template>
  <div class="button-group">
    <input v-for="item in list" @click="binClick(item)" class="button" type="button" :value="item.title">
    <template v-for="item in showList">
      <component v-bind:is="'my-' + item.params.type" :map="map" :params="item.params" :options="item.params.options"></component>
    </template>
  </div>
</template>
<script>
export default {
  components: {
    'my-marker': () => import('./map-feature/marker'),
    'my-polyline': () => import('./map-feature/polyline'),
    'my-polygon': () => import('./map-feature/polygon'),
    'my-circle': () => import('./map-feature/circle')
  },
  data() {
    return {
      list: [
        {
          title: '点标记',
          type: 'marker',
          name: 'marker'
        }, {
          title: '折线',
          type: 'polyline',
          name: 'polyline'
        }, {
          title: '图标点标记',
          type: 'marker',
          name: 'marker-icon',
          options: {
            default: {
              icon: './static/img1.png'
            }
          }
        }, {
          title: '多边形',
          type: 'polygon',
          name: 'polygon'
        }, {
          title: '圆形',
          type: 'circle',
          name: 'circle'
        }
      ],
      showList: []
    }
  },
  props: ['map'],
  methods: {
    // onload(e) {
    //   let obj = this.showList.filter(d => d.params === e.params)[0]
    //   console.log(obj)
    //   obj.list = e.data
    //   obj.features = e.features
    // },
    binClick(e) {
      for (let i = 0, len = this.showList.length; i < len; i++) {
        if (this.showList[i].params === e) {
          this.showList.splice(i, 1)
          return false
        }
      }
      this.showList.push({
        params: e
      })
    }
  },
  created () {
  }
}
</script>

<style scoped>
  .button-group .button{
    margin-right: 5px;
  }
</style>