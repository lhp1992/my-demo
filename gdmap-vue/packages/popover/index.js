import Popover from './src/main.vue';
import $popover from './src/main.js';

Popover.install = function (Vue) {
  if(!Vue.prototype.$lhpamap) Vue.prototype.$lhpamap = {}
  Vue.prototype.$lhpamap.popover = $popover;
  Vue.component(Popover.name, Popover);
}

export default Popover;