import { map } from './map.js'

const mouseTool = {}

mouseTool.default = {}

mouseTool.init = function (obj = {}) {
    for (const key in obj) {
        this[key] = obj[key]
    }
    this.map = obj.map || map
    this.map.plugin(["AMap.MouseTool"],() => { 
        this.mousetool = new AMap.MouseTool(this.map)
        this.onDraw && this.mousetool.on('draw', this.onDraw)
    });
}

mouseTool.draw = function (type, options = {}) {
    switch (type) {
        case 'marker':
            this.mousetool.marker(options)
            break;
        case 'polyline':
            this.mousetool.polyline(options)
            break;
        case 'polygon':
            this.mousetool.polygon(options)
            break;
        case 'rectangle':
            this.mousetool.rectangle(options)
            break;
        case 'circle':
            this.mousetool.circle(options)
            break;
        case 'rule':
            this.mousetool.rule(options)
            break;
        case 'measureArea':
            this.mousetool.measureArea(options)
            break;
    }
}

mouseTool.close = function(){
    this.mousetool.close()
}

mouseTool.remove = function(){
    this.mousetool.close(true)
}

export default mouseTool
