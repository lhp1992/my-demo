import { get, set } from 'lhp-amap/src/units/lodash'

let config = {
  default: {
    all: {
      cursor: 'pointer',
      strokeColor: "#1791fc",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#1791fc",
      fillOpacity: 0.35,
    },
    polyline: {
      lineJoin: 'round',
      lineCap: 'round'
    }
  },
  editor: {
    all: {
      fillColor: 'red',
      fillOpacity: 0.3,
      strokeOpacity: 1,
      strokeWeight: 3,
      strokeColor: 'red',
      strokeStyle: 'dashed'
    }
  }
}

export default {
  set(path, value) {
    return set(config, path, value)
  },
  get(path, defaultValue) {
    return get(config, path, defaultValue)
  },
  getOptions(type) {
    return Object.assign({}, this.get('default.all', {}), this.get('default.'+ type, {}))
  },
  getEditor(type) {
    return Object.assign({}, this.get('editor.all', {}), this.get('editor.'+ type, {}))
  }
}