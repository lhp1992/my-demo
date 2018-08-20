import { extend } from './public.js'
import feature from './feature.js'

const circleFeature = function (params = {}) {
    if (!params[this.centerKey] || !params[this.radiusKey]) {
        return false
    }
    const item = new AMap.Circle(extend({}, this.default, (params.default || {}))) // eslint-disable-line
    item.setCenter(params[this.centerKey])
    item.setRadius(params[this.radiusKey])
    return item
}

const Circle = function (obj = {}) {
    this.centerKey = 'center'
    this.radiusKey = 'radius'
    this.init(obj)
}

Circle.prototype = extend({}, feature)
Circle.prototype.newFeature = circleFeature
Circle.prototype.default = {}

export {Circle, circleFeature}
