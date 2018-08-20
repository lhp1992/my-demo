import { extend } from './public.js'
import { map } from './map.js'

const GeoJSON = function (obj = {}) {
    this.ifText = true
    for (const key in obj) {
        this[key] = obj[key]
    }
    !this.map && (this.map = map)
    this.texts = []
    this.isTextShow = true
}

GeoJSON.prototype.textDefault = {}
GeoJSON.prototype.polygonDefault = {}

GeoJSON.prototype.load = function (json) {
    this.remove()
    this.texts.length = 0
    const _this = this
    const geojson = new AMap.GeoJSON({ // eslint-disable-line
        geoJSON: json,
        'getPolygon': function (geojson, lnglats) {
            _this.onAdd && _this.onAdd(geojson, lnglats)
            if (_this.ifText) {
                _this.texts.push(new AMap.Text(extend({}, _this.textDefault, { // eslint-disable-line
                    text: geojson.properties.name,
                    position: geojson.properties.cp
                })))
            }
            return new AMap.Polygon(extend({}, _this.textDefault, { // eslint-disable-line
                path: lnglats
            }))
        }
    })
    geojson.addOverlays(this.texts)
    geojson.setMap(this.map)
    this.geojson = geojson
}

GeoJSON.prototype.remove = function () {
    this.geojson && this.geojson.clearOverlays()
}

GeoJSON.prototype.showText = function () {
    if (this.isTextShow) return false
    this.isTextShow = true
    this.geojson.addOverlays(this.texts)
}

GeoJSON.prototype.hideText = function () {
    if (!this.isTextShow) return false
    this.isTextShow = false
    this.geojson.removeOverlays(this.texts)
}

export default GeoJSON
