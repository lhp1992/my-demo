import config from './packages/config'
import LhpAmap from './packages/map'
import LhpAmapMarker from './packages/marker'
import LhpAmapCluster from './packages/cluster'
import LhpAmapLayer from './packages/layer'
import LhpAmapLayerMass from './packages/layer-mass'
import LhpAmapText from './packages/text'
import LhpAmapPolyline from './packages/polyline'
import LhpAmapPolygon from './packages/polygon'
import LhpAmapCircle from './packages/circle'
import LhpAmapRectangle from './packages/rectangle'
import LhpAmapEditor from './packages/editor'
import LhpAmapPopover from './packages/popover'
import draw from './packages/draw'
import compute from './packages/compute'

const components = [
  LhpAmap,
  LhpAmapMarker,
  LhpAmapCluster,
  LhpAmapLayer,
  LhpAmapLayerMass,
  LhpAmapText,
  LhpAmapPolyline,
  LhpAmapPolygon,
  LhpAmapCircle,
  LhpAmapRectangle,
  LhpAmapEditor,
  LhpAmapPopover
];

const install = function (Vue, opt = {}) {
  if(!Vue.prototype.$lhpamap) Vue.prototype.$lhpamap = {}

  Vue.prototype.$lhpamap.config = config
  Vue.prototype.$lhpamap.draw = draw
  Vue.prototype.$lhpamap.compute = compute

  components.forEach(component => {
    Vue.component(component.name, component)
    Vue.use(component)
  });
};

export default {
  install,
  LhpAmap,
  LhpAmapMarker,
  LhpAmapCluster,
  LhpAmapLayer,
  LhpAmapLayerMass,
  LhpAmapText,
  LhpAmapPolyline,
  LhpAmapPolygon,
  LhpAmapCircle,
  LhpAmapRectangle,
  LhpAmapEditor,
  LhpAmapPopover
};