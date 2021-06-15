<template>
  <div class="layout-fixed-box">
    <my-editor v-model="editorInfo" :map="map" ref="editor"></my-editor>
    <el-button-group>
      <el-button @click="draw('marker')">marker</el-button>
      <el-button @click="draw('polyline')">polyline</el-button>
      <el-button @click="draw('polygon')">polygon</el-button>
      <el-button @click="draw('circle')">circle</el-button>
      <el-button @click="draw('rectangle')">rectangle</el-button>
    </el-button-group>
    <el-button-group>
      <el-button @click="submit">submit</el-button>
      <el-button @click="close">close</el-button>
    </el-button-group>
  </div>
</template>

<script>
import MyEditor from './components/editor'
export default {
  components: {
    MyEditor
  },
  data() {
    return {
      map: window.$$amap,
      editorInfo: []
    }
  },
  methods: {
    draw(type) {
      this.$lhpamap.draw.open({
        type: type,
        map: this.map,
        callback: (params) => {
          this.editorInfo.push({
            ...params,
            type
          })
        }
      })
    },
    submit() {
      console.log(this.$refs.editor.submit())
      this.close()
    },
    close() {
      this.editorInfo = []
      this.$lhpamap.draw.close()
    }
  },
  destroyed() {
    this.close()
  }
};
</script>
