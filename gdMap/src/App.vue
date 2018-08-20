<template>
  <el-container class="home-map">
    <el-aside class="sidebar" width="200px">
      <ul>
        <li v-for="item in menu" :class="$route.path === item.src ? 'active' : ''">
          <router-link :to="item.src">{{ item.title }}</router-link>
        </li>
      </ul>
    </el-aside>
    <el-main>
      <my-map>
        <template slot-scope="{ tomap }">
          <router-view :map="tomap"></router-view>
        </template>
      </my-map>
    </el-main>
  </el-container>
</template>
<script>
import map from './components/map'
export default {
  name: 'home',
  components: {
    'my-map': map
  },
  data() {
    return {
      docState: null,
      showMarker: false,
      showPolyline: false,
      menu: [
        {
          title: '点标记',
          src: '/marker'
        }, {
          title: '点标记移动',
          src: '/marker-run'
        }, {
          title: '点聚合',
          src: '/markerclusterer'
        }, {
          title: '点聚合移动',
          src: '/markerclusterer-run'
        }, {
          title: '折线',
          src: '/polyline'
        }, {
          title: '多边形',
          src: '/polygon'
        }, {
          title: 'GeoJSON',
          src: '/geojson'
        }, {
          title: '圆形',
          src: '/circle'
        }, {
          title: '覆盖物集合',
          src: '/overlaygroup'
        }, {
          title: '自定义信息窗体',
          src: '/infowindowcustom'
        }, {
          title: '轨迹回放',
          src: '/playback'
        }, {
          title: '点标记编辑',
          src: '/marker-edit'
        }, {
          title: '折线编辑',
          src: '/polyline-edit'
        }, {
          title: '多边形编辑',
          src: '/polygon-edit'
        }, {
          title: '圆形编辑',
          src: '/circle-edit'
        }
      ]
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
.el-main{
  padding: 0;
}
</style>
