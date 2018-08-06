import { extend } from './public.js'
import feature from './feature.js'

const markerFeature = function (params = {}) {
    if (!params[this.positionKey]) {
        return false
    }
    const item = new AMap.Marker(extend({}, this.default, (params.default || {}))) // eslint-disable-line
    item.setPosition(params[this.positionKey])
    params[this.contentKey] && item.setContent(params[this.contentKey])
    return item
}

const Marker = function (obj = {}) {
    this.contentKey = 'content'
    this.positionKey = 'position'
    this.init(obj)
}

Marker.prototype = extend({}, feature)
Marker.prototype.newFeature = markerFeature
Marker.prototype.default = {}

export {Marker, markerFeature}
