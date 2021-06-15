import Rectangle from './src/main.vue';

Rectangle.install = function (Vue) {
  Vue.component(Rectangle.name, Rectangle);
}

export default Rectangle;