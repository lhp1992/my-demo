<template>
  <div
    id="app"
    v-loading="$state.waiting"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <router-view />
  </div>
</template>

<style>
  @import '../../public/css/base.css';
</style>