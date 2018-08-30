<template>
  <div><slot></slot></div>
</template>

<script>
export default {
  data () {
    return {
      features: null,
      data: [],
      default: {
        positionKey: 'center',
        setContextMenu: [
          {
            title: "选项一",
            callback: function(e) {
              e.editorClose()
            }
          },
          {
            title: "选项二",
            callback: function(e) {
              e.editor()
            }
          }
        ],
        isEditor: true
      }
    }
  },
  props: ['onclick', 'options', 'map', 'onload', 'params'],
  watch: {
    options() {
      this.features.remove()
      this.$ajax.map.getMarker({}, this.load)
    }
  },
  methods: {
    load (data) {
      this.data = data
      const object = {}
      this.onclick && (object.onClick = this.onclick)
      this.map && (object.map = this.map)
      this.features = new gdMap.Markers(Object.assign({}, this.default, this.options || {}, object))
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
