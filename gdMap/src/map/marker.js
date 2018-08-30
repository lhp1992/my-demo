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
    this.editorClose()
    this.editorFeature = item
    this.editorObj = this.add(item.params)
    this.editorObj.setDraggable(true)
    this.editorFeature.hide()
    this.map.on('rightclick', this.editorClose, this)
}

const editorClose = function () {
    if (this.editorObj) {
        const position = this.editorObj.getPosition()
        this.editorFeature.params[this.positionKey] = [position.lng, position.lat]
        this.editorFeature.setPosition(position)
        this.editorFeature.show()
        this.editorObj.setMap(null)
        const idx = this.data.indexOf(this.editorObj)
        this.data.splice(idx, 1)
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
