<template>
  <div><slot></slot></div>
</template>

<script>
export default {
  data () {
    return {
      features: null,
      data: []
    }
  },
  props: ['onclick', 'options', 'map', 'onload', 'params'],
  methods: {
    load (data) {
      this.data = data
      this.features = new gdMap.OverlayGroup({
        isEditor: true,
        setContextMenu: [
          {
            title: "删除",
            callback: function(e) {
              e.del()
            }
          },
          {
            title: "编辑",
            callback: function(e) {
              e.editor()
            }
          }
        ],
        map: this.map
        // defaults: {
        //   'all': {
        //     draggable: true,
        //     cursor: 'move'
        //   },
        //   'polygon': {
        //     fillColor:'blue',
        //   }
        // }
        // onClick: function(e){
        //   console.log(e)
        // },
      })
      this.features.load(data)
      this.onload && this.onload(this)
    }
  },
  mounted () {
    this.load([
      {
        id: '1',
        type: 'marker',
        position: [112.982279, 28.19409]
      }, {
        id: '2',
        type: 'text',
        position: [112.984279, 28.19609],
        text: '文字标记'
      }, {
        id: '3',
        type: 'polyline',
        path: [[112.982279, 28.19409], [112.984279, 28.19609], [112.984279, 28.19409]]
      }, {
        id: '4',
        type: 'polygon',
        path: [[112.982279, 28.19209], [112.984279, 28.19409], [112.984279, 28.19209]]
      }, {
        id: '5',
        type: 'circle',
        center: [112.984279, 28.19409],
        radius: 100
      }, {
        id: '6',
        type: 'rectangle',
        bounds: [[112.982279, 28.19609], [112.984279, 28.19809]]
      }
    ])
  },
  destroyed () {
    this.features.remove()
  }
}
</script>
