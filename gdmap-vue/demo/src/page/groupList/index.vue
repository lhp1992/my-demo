<template>
  <div class="layout-fixed-box layout-info-box" style="width: 360px">
    <my-editor v-if="isEdit" :value="editorInfo" :map="map" ref="editor"></my-editor>

    <el-button-group>
      <el-button size="mini" @click="add" :type="editType === 'add' ? 'primary' : ''">add</el-button>
      <template v-if="isEdit">
        <el-button size="mini" @click="submit">submit</el-button>
        <el-button size="mini" @click="close">close</el-button>
      </template>
    </el-button-group>
    <el-button-group v-if="isEdit" style="display: block; margin-top: 8px;">
      <el-button size="mini" @click="draw('marker')">marker</el-button>
      <el-button size="mini" @click="draw('polyline')">polyline</el-button>
      <el-button size="mini" @click="draw('polygon')">polygon</el-button>
      <el-button size="mini" @click="draw('circle')">circle</el-button>
      <el-button size="mini" @click="draw('rectangle')">rectangle</el-button>
    </el-button-group>
    
    <div>
      <div v-for="(item, index) in list">
        <my-overlays v-if="editorId !== item.id" :value="item.overlays" :map="map" :ref="'overlay-'+ item.id"></my-overlays>

        <el-button size="mini" type="text" @click="edit(item)">编辑</el-button>
        <el-button size="mini" type="text" @click="del(item, index)">删除</el-button>
        <el-link style="font-size: 12px;" @click="position(item.id)">{{ item.id }}</el-link>
      </div>
    </div>

  </div>
</template>

<script>
import guid from 'lhp-amap/src/units/guid'
export default {
  components: {
    MyEditor: () => import('./components/editor'),
    MyOverlays: () => import('./components/overlays')
  },
  data() {
    return {
      map: window.$$amap,
      list: [],
      editorInfo: [],
      editorId: undefined,
      isEdit: false,
      editType: undefined
    }
  },
  methods: {
    position(id) {
      let _ref = this.$refs['overlay-'+ id][0]
      if(!_ref) return
      this.map.setFitView(_ref.features)
    },
    del(item, index) {
      if(this.editorId === item.id) this.close()
      this.$delete(this.list, index)
    },
    edit(item) {
      this.close()
      this.isEdit = true
      this.editType = 'editor'
      this.editorInfo = item.overlays
      this.editorId = item.id
    },
    add() {
      this.close()
      this.isEdit = true
      this.editType = 'add'
    },
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
      let data = this.$refs.editor.submit()
      if(data.length < 1) {
        this.$message.error('请至少绘制一个覆盖物！')
        return
      }
      if(this.editType === 'add') {
        this.list.push({
          id: guid(),
          overlays: data.map(e => {
            return Object.assign({}, e.extData, e.params)
          })
        })
      } else if(this.editType === 'editor') {
        let index = this.list.findIndex(e => e.id === this.editorId)
        this.$set(this.list, index, {
          id: this.editorId,
          overlays: data.map(e => {
            return Object.assign({}, e.extData, e.params)
          })
        })
      }
      this.close()
    },
    close() {
      this.isEdit = false
      this.editorId = undefined
      this.editType = undefined
      this.editorInfo = []
      this.$lhpamap.draw.close()
    }
  },
  destroyed() {
    this.close()
  }
};
</script>
