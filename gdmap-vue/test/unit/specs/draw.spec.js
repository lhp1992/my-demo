import * as util from '../util'
import Vue from 'vue'
import $$draw from 'lhp-amap/packages/draw'
import { Message } from 'element-ui'
Vue.prototype.$message = Message

describe('Draw', () => {
  let vmm, vm, map

  it('amap created', async() => {
    vmm = await util.createAMap()
    map = vmm.map
    expect(vmm.$el.querySelector('.amap-maps')).to.exist
  })

  describe('open', () => {
    it('map', async() => {
      await $$draw.open({map: map})
      expect($$draw.currentMap).to.equal(map)
    })
    
    it('type', async() => {
      await $$draw.open({map: map, type: 'marker'})
      expect(document.querySelector('.el-message__content').textContent).to.equal('开启鼠标画点标注模式。鼠标在地图上单击绘制点标注。')
    })

    it('callback', async() => {
      let result = undefined
      await $$draw.open({type: 'marker', map: map, callback: (...args) => result = args})
      map.emit('click')
      expect(document.querySelector('.amap-marker')).to.not.exist
      expect(result).to.length(1)
      expect(result[0]).to.have.deep.property('position')
    })

    it('isKeep', async() => {
      await $$draw.open({type: 'marker', map: map, isKeep: true})
      map.emit('click')
      await util.wait()
      expect(document.querySelector('.amap-marker')).to.exist
    })
  })

  describe('close', () => {
    it('clear overlays', () => {
      expect(document.querySelector('.amap-marker')).to.exist
      $$draw.close()
      expect(document.querySelector('.amap-marker')).to.not.exist
    })

    it('close', async() => {
      let result = undefined
      await $$draw.open({type: 'marker', map: map, callback: (...args) => result = args})
      $$draw.close()
      map.emit('click')
      expect(result).to.undefined
    })
  })
})