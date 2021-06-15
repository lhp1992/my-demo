<template>
  <div class="layout-box">
    <layout-menu class="layout-menu"></layout-menu>

    <div class="map-bar">
      <lhp-amap>
        <router-view/>
      </lhp-amap>
    </div>
  </div>
</template>

<script>
import LayoutMenu from './components/menu'
export default {
  components: {
    LayoutMenu
  }
};
</script>

<style>
  .layout-fixed-box {
    position: fixed;
    right: 12px;
    top: 12px;
    z-index: 9;
  }
  .layout-info-box {
    padding: 12px 16px;
    border-radius: 3px;
    background-color: white;
    width: auto;
    min-width: 220px;
    border-width: 0;
    box-shadow: 0 2px 6px 0 rgb(114 124 245 / 50%);
  }
</style>

<style scoped>
  .layout-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
  }
  .layout-menu {
    width: 320px;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .map-bar {
    flex: 1;
    height: 100%;
  }
</style>
