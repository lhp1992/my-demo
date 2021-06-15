<template>
  <el-menu>
    <router-link v-for="menu in menus" :to="menu.path" :key="menu.path">
      <el-menu-item :index="menu.path">
        {{ menu.name }}
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<script>
import { router } from '@/config'
export default {
  data() {
    return {
      menus: router
    }
  }
};
</script>