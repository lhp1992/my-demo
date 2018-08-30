<template>
  <div class="button-group">
    <input type="button" class="button" value="鼠标绘制点" @click="draw('marker')"/>
    <input type="button" class="button" value="鼠标绘制线" @click="draw('polyline')"/>
    <input type="button" class="button" value="鼠标绘制面" @click="draw('polygon')"/>

    <input type="button" class="button" value="鼠标绘制矩形" @click="draw('rectangle')"/>
    <input type="button" class="button" value="鼠标绘制圆" @click="draw('circle')"/>

    <input type="button" class="button" value="距离量测" @click="draw('rule')"/>
    <input type="button" class="button" value="面积量测" @click="draw('measureArea')"/>

    <input type="button" class="button" value="关闭当前鼠标操作" @click="close"/>
    <input type="button" class="button" value="清除全部" @click="clear"/>
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
  props: ['onDraw', 'map', 'params'],
  methods: {
    draw(type) {
      gdMap.mouseTool.draw(type)
    },
    close() {
      gdMap.mouseTool.close()
    },
    clear() {
      gdMap.mouseTool.remove()
    }
  },
  mounted () {
    gdMap.mouseTool.init({
      map: this.map,
      onDraw: this.onDraw
    })
  },
  destroyed () {
    gdMap.mouseTool.remove()
  }
}
</script>
