<template>
  <div class="sidebar-container">
    <div class="sidebar-switch" @click="isCollapse = !isCollapse">
      <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
    </div>
    <div class="sidebar-menu">
      <el-menu
        :default-active="activeMenu"
        mode="vertical"
        :collapse="isCollapse"
        background-color="#2a2e35"
        text-color="rgba(255, 255, 255, 0.8)"
        active-text-color="#ffd04b"
      >
        <sidebar-item v-for="item in list" :value="item" :key="item.name" />
      </el-menu>
    </div>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'
import config from '@/config'
let { menu: { slideMenu } } = config
export default {
  components: {
    'sidebar-item': SidebarItem
  },
  computed: {
    activeMenu() {
      const route = this.$route
      const { name } = route
      return name
    }
  },
  data() {
    return {
      list: slideMenu,
      isCollapse: false
    }
  }
};
</script>

<style scoped>
  .sidebar-container {
    background-color: #2a2e35;
    color: rgba(255, 255, 255, 0.8);
    transition: width 0.28s;
    height: 100%;
    overflow: hidden;
  }
  .sidebar-switch{
    text-align: center;
    height: 40px;
    line-height: 40px;
    background-color: #003666;
    cursor: pointer;
    font-size: 16px;
    color: rgba(255,255,255,0.6);
  }
  .sidebar-menu {
    height: calc(100% - 40px);
    overflow-y: auto
  }
  .sidebar-container .el-menu{
    border-right: none;
    width: 200px;
  }
  .sidebar-container .el-menu--collapse{
    width: 64px;
  }
  .sidebar-container .el-scrollbar__wrap{
    overflow-x: hidden;
    overflow-y: auto;
  }
  .sidebar-container .el-scrollbar,
  .sidebar-container .el-scrollbar__view,
  .sidebar-container .el-menu-vertical-demo {
    height: 100%;
  }
</style>