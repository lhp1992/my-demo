<template>
  <div>
    <component v-bind:is="component" ref="child" :item="list[activeId]" :map="map"></component>
    
    <div class="toggle-box">

      <div class="toggle-list" v-if="component === 'driving'">
        <el-button @click="href(null, null)">返回</el-button>
        <div id="panel"></div>
      </div>

      <div class="toggle-list" v-else-if="component === 'dragroute' || component === 'dragroute-add'">
        <el-button @click="href(null, null)">返回</el-button>
        <el-button @click="submit">保存</el-button>
      </div>

      <div class="toggle-list" v-else>
        <div class="list-item" v-for="(item, index) in list">
          <div>{{ item.route }}</div>
          <div>{{ item.time }}({{ item.distance }})</div>
          <div>
            <el-button type="text" @click="href('driving', index)">查看</el-button>
            <el-button type="text" @click="href('dragroute', index)">编辑</el-button>
            <el-button type="text" @click="ondel(index)">删除</el-button>
          </div>
        </div>
        
        <el-button @click="href('dragroute-add', null)">新增</el-button>
      </div>



    </div>
  </div>
</template>

<script>
export default {
  components: {
    'driving': () => import('./map-feature/driving'),
    'dragroute': () => import('./map-feature/dragroute'),
    'dragroute-add': () => import('./dragroute-add')
  },
  data () {
    return {
      component: null,
      activeId: null,
      list: []
    }
  },
  props: ['map'],
  methods: {
    href(component, index) {
      this.component = component
      this.activeId = index
    },
    getInfo(data) {
      const routes = data.routes[0]
      const route = routes.steps.map(item => item.road).filter((item, index, arr) => item !== '' && (index === 0 || item !== arr[index - 1])).join('>')
      const distance = routes.distance < 1000 ? routes.distance + '米' : (routes.distance / 1000).toFixed(2) + '公里'
      const time = (routes.time < 60 * 60 ? '' : Math.floor(routes.time / 3600) + '小时') + Math.round(routes.time / 60) % 60 + '分钟'
      const start = [data.start.location.lng, data.start.location.lat]
      const end = [data.end.location.lng, data.end.location.lat]
      const waypoints = data.waypoints.map(item => [item.location.lng, item.location.lat])
      const path = [start, ...waypoints, end]
      return {
        route: route,
        distance: distance,
        time: time,
        start: start,
        end: end,
        waypoints: waypoints,
        path: path,
        policy: routes.policy
      }
    },
    submit() {
      const dr = this.$refs.child.submit()
      if (!dr) {
        this.$message.error('保存失败！');
        return false
      }
      this.activeId === null ? this.list.unshift(this.getInfo(dr)) : Object.assign(this.list[this.activeId], this.getInfo(dr))
      this.href(null, null)
    },
    ondel(index) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.list.splice(index, 1)
      }).catch(() => {
      })
    }
  },
  mounted () {
    this.$ajax.map.getDrivings({}, data => this.list = data)
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
