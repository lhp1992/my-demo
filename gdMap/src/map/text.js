import { extend } from './public.js'
import feature from './feature.js'

const textFeature = function (params = {}) {
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
}

Text.prototype = extend({}, feature)
Text.prototype.newFeature = textFeature
Text.prototype.default = {}

export {Text, textFeature}
