<template>
  <div style="width: 100%; height: 100%;">
    <div style="width: 50%; height: 50%; float: left;">
      <my-map>
        <template slot-scope="{ tomap }">
          <my-map1 v-if="tomap" :map="tomap"></my-map1>
        </template>
      </my-map>
    </div>
    <div style="width: 50%; height: 50%; float: left;">
      <my-map>
        <template slot-scope="{ tomap }">
          <my-map2 v-if="tomap" :map="tomap"></my-map2>
        </template>
      </my-map>
    </div>
    <div style="width: 50%; height: 50%; float: left;">
      <my-map>
        <template slot-scope="{ tomap }">
          <my-map3 v-if="tomap" :map="tomap"></my-map3>
        </template>
      </my-map>
    </div>
    <div style="width: 50%; height: 50%; float: left;">
      <my-map>
        <template slot-scope="{ tomap }">
          <my-map4 v-if="tomap" :map="tomap"></my-map4>
        </template>
      </my-map>
    </div>
  </div>
  
</template>
<script>
import map from './components/map'
export default {
  name: 'home',
  components: {
    'my-map': map,
    'my-map1': () => import('./components/playback-range'),
    'my-map2': () => import('./components/map-feature/overlaygroup'),
    'my-map3': () => import('./components/map-feature/polygon'),
    'my-map4': () => import('./components/map-feature/circle')
  },
  data() {
    return {
      docState: null,
      showMarker: false,
      showPolyline: false
    }
  }
}
</script>

<style scoped>
  .home-map{
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  .sidebar ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .sidebar li{
    margin: 5px 0;
  }
  .sidebar li>a{
    font-size: 13px;
    display: block;
    padding: 0 0 0 23px;
    text-decoration: none;
    margin-left: 0;
    color: #686868;
    line-height: 30px;
    padding-left: 35px;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .sidebar li.active>a{
    color: #15A3FA;
    background: #eef8ff;
    border-right: 4px solid #15A3FA;
  }
  .el-main{
    padding: 0;
  }
</style>

<style>
*{
  margin: 0;
  padding: 0;
}
body {
  font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-variant: tabular-nums;
  line-height: 1.5;
  color: #314659;
  font-size: 14px;
}
html, body{
  width: 100%;
  height: 100%;
}

.button-group {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 12px;
  padding: 10px;
}
.button-group .button {
  height: 28px;
  line-height: 28px;
  background-color: #0D9BF2;
  color: #FFF;
  border: 0;
  outline: none;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 3px;
  margin-bottom: 4px;
  cursor: pointer;
}
.slider-container{
  display: inline-block;
}
</style>
