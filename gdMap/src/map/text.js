import { extend } from './public.js'
import feature from './feature.js'
import { editor, editorClose } from './marker.js'

const newFeature = function (params = {}) {
    if (!params[this.positionKey]) {
        return false
    }
    const item = new AMap.Text(extend({}, this.default, (params.default || {}))) // eslint-disable-line
    item.setPosition(params[this.positionKey])
    item.setText(params[this.textKey])
    return item
}

const Text = function (obj = {}) {
    this.textKey = 'text'
    this.positionKey = 'position'
    this.init(obj)

    if (this.isEditor) {
        this.editor = editor
        this.editorClose = editorClose
    }
}

const defaults = {}

Text.prototype = extend({}, feature)
Text.prototype.newFeature = newFeature
Text.prototype.default = defaults

export {Text, newFeature, editor, editorClose, defaultsa}
