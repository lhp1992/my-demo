<template>
  <div class="toggle-box">
    <my-feature :onclick="onclick" :onload="onload" :map="map"></my-feature>

    <div class="toggle-list" :id="idKey + '-list'" v-if="!isopen">
      <div :class="activeId == item.id ? 'active list-item' : 'list-item'" v-for="item in list" :id="idKey + item.id">
        <div>坐标：{{item.path}}</div>
        <div>ID：{{item.id}}</div>
        <div>
          <el-button type="text" @click="edit(item)">编辑</el-button>
          <el-button type="text">删除</el-button>
        </div>
      </div>
    </div>

    <el-form v-else ref="form" :model="form" label-width="80px" style="padding: 15px">
      <el-form-item label="编号">
        <el-input v-model="form.id" readonly></el-input>
      </el-form-item>
      <el-form-item label="经纬度">
        <!-- <el-input v-model="form.path" readonly></el-input> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onsubmit">保存</el-button>
        <el-button @click="onback">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  components: {
    'my-feature': () => import('./map-feature/polyline')
  },
  data() {
    return {
      idKey: 'polyline',
      list: [],
      isopen: false,
      form: null,
      features: null,
      activeId: null,
      feature: null
    }
  },
  props: ['map'],
  methods: {
    onload(e) {
      this.list = e.data
      this.features = e.features
    },
    onclick(e) {
      this.activeId = e.params.id
      this.goAnchor('#'+ this.idKey + e.params.id)
    },
    onback() {
      this.isopen = false
      this.feature.del()
      this.features.showAll()
      this.editor.close()
    },
    onsubmit() {
      this.list.forEach((item, index) => {
        if (item.id == this.form.id) {
          var path = this.feature.getPath()
          this.form.path = path
          this.$set(this.list, index, JSON.parse(JSON.stringify(this.form)))
        }
      })
      var feature = this.features.getById(this.form.id)
      feature.params = this.form
      feature.setPath(this.form.path)
      this.onback()
    },
    goAnchor(selector) {
      var anchor = this.$el.querySelector(selector)
      if (!anchor) {
        return false
      }
      this.$el.querySelector('#'+ this.idKey + '-list').scrollTop = anchor.offsetTop
    },
    edit(item) {
      this.form = JSON.parse(JSON.stringify(item))
      this.isopen = true
      this.features.hideAll()
      this.feature = this.features.add({
        path: this.features.getById(item.id).getPath(),
        default: {
          draggable: true,
          cursor: 'pointer'
        }
      })
      this.editor = new AMap.PolyEditor(this.map, this.feature)
      this.editor.open()
    }
  },
  destroyed () {
    this.editor && this.editor.close()
  },
  created () {
    this.map.plugin(["AMap.PolyEditor"])
  }
}
</script>

<style scoped>
  .toggle-box{
    width: 400px;
    height: 100%;
    border-left: 1px solid #ddd;
    background-color: #fff;
    position: absolute;
    right: 0;
    top: 0;
  }
  .toggle-list{
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #fff
  }
  .list-item{
    padding: 10px 15px 0;
    border-bottom: 1px solid #e8e8e8;
  }
  .list-item.active{
    background-color: #ecf5ff;
  }
</style>