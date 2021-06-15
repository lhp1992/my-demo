import Circle from './src/main.vue';

Circle.install = function (Vue) {
  Vue.component(Circle.name, Circle);
}

export default Circle;