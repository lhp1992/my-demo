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
  props: ['onclick', 'options', 'map', 'onload'],
  methods: {
    load (data) {
      this.data = data
      this.features = new gdMap.OverlayGroup({
        default: {
          draggable: true,
          cursor: 'move'
        },
        setContextMenu: [
          {
            title: "删除",
            callback: function(e) {
              e.del()
            }
          },
          {
            title: "选项二",
            callback: function(e) {
              console.log(overlayGroup)
            }
          }
        ],
        onClick: function(e){
          console.log(e)
        },
        onDragend: function(e){
          console.log(e)
        }
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
        type: 'marker',
        position: [112.984279, 28.19609]
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
      }
    ])
  },
  destroyed () {
    this.features.remove()
  }
}
</script>
