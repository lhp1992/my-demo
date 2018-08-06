import { extend } from './public.js'
import feature from './feature.js'

const polygonFeature = function (params = {}) {
    if (!params[this.pathKey]) {
        return false
    }
    const item = new AMap.Polygon(extend({}, this.default, (params.default || {}))) // eslint-disable-line
    item.setPath(params[this.pathKey])
    return item
}

const Polygon = function (obj = {}) {
    this.pathKey = 'path'
    this.init(obj)
}

Polygon.prototype = extend({}, feature)
Polygon.prototype.newFeature = polygonFeature
Polygon.prototype.default = {}

export {Polygon, polygonFeature}
