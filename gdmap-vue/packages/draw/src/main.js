import { getFeatureParams } from 'lhp-amap/packages/compute/src/main.js'
import config from 'lhp-amap/packages/config'
import Vue from 'vue'

let message = {
  marker: '开启鼠标画点标注模式。鼠标在地图上单击绘制点标注。',
  polyline: '开启鼠标画折线模式。鼠标在地图上点击绘制折线，鼠标左键双击或右键单击结束绘制。',
  polygon: '开启鼠标画多边形模式。鼠标在地图上单击开始绘制多边形，鼠标左键双击或右键单击结束当前多边形的绘制。',
  rectangle: '开启鼠标画矩形模式。鼠标在地图上拉框即可绘制相应的矩形。',
  circle: '开启鼠标画圆模式。鼠标在地图上拖动绘制相应的圆形。'
}

export default {
  mouseTool: undefined,
  currentMap: undefined,
  currentFnc: undefined,
  async open({type, map, callback, isKeep}) {
    if(Vue.prototype.$message && message[type]) {
      Vue.prototype.$message({
        message: message[type],
        showClose: true
      })
    }
    if(this.currentMap !== map) {
      this.currentMap = map
      this.mouseTool = await this.initMouseTool(map)
    }
    this.mouseTool.close(true)
    this.currentFnc = (feature) => {
      if(callback) {
        let data = getFeatureParams(feature, type)
        callback(data)
      }
      setTimeout(() => {
        this.mouseTool.close(isKeep ? undefined : true)
      })
    }
    if(this.mouseTool[type]) {
      let options = config.getEditor(type)
      this.mouseTool[type](options)
    }
  },
  close() {
    this.mouseTool && this.mouseTool.close(true)
  },
  initMouseTool(map) {
    return new Promise(resolve => {
      map.plugin(["AMap.MouseTool"], () => {
        let mouseTool = new AMap.MouseTool(map)
        mouseTool.on('draw', ({ obj }) => {
          this.currentFnc && this.currentFnc(obj)
        })
        resolve(mouseTool)
      })
    })
  }
}