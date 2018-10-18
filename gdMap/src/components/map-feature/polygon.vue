<template>
  <div><slot></slot></div>
</template>

<script>
export default {
  data () {
    return {
      features: null,
      data: [],
      default: {}
    }
  },
  props: ['onclick', 'options', 'map', 'onload', 'params'],
  methods: {
    load (data) {
      this.data = data
      const object = {}
      this.onclick && (object.onClick = this.onclick)
      this.map && (object.map = this.map)
      this.features = new gdMap.Polygon(Object.assign({}, this.default, this.options || {}, object))
      this.features.load(data)
      this.onload && this.onload(this)
    }
  },
  mounted () {
    this.$ajax.map.getPath({}, this.load)
  },
  destroyed () {
    this.features.remove()
  }
}
</script>