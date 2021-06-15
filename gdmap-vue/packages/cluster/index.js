import Cluster from './src/main.vue';

Cluster.install = function (Vue) {
  Vue.component(Cluster.name, Cluster);
}

export default Cluster;