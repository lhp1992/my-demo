import { extend } from './public.js'
import feature from './feature.js'
import { markerFeature } from './marker.js'
import { polygonFeature } from './polygon.js'
import { polylineFeature } from './polyline.js'
import { circleFeature } from './circle.js'
import { textFeature } from './text.js'

const OverlayGroup = function (obj = {}) {
    this.contentKey = 'content'
    this.positionKey = 'position'
    this.centerKey = 'center'
    this.radiusKey = 'radius'
    this.pathKey = 'path'
    this.typeKey = 'type'
    this.textKey = 'text'
    this.init(obj)
}

OverlayGroup.prototype = extend({}, feature)
OverlayGroup.prototype.newFeature = function (params) {
    let object = null
    switch (params[this.typeKey]) {
    case 'marker':
        object = markerFeature.bind(this)(params)
        break
    case 'polygon':
        object = polygonFeature.bind(this)(params)
        break
    case 'polyline':
        object = polylineFeature.bind(this)(params)
        break
    case 'circle':
        object = circleFeature.bind(this)(params)
        break
    case 'text':
        object = textFeature.bind(this)(params)
        break
    }
    return object
}
OverlayGroup.prototype.default = {}

export default OverlayGroup
