import Map from './src/main.vue';

Map.install = function (Vue) {
  Vue.component(Map.name, Map);
}

export default Map;