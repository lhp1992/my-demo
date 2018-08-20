import { extend } from './public.js'
import { map } from './map.js'

const options = {
    data: [],
    runData: [],
    timeout: null,
    rate: 20,
    isPaly: false,
    index: 0,
    markerDefault: {},
    polylineDefault: {}
}

const Playback = function (obj = {}) {
    const opt = extend({}, options, obj)
    for (const key in opt) {
        this[key] = opt[key]
    }
    !this.map && (this.map = map)
}

Playback.prototype.setData = function (data = []) {
    if (data.length < 1) return false
    if (this.marker || this.polyline || this.passedPolyline) {
        this.remove()
    }
    this.data = data
    this.runData.length = 0
    data[0].timestamp = new Date(data[0].time).getTime()
    for (let i = 1, len = data.length; i < len; i++) {
        data[i].timestamp = new Date(data[i].time).getTime()
        if (data[i - 1].position !== data[i].position) {
            const time = data[i].timestamp - data[i - 1].timestamp
            const distance = AMap.GeometryUtil.distance(data[i - 1].position, data[i].position) // eslint-disable-line
            const speed = distance / time * 3600
            data[i - 1].speed = speed
        }
    }

    this.marker = new AMap.Marker(extend({}, this.markerDefault, { // eslint-disable-line
        position: data[0].position,
        map: this.map,
        autoRotation: true
    }))
    this.polyline = new AMap.Polyline(extend({}, this.polylineDefault, { // eslint-disable-line
        map: this.map
    }))
    this.passedPolyline = new AMap.Polyline(extend({}, this.polylineDefault, { // eslint-disable-line
        map: this.map
    }))
    const _this = this
    this.marker.on('moving', function (e) {
        _this.passedPolyline.setPath([_this.startPosition, e.passedPath[1]])
    })
    this.marker.on('moveend', function (e) {
        _this.index++
        _this.start(_this.index)
    })
    this.isPaly = true
    this.start()
}

Playback.prototype.getPath = function (index) {
    const path = []
    path.push(this.data[0].position)
    for (let i = 0; i < index; i++) {
        path.push(this.data[i + 1].position)
    }
    return path
}

Playback.prototype.start = function (index = 0) {
    const start = this.data[index]
    const end = this.data[index + 1]
    const _this = this
    this.onStart && this.onStart({
        index: index,
        speed: start.speed || 0
    })
    if (!end) {
        // console.log('播放完毕！')
        return false
    }
    this.index = index
    if (!start.speed) {
        this.timeout = setTimeout(function () {
            clearTimeout(_this.timeout)
            _this.index++
            _this.start(_this.index)
        }, (end.timestamp - start.timestamp) / this.rate)
    } else {
        const path = this.getPath(index)
        this.startPosition = start.position
        this.polyline.setPath(path)
        this.marker.setPosition(start.position)
        this.marker.moveTo(end.position, start.speed * this.rate)
    }
}

Playback.prototype.pause = function () {
    if (!this.isPaly) return false
    this.isPaly = false
    const start = this.data[this.index]
    if (!start.speed) {
        clearTimeout(this.timeout)
    } else {
        this.marker.pauseMove()
    }
}

Playback.prototype.play = function () {
    if (this.isPaly) return false
    this.isPaly = true
    const start = this.data[this.index]
    if (!start.speed) {
        this.start(this.index)
    } else {
        this.marker.resumeMove()
    }
}

Playback.prototype.reload = function (index) {
    this.index = index
    this.marker.stopMove()
    clearTimeout(this.timeout)
    this.passedPolyline.setPath([])
    const path = this.getPath(index)
    this.polyline.setPath(path)
    this.marker.setPosition(path[path.length - 1])
    this.start(index)
    this.isPaly = true
}

Playback.prototype.remove = function () {
    this.marker.stopMove()
    this.marker.setMap(null)
    this.marker = null
    this.polyline.setMap(null)
    this.polyline = null
    this.passedPolyline.setMap(null)
    this.passedPolyline = null
}

export default Playback
