import { extend } from './public.js'
import feature from './feature.js'

const newFeature = function (params = {}) {
    if (!params[this.centerKey] || !params[this.radiusKey]) {
        return false
    }
    const item = new AMap.Circle(extend({}, this.default, (params.default || {}))) // eslint-disable-line
    item.setCenter(params[this.centerKey])
    item.setRadius(params[this.radiusKey])
    return item
}

const editor = function (item) {
    this.map.plugin(["AMap.CircleEditor"],() => {
        if (this.editorObj === item) return false
        if (!this.notEditorClose) {
            this.editorClose()
            this.map.on('rightclick', this.editorClose, this)
        }
        this.editorObj = item
        this.editorFeature = new AMap.CircleEditor(this.map, this.editorObj)
        item.editorFeature = this.editorFeature
        this.editorFeature.open()
    })
}

const editorClose = function () {
    if (this.editorObj) {
        const radius = this.editorObj.getRadius()
        const center = this.editorObj.getCenter()
        this.editorObj.params[this.centerKey] = [center.lng, center.lat]
        this.editorObj.params[this.radiusKey] = radius
        this.editorFeature.close()
        this.editorObj.editorFeature = null
        delete this.editorObj.editorFeature
        this.editorObj = null
        this.map.off('rightclick', this.editorClose, this)
    }
}

const Circle = function (obj = {}) {
    this.centerKey = 'center'
    this.radiusKey = 'radius'
    this.init(obj)

    if (this.isEditor) {
        this.editor = editor
        this.editorClose = editorClose
    }
}

const defaults = {}

Circle.prototype = extend({}, feature)
Circle.prototype.newFeature = newFeature
Circle.prototype.default = defaults

export {Circle, newFeature, editor, editorClose, defaults}
