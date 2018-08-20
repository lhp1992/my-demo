import { extend } from './public.js'
import feature from './feature.js'

const polylineFeature = function (params = {}) {
    if (!params[this.pathKey]) {
        return false
    }
    const item = new AMap.Polyline(extend({}, this.default, (params.default || {}))) // eslint-disable-line
    item.setPath(params[this.pathKey])
    return item
}

const Polyline = function (obj = {}) {
    this.pathKey = 'path'
    this.init(obj)
}

Polyline.prototype = extend({}, feature)
Polyline.prototype.newFeature = polylineFeature
Polyline.prototype.default = {}

export {Polyline, polylineFeature}
