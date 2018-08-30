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
        this.editorClose()
        this.editorFeature = item
        this.editorObj = this.add(item.params)
        this.editorObj.setDraggable(true)
        this.polylineEditor = new AMap.CircleEditor(this.map, this.editorObj)
        this.polylineEditor.open()
        this.editorFeature.hide()
        this.map.on('rightclick', this.editorClose, this)
    })
}

const editorClose = function () {
    if (this.editorObj) {
        const radius = this.editorObj.getRadius()
        const center = this.editorObj.getCenter()
        this.editorFeature.params[this.centerKey] = [center.lng, center.lat]
        this.editorFeature.params[this.radiusKey] = radius
        this.editorFeature.setCenter(center)
        this.editorFeature.setRadius(radius)
        this.editorFeature.show()
        this.polylineEditor.close()
        this.editorObj.setMap(null)
        const idx = this.data.indexOf(this.editorObj)
        this.data.splice(idx, 1)
        this.editorObj = null
        this.map.off('rightclick', this.editorClose, this)
    }
}

const Circle = function (obj = {}) {
    this.centerKey = 'center'
    this.radiusKey = 'radius'
    this.init(obj)
}

const defaults = {}

Circle.prototype = extend({}, feature)
Circle.prototype.newFeature = newFeature
Circle.prototype.default = defaults

export {Circle, newFeature, editor, editorClose, defaults}
