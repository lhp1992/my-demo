import { map } from './map.js'
import { extend } from './public.js'
import { Marker } from './marker.js'

const markerClusterer = function (obj = {}) {

    obj.default && (obj.default = extend(this.default, obj.default))
    if (obj.markerDefault) {
        delete obj.default
        obj.default = obj.markerDefault
    }

    this.map = obj.map || map

    let object
    
    this.map.plugin(["AMap.MarkerClusterer"],() => {
        object = new AMap.MarkerClusterer((obj.map || map), [], this.default) // eslint-disable-line
    })

    object.add = function (params) {
        var item = this.markers.add(params)
        this.addMarker(item)
    }

    object.remove = function () {
        this.clearMarkers()
        this.markers.remove()
    }

    object.load = function (data) {
        this.markers.load(data)
        this.setMarkers(this.markers.data)
    }

    object.getById = function (id) {
        return this.markers.getById(id)
    }

    object.delById = function (id) {
        var item = this.markers.getById(id)
        this.removeMarker(item)
        this.markers.delById(id)
    }

    object.markers = new Marker(extend({}, obj, {
        isShow: false
    }))
    return object
}

markerClusterer.prototype.default = {}

export default markerClusterer
