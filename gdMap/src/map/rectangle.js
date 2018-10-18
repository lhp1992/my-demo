import { extend, isArray } from './public.js'
import feature from './feature.js'

const newFeature = function (params = {}) {
    if (!params[this.boundsKey]) {
        return false
    }
    const item = new AMap.Rectangle(extend({}, this.default, (params.default || {}))) // eslint-disable-line
    let _bounds = params[this.boundsKey]
    if (isArray(_bounds)) {
        let southWest = []
        let northEast = []
        if (_bounds[0][0] > _bounds[1][0]) {
            southWest.push(_bounds[1][0])
            northEast.push(_bounds[0][0])
        } else {
            southWest.push(_bounds[0][0])
            northEast.push(_bounds[1][0])
        }
        if (_bounds[0][1] > _bounds[1][1]) {
            southWest.push(_bounds[1][1])
            northEast.push(_bounds[0][1])
        } else {
            southWest.push(_bounds[0][1])
            northEast.push(_bounds[1][1])
        }
        item.setBounds(new AMap.Bounds(southWest, northEast))
    } else {
        item.setBounds(_bounds)
    }
    return item
}

const editor = function (item) {
    this.map.plugin(["AMap.RectangleEditor"],() => {
        if (this.editorObj === item) return false
        if (!this.notEditorClose) {
            this.editorClose()
            this.map.on('rightclick', this.editorClose, this)
        }
        this.editorObj = item
        this.editorObj.setDraggable(true)
        this.editorFeature = new AMap.RectangleEditor(this.map, this.editorObj)
        item.editorFeature = this.editorFeature
        this.editorFeature.open()
    })
}

const editorClose = function () {
    if (this.editorObj) {
        const path = this.editorObj.getBounds()
        const southWest = path.getSouthWest()
        const northEast = path.getNorthEast()
        this.editorObj.params[this.boundsKey] = [[southWest.lng, southWest.lat], [northEast.lng, northEast.lat]]
        this.editorFeature.close()
        this.editorObj.setDraggable(false)
        this.editorObj.editorFeature = null
        delete this.editorObj.editorFeature
        this.editorObj = null
        this.map.off('rightclick', this.editorClose, this)
    }
}

const Rectangle = function (obj = {}) {
    this.boundsKey = 'bounds'
    this.init(obj)

    if (this.isEditor) {
        this.editor = editor
        this.editorClose = editorClose
    }
}

const defaults = {}

Rectangle.prototype = extend({}, feature)
Rectangle.prototype.newFeature = newFeature
Rectangle.prototype.default = defaults

export {Rectangle, newFeature, editor, editorClose, defaults}
