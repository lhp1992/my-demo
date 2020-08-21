<template>
	<loginbar />
</template>

<script>
import Login from '@/page/login'

export default {
  components: {
    'loginbar': Login
  },
};
</script>

<style>
  @import '../../public/css/base.css';
  body {
    background-color: #e8edf4;
  }
</style>