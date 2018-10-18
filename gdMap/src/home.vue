<template>
  <my-map>
    <template slot-scope="{ tomap }">
      <router-view v-if="tomap" :map="tomap"></router-view>
    </template>
  </my-map>
</template>
<script>
import map from './components/map'
export default {
  name: 'home',
  components: {
    'my-map': map
  }
}
</script>
