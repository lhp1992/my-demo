import Polygon from './src/main.vue';

Polygon.install = function (Vue) {
  Vue.component(Polygon.name, Polygon);
}

export default Polygon;