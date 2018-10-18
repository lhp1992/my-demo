<template>
  <div>
    <my-feature :map="map" :onload="onload" :options="options"></my-feature>
    <div class="button-group">
      <input @click="openAdd" type="button" class="button" value="新增"/>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    'my-feature': () => import('./map-feature/marker')
  },
  data () {
    const markerTitleIpt = gdMap.markerTitleIpt({
      icon: './static/img1.png',
      map: this.map
    })
    return {
      features: null,
      data: [],
      options: {
        positionKey: 'center',
        onAdd: markerTitleIpt.onAdd,
        onAddEnd: markerTitleIpt.onAddEnd
      },
      markerTitleIpt: markerTitleIpt,
    }
  },
  props: ['map'],
  methods: {
    onload(e) {
      this.features = e.features
    },
    openAdd () {
      this.map.on('click', this.add)
    },
    add (e) {
      this.features.add({
        center: e.lnglat
      })._params.$dom.find('.marker-title').click()
      this.map.off('click', this.add)
    }
  }
}
</script>
<style>
  .marker-title-ipt{
    position: relative;
  }
  .marker-title, .marker-input{
    border: 1px solid blue;
    background-color: white;
    white-space: nowrap;
    cursor: default;
    margin: 0;
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translate(-50%, 100%);
    white-space: nowrap;
    cursor: pointer;
  }
  .marker-title{
    padding: 0px 3px;
  }
</style>
