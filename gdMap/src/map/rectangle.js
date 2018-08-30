import { extend } from './public.js'
import feature from './feature.js'

const newFeature = function (params = {}) {
    if (!params[this.boundsKey]) {
        return false
    }
    const item = new AMap.Rectangle(extend({}, this.default, (params.default || {}))) // eslint-disable-line
    let southWest = []
    let northEast = []
    if (params[this.boundsKey][0][0] > params[this.boundsKey][1][0]) {
        southWest.push(params[this.boundsKey][1][0])
        northEast.push(params[this.boundsKey][0][0])
    } else {
        southWest.push(params[this.boundsKey][0][0])
        northEast.push(params[this.boundsKey][1][0])
    }
    if (params[this.boundsKey][0][1] > params[this.boundsKey][1][1]) {
        southWest.push(params[this.boundsKey][1][1])
        northEast.push(params[this.boundsKey][0][1])
    } else {
        southWest.push(params[this.boundsKey][0][1])
        northEast.push(params[this.boundsKey][1][1])
    }
    item.setBounds(new AMap.Bounds(southWest, northEast))
    return item
}

const editor = function (item) {
    this.map.plugin(["AMap.RectangleEditor"],() => {
        if (this.editorObj === item) return false
        this.editorClose()
        this.editorFeature = item
        this.editorObj = this.add(item.params)
        this.editorObj.setDraggable(true)
        this.polylineEditor = new AMap.RectangleEditor(this.map, this.editorObj)
        this.polylineEditor.open()
        this.editorFeature.hide()
        this.map.on('rightclick', this.editorClose, this)
    })
}

const editorClose = function () {
    if (this.editorObj) {
        const path = this.editorObj.getBounds()
        const southWest = path.getSouthWest()
        const northEast = path.getNorthEast()
        this.editorFeature.params[this.boundsKey] = [[southWest.lng, southWest.lat], [northEast.lng, northEast.lat]]
        this.editorFeature.show()
        this.editorFeature.setBounds(path)
        this.polylineEditor.close()
        this.editorObj.setMap(null)
        const idx = this.data.indexOf(this.editorObj)
        this.data.splice(idx, 1)
        this.editorObj = null
        this.map.off('rightclick', this.editorClose, this)
    }
}

const Rectangle = function (obj = {}) {
    this.boundsKey = 'bounds'
    this.init(obj)
}

const defaults = {}

Rectangle.prototype = extend({}, feature)
Rectangle.prototype.newFeature = newFeature
Rectangle.prototype.default = defaults

export {Rectangle, newFeature, editor, editorClose, defaults}
