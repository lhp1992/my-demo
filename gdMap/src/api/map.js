import ajax from './main.js'

function randomPoints (n, cb) {
  var center = [112.982279, 28.19409]
  var lngX = center[0]
  var latY = center[1]
  let arr = []
  for (var i = 1; i < (n + 1); i++) {
    var point = []
    point[0] = (lngX + (Math.random() * 2 - 1) * 0.01).toFixed(6)
    point[1] = (latY + (Math.random() * 2 - 1) * 0.01).toFixed(6)
    arr.push(cb(point, i))
  }
  return arr
}

export default {
  getMarker (params, cb) {
    setTimeout(() => cb(randomPoints(20, (point, i) => {
      return {
        center: point,
        id: i
      }
    })), 1)
  },
  getRun (params, cb) {
    var _time = new Date().getTime()
    var format = function (i) { //author: meizz 
      var fmt = "yyyy-MM-dd hh:mm:ss"
      var t = _time + 60 * 1000 * i
      var _date = new Date(t)
      var o = {
          "M+": _date.getMonth() + 1, //月份 
          "d+": _date.getDate(), //日 
          "h+": _date.getHours(), //小时 
          "m+": _date.getMinutes(), //分 
          "s+": _date.getSeconds(), //秒 
          "q+": Math.floor((_date.getMonth() + 3) / 3), //季度 
          "S": _date.getMilliseconds() //毫秒 
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (_date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
    setTimeout(() => cb(randomPoints(20, (point, i) => {
      return {
        position: point,
        time: format(i * 2)
      }
    })), 1)
  },
  getPath (params, cb) {
    const path = []
    for (var i = 0; i < 4; i++) {
      path.push({
        id: i + 1,
        path: randomPoints(5, (point) => point)
      })
    }
    setTimeout(() => cb(path), 1)
  },
  getCircle (params, cb) {
    setTimeout(() => cb(randomPoints(20, (point, i) => {
      return {
        radius: parseInt(Math.random() * 200),
        center: point,
        id: i
      }
    })), 1)
  },
  getPoints (params, cb) {
    setTimeout(() => cb(randomPoints(20, (point, i) => {
      return {
        type: (Math.random() > 0.5 ? 'change' : ''),
        center: point,
        id: i
      }
    })), 1)
  },
}
