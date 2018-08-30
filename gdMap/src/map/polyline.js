import { extend } from './public.js'
import feature from './feature.js'
import { editor, editorClose } from './polygon.js'

const newFeature = function (params = {}) {
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

    if (this.isEditor) {
        this.editor = editor
        this.editorClose = editorClose
    }
}

const defaults = {}

Polyline.prototype = extend({}, feature)
Polyline.prototype.newFeature = newFeature
Polyline.prototype.default = defaults

export {Polyline, newFeature, editor, editorClose, defaults}
