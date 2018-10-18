import { infoWindow, map } from './map.js'

const getMoveShapes = function (speed, star, end) {
    var D2R=Math.PI/180;var R2D=180/Math.PI;var Coord=function(a,b){this.lon=a;this.lat=b;this.x=D2R*a;this.y=D2R*b};Coord.prototype.view=function(){return String(this.lon).slice(0,4)+','+String(this.lat).slice(0,4)};Coord.prototype.antipode=function(){var a=-1*this.lat;var b=(this.lon<0)?180+this.lon:(180-this.lon)*-1;return new Coord(b,a)};var LineString=function(){this.coords=[];this.length=0};LineString.prototype.move_to=function(a){this.length++;this.coords.push(a)};var Arc=function(a){this.properties=a||{};this.geometries=[]};Arc.prototype.json=function(){if(this.geometries.length<=0){return{'geometry':{'type':'LineString','coordinates':null},'type':'Feature','properties':this.properties}}else if(this.geometries.length==1){return{'geometry':{'type':'LineString','coordinates':this.geometries[0].coords},'type':'Feature','properties':this.properties}}else{var a=[];for(var i=0;i<this.geometries.length;i++){a.push(this.geometries[i].coords)};return{'geometry':{'type':'MultiLineString','coordinates':a},'type':'Feature','properties':this.properties}}};Arc.prototype.wkt=function(){var a='';var b='LINESTRING(';var d=function(c){b+=c[0]+' '+c[1]+','};for(var i=0;i<this.geometries.length;i++){if(this.geometries[i].coords.length===0){return'LINESTRING(empty)'}else{var e=this.geometries[i].coords;e.forEach(d);a+=b.substring(0,b.length-1)+')'}};return a};var GreatCircle=function(a,b,c){if(!a||a.x===undefined||a.y===undefined){throw new Error("GreatCircle constructor expects two args: start and end objects with x and y properties")};if(!b||b.x===undefined||b.y===undefined){throw new Error("GreatCircle constructor expects two args: start and end objects with x and y properties")};this.start=new Coord(a.x,a.y);this.end=new Coord(b.x,b.y);this.properties=c||{};var w=this.start.x-this.end.x;var h=this.start.y-this.end.y;var z=Math.pow(Math.sin(h/2.0),2)+Math.cos(this.start.y)*Math.cos(this.end.y)*Math.pow(Math.sin(w/2.0),2);this.g=2.0*Math.asin(Math.sqrt(z));if(this.g==Math.PI){throw new Error('it appears '+a.view()+' and '+b.view()+" are 'antipodal', e.g diametrically opposite, thus there is no single route but rather infinite")}else if(isNaN(this.g)){throw new Error('could not calculate great circle between '+a+' and '+b)}};GreatCircle.prototype.interpolate=function(f){var A=Math.sin((1-f)*this.g)/Math.sin(this.g);var B=Math.sin(f*this.g)/Math.sin(this.g);var x=A*Math.cos(this.start.y)*Math.cos(this.start.x)+B*Math.cos(this.end.y)*Math.cos(this.end.x);var y=A*Math.cos(this.start.y)*Math.sin(this.start.x)+B*Math.cos(this.end.y)*Math.sin(this.end.x);var z=A*Math.sin(this.start.y)+B*Math.sin(this.end.y);var a=R2D*Math.atan2(z,Math.sqrt(Math.pow(x,2)+Math.pow(y,2)));var b=R2D*Math.atan2(y,x);return[b,a]};GreatCircle.prototype.Arc=function(a,b){var c=[];if(!a||a<=2){c.push([this.start.lon,this.start.lat]);c.push([this.end.lon,this.end.lat])}else{var d=1.0/(a-1);for(var i=0;i<a;++i){var e=d*i;var f=this.interpolate(e);c.push(f)}};var g=false;var h=0;var n=b&&b.offset?b.offset:10;var o=180-n;var p=-180+n;var q=360-n;for(var j=1;j<c.length;++j){var r=c[j-1][0];var s=c[j][0];var t=Math.abs(s-r);if(t>q&&((s>o&&r<p)||(r>o&&s<p))){g=true}else if(t>h){h=t}};var u=[];if(g&&h<n){var v=[];u.push(v);for(var k=0;k<c.length;++k){var w=parseFloat(c[k][0]);if(k>0&&Math.abs(w-c[k-1][0])>q){var x=parseFloat(c[k-1][0]);var y=parseFloat(c[k-1][1]);var z=parseFloat(c[k][0]);var A=parseFloat(c[k][1]);if(x>-180&&x<p&&z==180&&k+1<c.length&&c[k-1][0]>-180&&c[k-1][0]<p){v.push([-180,c[k][1]]);k++;v.push([c[k][0],c[k][1]]);continue}else if(x>o&&x<180&&z==-180&&k+1<c.length&&c[k-1][0]>o&&c[k-1][0]<180){v.push([180,c[k][1]]);k++;v.push([c[k][0],c[k][1]]);continue};if(x<p&&z>o){var B=x;x=z;z=B;var C=y;y=A;A=C};if(x>o&&z<p){z+=360};if(x<=180&&z>=180&&x<z){var D=(180-x)/(z-x);var E=D*A+(1-D)*y;v.push([c[k-1][0]>o?180:-180,E]);v=[];v.push([c[k-1][0]>o?-180:180,E]);u.push(v)}else{v=[];u.push(v)};v.push([w,c[k][1]])}else{v.push([c[k][0],c[k][1]])}}}else{var F=[];u.push(F);for(var l=0;l<c.length;++l){F.push([c[l][0],c[l][1]])}};var G=new Arc(this.properties);for(var m=0;m<u.length;++m){var H=new LineString();G.geometries.push(H);var I=u[m];for(var J=0;J<I.length;++J){H.move_to(I[J])}};return G}; // eslint-disable-line
    var f = new GreatCircle(star, end)
    var e = f.Arc(speed, {offset: 0})
    return e.geometries[0].coords
}

