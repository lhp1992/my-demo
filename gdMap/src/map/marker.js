import { extend } from './public.js'
import feature from './feature.js'

const newFeature = function (params = {}) {
    if (!params[this.positionKey]) {
        return false
    }
    const item = new AMap.Marker(extend({}, this.default, (params.default || {}))) // eslint-disable-line
    item.setPosition(params[this.positionKey])
    params[this.contentKey] && item.setContent(params[this.contentKey])
    return item
}

const editor = function (item) {
    if (this.editorObj === item) return false
    if (!this.notEditorClose) {
        this.editorClose()
        this.map.on('rightclick', this.editorClose, this)
    }
    this.editorObj = item
    this.editorObj.setDraggable(true)
}

const editorClose = function () {
    if (this.editorObj) {
        const position = this.editorObj.getPosition()
        this.editorObj.params[this.positionKey] = [position.lng, position.lat]
        this.editorObj.setDraggable(false)
        this.editorObj = null
        this.map.off('rightclick', this.editorClose, this)
    }
}

const Marker = function (obj = {}) {
    this.contentKey = 'content'
    this.positionKey = 'position'
    this.init(obj)

    if (this.isEditor) {
        this.editor = editor
        this.editorClose = editorClose
    }
}

const defaults = {}

Marker.prototype = extend({}, feature)
Marker.prototype.newFeature = newFeature
Marker.prototype.default = defaults

export {Marker, newFeature, editor, editorClose, defaults}
