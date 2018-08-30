import { extend } from './public.js'
import feature from './feature.js'

const newFeature = function (params = {}) {
    if (!params[this.pathKey]) {
        return false
    }
    const item = new AMap.Polygon(extend({}, this.default, (params.default || {}))) // eslint-disable-line
    item.setPath(params[this.pathKey])
    return item
}

const editor = function (item) {
	this.map.plugin(["AMap.PolyEditor"],() => {
		if (this.editorObj === item) return false
	    this.editorClose()
	    this.editorFeature = item
	    this.editorObj = this.add(item.params)
	    this.editorObj.setDraggable(true)
	    this.polylineEditor = new AMap.PolyEditor(this.map, this.editorObj)
	    this.polylineEditor.open()
	    this.editorFeature.hide()
	    this.map.on('rightclick', this.editorClose, this)
	})
}

const editorClose = function () {
    if (this.editorObj) {
        const path = this.editorObj.getPath()
        this.editorFeature.params[this.pathKey] = path.map(position => [position.lng, position.lat])
        this.editorFeature.show()
        this.editorFeature.setPath(path)
        this.polylineEditor.close()
        this.editorObj.setMap(null)
        const idx = this.data.indexOf(this.editorObj)
        this.data.splice(idx, 1)
        this.editorObj = null
        this.map.off('rightclick', this.editorClose, this)
    }
}

const Polygon = function (obj = {}) {
    this.pathKey = 'path'
    this.init(obj)

    if (this.isEditor) {
        this.editor = editor
        this.editorClose = editorClose
    }
}

const defaults = {}

Polygon.prototype = extend({}, feature)
Polygon.prototype.newFeature = newFeature
Polygon.prototype.default = defaults

export {Polygon, newFeature, editor, editorClose, defaults}