const markerRunning = function (obj = {}) {
    this.endKey = 'end'
    this.idKey = 'id'
    this.type = 'type'
    obj.speed = obj.speed || 30
    obj.time = obj.time || 10000
    for (const key in obj) {
        this[key] = obj[key]
    }
    !this.map && (this.map = map)
    this.fps = (this.time - 500) / this.speed
    this.devices = []
    this.renderTimer = null
    this.index = 0
    this.trackMarker = null

    this.polyline = new AMap.Polyline(({} || this.default)) // eslint-disable-line
    this.path = []
}

const render = function () {
    for (let i = 0; i < this.devices.length; i++) {
        if (this.devices[i].moveShapes && this.devices[i].moveShapes[this.index]) {
            this.devices[i].setPosition(this.devices[i].moveShapes[this.index])
        }
    }
    if (this.map.infoWindow.feature && this.map.infoWindow.feature.moveShapes && this.map.infoWindow.feature.moveShapes[this.index]) {
        this.map.infoWindow.setPosition(this.map.infoWindow.feature.moveShapes[this.index])
    }
    if (this.trackMarker && this.trackMarker.moveShapes && this.trackMarker.moveShapes[this.index]) {
        this.path[this.path.length - 1] = this.trackMarker.moveShapes[this.index]
        this.polyline.setPath(this.path)
    }
}

const clear = function () {
    clearInterval(this.renderTimer)
    if (this.index < this.speed) {
        this.index = this.speed - 1
        this.render()
    }
    this.devices.forEach(function (item) {
        item.moveShapes.length = 0
    })
    this.devices.length = 0
    this.index = 0
}

const running = function (data) {
    const _this = this
    this.clear()
    for (let i = 0, len = data.length; i < len; i++) {
        switch (data[i][this.type]) {
        case 'change':
            let object = this.markers.getById(data[i][this.idKey])
            if (object) {
                const start = object.getPosition()
                object.moveShapes = getMoveShapes(this.speed, {
                    x: start.lng,
                    y: start.lat
                }, {
                    x: data[i][this.endKey][0],
                    y: data[i][this.endKey][1]
                })
                this.devices.push(object)
            }
            break
        case 'add':
            if (this.markerClusterer) {
                this.markerClusterer.add(data[i])
            } else {
                this.markers.add(data[i])
            }
            break
        case 'del':
            if (this.markerClusterer) {
                this.markerClusterer.delById(data[i][this.idKey])
            } else {
                this.markers.delById(data[i][this.idKey])
            }
            break
        }
    }
    if (this.trackMarker && this.trackMarker.moveShapes && this.trackMarker.moveShapes.length > 0) {
        this.path.push(this.trackMarker.moveShapes[0])
    }
    this.renderTimer = setInterval(function () {
        if (_this.index >= _this.speed) {
            clearInterval(_this.renderTimer)
            return false
        }
        _this.render()
        _this.index++
    }, this.fps)
}

const startTrack = function (id) {
    var object = this.markers.getById(id)
    if (!object || this.trackMarker === object) {
        return false
    }
    this.clearTrack()
    if (this.markerClusterer) {
        this.markerClusterer.removeMarker(object)
        this.map.add(object)
    }
    this.trackMarker = object
    const arr = object.getPosition()
    this.path.push(arr)
    this.path.push(arr)
    this.map.add(this.polyline)
}

const clearTrack = function () {
    if (!this.trackMarker) {
        return false
    }
    if (this.markerClusterer) {
        this.markerClusterer.addMarker(this.trackMarker)
    }
    this.trackMarker = null
    this.map.remove(this.polyline)
    this.path.length = 0
}

const remove = function(){
    clearInterval(this.renderTimer)
    this.map.remove(this.polyline)
}

markerRunning.prototype = {
    running: running,
    clear: clear,
    render: render,
    startTrack: startTrack,
    clearTrack: clearTrack,
    remove: remove
}

export default markerRunning
