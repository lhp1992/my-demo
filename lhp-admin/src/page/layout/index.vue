<template>
  <div class="app-wrapper clearfix">
    <navbar />
    <div class="main-container">
      <sidebar />
      <div class="app-container">
        <el-breadcrumb v-if="breadcrumb" style="padding: 10px 10px 0px;">
          <el-breadcrumb-item v-for="item in breadcrumb" :to="{ name: item.name }" :key="item.name">{{ item.title }}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="app-container-content">
          <app-main />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppMain from './components/AppMain'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

export default {
  components: {
    'sidebar': Sidebar,
    'app-main': AppMain,
    'navbar': Navbar
  },
  computed: {
    breadcrumb() {
      return this.$breadcrumbs[this.$route.name]
    }
  },
  created() {
  }
};
</script>

<style scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.main-container {
  height: calc(100% - 55px);
  transition: margin-left .28s;
  position: relative;
  display: flex;
}
.app-container{
  height: 100%;
  flex: 1;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  background-color: #e8edf4;
}
.app-container-content{
  flex: 1;
  overflow: hidden;
}
</style>