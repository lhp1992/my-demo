import Layer from './src/main.vue';

Layer.install = function (Vue) {
  Vue.component(Layer.name, Layer);
}

export default Layer;