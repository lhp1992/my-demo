<template>
  <div class="toggle-box">
    <my-feature :onclick="onclick" :onload="onload" :map="map"></my-feature>

    <div class="toggle-list" :id="idKey + '-list'" v-if="!isopen">
      <div :class="activeId == item.id ? 'active list-item' : 'list-item'" v-for="(item, index) in list" :id="idKey + item.id">
        <div>坐标：{{item.center}}</div>
        <div>ID：{{item.id}}</div>
        <div>c：{{item.center}}</div>
        <div>
          <el-button type="text" @click="edit(item)">编辑</el-button>
          <el-button type="text" @click="ondel(item, index)">删除</el-button>
        </div>
      </div>
    </div>

    <el-form v-else ref="form" :model="form" label-width="80px" style="padding: 15px">
      <el-form-item label="编号">
        <el-input v-model="form.id" readonly></el-input>
      </el-form-item>
      <el-form-item label="经纬度">
        <el-col :span="11">
          <el-input v-model="form.center[0]" readonly></el-input>
        </el-col>
        <el-col class="line" :span="2">&nbsp;</el-col>
        <el-col :span="11">
          <el-input v-model="form.center[1]" readonly></el-input>
        </el-col>
        <p style="color: red">* 地图上拖动目标来改变位置</p>
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
    'my-feature': () => import('./map-feature/marker')
  },
  data() {
    return {
      idKey: 'marker',
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
    },
    onsubmit() {
      this.list.forEach((item, index) => {
        if (item.id == this.form.id) {
          this.$set(this.list, index, { ...this.form })
        }
      })
      var feature = this.features.getById(this.form.id)
      feature.params = this.form
      feature.setPosition(this.form.center)
      this.onback()
    },
    goAnchor(selector) {
      var anchor = this.$el.querySelector(selector)
      this.$el.querySelector('#'+ this.idKey + '-list').scrollTop = anchor.offsetTop
    },
    edit(item) {
      this.form = { ...item }
      this.isopen = true
      this.features.hideAll()
      this.feature = this.features.add({
        center: item.center,
        default: {
          draggable: true,
          cursor: 'pointer'
        }
      })
      this.feature.on('dragend', function () {
        var center = this.feature.getPosition()
        this.form.center = [center.lng, center.lat]
      }.bind(this))
    },
    ondel(item, index) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.features.delById(item.id)
        this.list.splice(index, 1)
      }).catch(() => {
      })
    }
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