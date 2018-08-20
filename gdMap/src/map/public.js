export function randomPoints (center, n) {
    const lngX = center[0]
    const latY = center[1]
    let arr = []
    for (var i = 0; i < n; i++) {
        var point = []
        point[0] = lngX + (Math.random() * 2 - 1) * 0.01
        point[1] = latY + (Math.random() * 2 - 1) * 0.01
        arr.push({
            center: point,
            id: i
        })
    }
    return arr
}

// 合并对象
export function extend () {
    for (var i = 1, len = arguments.length; i < len; i++) {
        Object.assign(arguments[0], arguments[i])
    }
    return arguments[0]
}

export function random (min, max, fixed) {
    let number = Math.random() * (max - min) + min
    if (fixed === 0) {
        number = Math.round(number)
    }
    if (fixed) {
        number = parseFloat(number.toFixed(fixed))
    }
    return number
}

/*
function gradientColor(startColor, endColor, step){
    // this.gradient = {
    //     0.25: '#0000ff',
    //     0.55: '#00ff00',
    //     0.85: '#ffff00',
    //     1.0: '#ff0000'
    // }
    this.gradient = [
        {
            color: '#0000ff',
            value: 0.25
        }, {
            color: '#00ff00',
            value: 0.55
        }, {
            color: '#ffff00',
            value: 0.85
        }, {
            color: '#ff0000',
            value: 1
        }
    ]
}

gradientColor.prototype.a1 = function(startHex,endHex,step,i){
    startR = parseInt("0x" + startHex.slice(1, 3))
    startG = parseInt("0x" + startHex.slice(3, 5))
    startB = parseInt("0x" + startHex.slice(5, 7))
    endR = parseInt("0x" + endHex.slice(1, 3))
    endG = parseInt("0x" + endHex.slice(3, 5))
    endB = parseInt("0x" + endHex.slice(5, 7))
    sR = (endR-startR)/step;//总差值
    sG = (endG-startG)/step;
    sB = (endB-startB)/step;
    // var hex = 'rgb('+parseInt((sR*i+startR))+','+parseInt((sG*i+startG))+','+parseInt((sB*i+startB))+')';
    var hex = this.rgbToHex(parseInt((sR*i+startR)), parseInt((sG*i+startG)), parseInt((sB*i+startB)))
    return hex;
}

gradientColor.prototype.getColor = function(value){
    var len = this.gradient.length
    if(value > this.gradient[len-1].value){
        return this.gradient[len-1].color
    }
    if(value < this.gradient[0].value){
        return this.gradient[0].color
    }
    for(var i = 0; i < len; i++){
        if(value > this.gradient[i].value){
            var start = this.gradient[i].color
            var end = this.gradient[i+1].color
            var step = this.gradient[i+1].value - this.gradient[i].value
            var val = value - this.gradient[i+1].value
            return this.a1(start, end, step, val)
        }
    }

    if (i >= 1) {
        color = 'rgb(255,0,0)'
    } else if (i > 0.85) {
        color = this.a1([255,255,0], [255,0,0], 25, (val - 85))
    } else if (i > 0.55) {
        color = this.a1([0,255,0], [255,255,0], 30, (val - 55))
    } else if (i > 0.25) {
        color = this.a1([0,0,255], [0,255,0], 30, (val - 25))
    } else {
        color = 'rgb(255,0,0)'
    }
    return color
}

gradientColor.prototype.hex = function (x) {
    return ("0" + parseInt(x).toString(16)).slice(-2)
}
gradientColor.prototype.rgbToHex = function (r, g, b) {
    var _hex="#" + this.hex(r) + this.hex(g) + this.hex(b);
    return _hex.toUpperCase();
}

var a1 = new gradientColor()
console.log(a1.getColor(.5))
*/
