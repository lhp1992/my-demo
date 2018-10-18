<template>
  <div>
    <slot></slot>
    <div class="button-group">
      <input type="button" class="button" value="鼠标绘制点" @click="draw('marker')"/>
      <input type="button" class="button" value="鼠标绘制线" @click="draw('polyline')"/>
      <input type="button" class="button" value="鼠标绘制面" @click="draw('polygon')"/>
      <input type="button" class="button" value="鼠标绘制矩形" @click="draw('rectangle')"/>
      <input type="button" class="button" value="鼠标绘制圆" @click="draw('circle')"/>
      <input type="button" class="button" value="提交" @click="submit"/>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      features: null,
      data: []
    }
  },
  props: ['map'],
  methods: {
    draw (type) {
      this.type = type
      gdMap.mouseTool.draw(type)
    },
    getOptions (item, type) {
      let options = {}
      switch (type) {
        case 'marker':
          options = {
            type: 'marker',
            position: item.getPosition()
          }
          if (item.params && item.params.title) {
            options.title = item.params.title
          }
          break;
        case 'polyline':
          options = {
            type: 'polyline',
            path: item.getPath()
          }
          break;
        case 'polygon':
          options = {
            type: 'polygon',
            path: item.getPath()
          }
          break;
        case 'circle':
          options = {
            type: 'circle',
            center: item.getCenter(),
            radius: item.getRadius()
          }
          break;
        case 'rectangle':
          options = {
            type: 'rectangle',
            bounds: item.getBounds()
          }
          break;
      }
      return options
    },
    submit () {
      this.features.data.forEach((item) => {
        console.log(this.getOptions(item, item.params.type))
      })
    }
  },
  mounted () {
    const markerTitleIpt = gdMap.markerTitleIpt({
      map: this.map,
      icon: './static/img1.png'
    })
    this.features = new gdMap.OverlayGroup({
      map: this.map,
      isEditor: true,
      notEditorClose: true,
      defaults: {
        'marker': {
          offset: {x: -12, y: -24}
        },
        'all': {
          strokeColor: "#1791fc",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#1791fc",
          fillOpacity: 0.35
        }
      },
      setContextMenu: [
        {
          title: "删除",
          callback: function(e) {
            e.del()
          }
        }
      ],
      onAdd: function (params, e) {
        params.type === 'marker' && markerTitleIpt.onAdd(params, e)
      },
      onAddEnd: function (item) {
        if (item.params.type === 'marker') {
          markerTitleIpt.onAddEnd(item)
          item._params.$dom.find('.marker-title').click()
        }
        item.editor()
      }
    })
    gdMap.mouseTool.init({
      map: this.map,
      onDraw: (e) => {
        let options = this.getOptions(e.obj, this.type)
        this.features.add(options)
        e.obj.setMap(null)
        gdMap.mouseTool.remove()
      }
    })
  },
  destroyed () {
    this.map.clearMap()
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
