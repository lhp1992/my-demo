import Marker from './src/main.vue';

Marker.install = function (Vue) {
  Vue.component(Marker.name, Marker);
}

export default Marker;