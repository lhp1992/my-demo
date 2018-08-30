import { extend } from './public.js'
import feature from './feature.js'
import * as marker from './marker.js'
import * as polygon from './polygon.js'
import * as polyline from './polyline.js'
import * as circle from './circle.js'
import * as text from './text.js'
import * as rectangle from './rectangle.js'

const getObj = function (type) {
    switch (type) {
    case 'marker':
        return marker
    case 'polygon':
        return polygon
    case 'polyline':
        return polyline
    case 'circle':
        return circle
    case 'text':
        return text
    case 'rectangle':
        return rectangle
    }
}

const editor = function (item) {
    getObj(item.params[this.typeKey]).editor.bind(this)(item)
}

const editorClose = function () {
    if (this.editorObj) {
        getObj(this.editorObj.params[this.typeKey]).editorClose.bind(this)()
    }
}

const OverlayGroup = function (obj = {}) {
    this.contentKey = 'content'
    this.positionKey = 'position'
    this.centerKey = 'center'
    this.radiusKey = 'radius'
    this.pathKey = 'path'
    this.typeKey = 'type'
    this.textKey = 'text'
    this.boundsKey = 'bounds'
    this.init(obj)

    if (this.isEditor) {
        this.editor = editor
        this.editorClose = editorClose
    }
}

OverlayGroup.prototype = extend({}, feature)
OverlayGroup.prototype.newFeature = function (params) {
    const object = getObj(params[this.typeKey])
    this.default = extend({}, object.defaults, this.defaults['all'] || {}, this.defaults[params[this.typeKey]] || {})
    return object.newFeature.bind(this)(params)
}
OverlayGroup.prototype.defaults = {}

export default OverlayGroup
