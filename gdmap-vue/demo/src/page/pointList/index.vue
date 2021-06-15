<template>
  <div>
    <lhp-amap-layer ref="layer" v-model="list" :map="map" :unvisibleIds="unvisibleIds" :events="events" alone></lhp-amap-layer>

    <lhp-amap-editor-marker 
      ref="editorMarker"
      v-if="editorId" 
      :map="map"
      :position="editorInfo.position"
      :id="editorInfo.id"
      :ext-data="editorInfo"
    ></lhp-amap-editor-marker>

    <div class="layout-fixed-box">
      <el-button @click="add">add({{ this.list.length }})</el-button>
      <template v-if="editorId">
        <el-button @click="getParams">getParams</el-button>
        <el-button @click="handleSubmit">submit</el-button>
        <el-button @click="editorId = undefined">close</el-button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let points = this.$units.getPointList(15)
    return {
      events: {
        click: this.handleClick
      },
      list: points,
      map: window.$$amap,
      isRender: false,
      editorId: undefined
    }
  },
  computed: {
    unvisibleIds() {
      if(this.editorId) return [this.editorId]
      return undefined
    },
    editorInfo() {
      return this.list.find(e => e.id === this.editorId)
    }
  },
  methods: {
    handleClick({target}) {
      this.$lhpamap.popover.open({
        map: this.map, 
        position: target.getPosition(),
        data: target.getExtData(),
        options: {
          width: 320,
          title: '点标记弹出框',
          field: {id: 'id', name: '名称', position: '坐标'},
          buttons: [
            {
              text: '删除点标记',
              action: (data, vm) => {
                let index = this.list.findIndex(e => e.id === data.id)
                this.$delete(this.list, index)
              } 
            }, {
              text: '编辑点标记',
              action: (data, vm) => {
                this.editorId = data.id
                vm.close()
              }
            }
          ]
        }
      }, target)
    },
    add() {
      this.list.push(this.$units.getPointList(1)[0])
    },
    getParams() {
      console.log(this.$refs.editorMarker.getParams())
    },
    handleSubmit() {
      let target = this.$refs.editorMarker.getParams()
      this.editorInfo.position = target.params.position
      this.editorId = undefined
    }
  }
};
</script>