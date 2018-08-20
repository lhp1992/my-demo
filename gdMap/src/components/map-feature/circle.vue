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
      this.features = new gdMap.Circles()
      this.features.load(data)
      this.onload && this.onload(this)
    }
  },
  mounted () {
    this.$ajax.map.getCircle({}, this.load)
  },
  destroyed () {
    this.features.remove()
  }
}
</script>
