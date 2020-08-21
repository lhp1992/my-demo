<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view class="app-content" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain'
};
</script>

<style scoped>
.app-main {
  height: 100%;
  width: 100%;
  position: relative;
  padding: 10px;
}
.app-content{
  min-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #fff;
}
</style>