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
	    if (!this.notEditorClose) {
            this.editorClose()
            this.map.on('rightclick', this.editorClose, this)
        }
	    this.editorObj = item
	    this.editorObj.setDraggable(true)
	    this.editorFeature = new AMap.PolyEditor(this.map, this.editorObj)
        item.editorFeature = this.editorFeature
	    this.editorFeature.open()
	})
}

const editorClose = function () {
    if (this.editorObj) {
        const path = this.editorObj.getPath()
        this.editorObj.params[this.pathKey] = path.map(position => [position.lng, position.lat])
        this.editorFeature.close()
        this.editorObj.setDraggable(false)
        this.editorObj.editorFeature = null
        delete this.editorObj.editorFeature
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
