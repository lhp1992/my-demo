import Text from './src/main.vue';

Text.install = function (Vue) {
  Vue.component(Text.name, Text);
}

export default Text;