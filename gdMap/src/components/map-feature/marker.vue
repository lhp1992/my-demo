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
      this.features = new gdMap.Markers({
        map: this.map,
        // default: {
        //   draggable: true,
        //   cursor: 'move'
        // },
        positionKey: 'center',
        setContextMenu: [
          {
            title: "选项一",
            callback: function(e) {
              console.log(e)
            }
          },
          {
            title: "选项二",
            callback: function(e) {
              console.log(e)
            }
          }
        ],
        // onAdd: (item) => {
        //   // console.log(item.id)
        //   // item.content = 'id: '+ item.id
        // },
        onClick: this.onclick || function(e){
          console.log(e)
        },
        // onDragend: function(e){
        //   console.log(e)
        // }
      })
      this.features.load(data)
      this.onload && this.onload(this)
    }
  },
  mounted () {
    this.$ajax.map.getMarker({}, this.load)
  },
  destroyed () {
    this.features.remove()
  }
}
</script>
