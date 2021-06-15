import * as util from '../util'
import Mock from 'mockjs'
import Vue from 'vue'
import Editor from 'lhp-amap/packages/editor'
Vue.use(Editor)

describe('Editor', () => {
  let vmm, vm, map, center

  it('amap created', async() => {
    vmm = await util.createAMap()
    map = vmm.map
    center = map.getCenter().toString().split(',').map(e => parseFloat(e))
    expect(vmm.$el.querySelector('.amap-maps')).to.exist
  })

  it('editor marker', async() => {
    vm = util.createVue({
      template: `<lhp-amap-editor-marker ref="overlay" id="test" :extData="extData" :map="map" :position="position"></lhp-amap-editor-marker>`,
      data() { return { map: map, position: [116.43, 39.92], extData: {content: 'test'} } }
    })
    await util.wait()
    let params = vm.$refs.overlay.getParams()
    expect(params).to.have.deep.property('id', 'test')
    expect(params.extData).to.have.deep.property('content', 'test')
    expect(params.params).to.have.deep.property('position', [116.43, 39.92])
    util.destroyVM(vm)
  })

  it('editor polyline', async() => {
    vm = util.createVue({
      template: `<lhp-amap-editor-polyline ref="overlay" id="test" :extData="extData" :map="map" :path="path"></lhp-amap-editor-polyline>`,
      data() { return { map: map, path: [[116.41, 39.93], [116.43, 39.91]], extData: {content: 'test'} } }
    })
    await util.wait(500)
    let params = vm.$refs.overlay.getParams()
    expect(params).to.have.deep.property('id', 'test')
    expect(vm.$refs.overlay.$$editor).to.exist
    util.destroyVM(vm)
  })

  it('editor polygon', async() => {
    vm = util.createVue({
      template: `<lhp-amap-editor-polygon ref="overlay" id="test" :extData="extData" :map="map" :path="path"></lhp-amap-editor-polygon>`,
      data() { return { map: map, path: [[116.46, 39.93], [116.44, 39.91], [116.49, 39.91]], extData: {content: 'test'} } }
    })
    await util.wait(500)
    let params = vm.$refs.overlay.getParams()
    expect(params).to.have.deep.property('id', 'test')
    expect(vm.$refs.overlay.$$editor).to.exist
    util.destroyVM(vm)
  })

  it('editor circle', async() => {
    vm = util.createVue({
      template: `<lhp-amap-editor-circle ref="overlay" id="test" :extData="extData" :map="map" :center="center" :radius="1000"></lhp-amap-editor-circle>`,
      data() { return { map: map, center: [116.39, 39.92], extData: {content: 'test'} } }
    })
    await util.wait(500)
    let params = vm.$refs.overlay.getParams()
    expect(params).to.have.deep.property('id', 'test')
    expect(params.extData).to.have.deep.property('content', 'test')
    expect(params.params).to.have.deep.property('center', [116.39, 39.92])
    expect(params.params).to.have.deep.property('radius', 1000)
    expect(vm.$refs.overlay.$$editor).to.exist
    util.destroyVM(vm)
  })

  it('editor rectangle', async() => {
    vm = util.createVue({
      template: `<lhp-amap-editor-rectangle ref="overlay" id="test" :extData="extData" :map="map" :bounds="bounds"></lhp-amap-editor-rectangle>`,
      data() { return { map: map, bounds: [[116.35, 39.91], [116.37, 39.93]], extData: {content: 'test'} } }
    })
    await util.wait(500)
    let params = vm.$refs.overlay.getParams()
    expect(params).to.have.deep.property('id', 'test')
    expect(params.extData).to.have.deep.property('content', 'test')
    expect(params.params).to.have.deep.property('bounds', [[116.35, 39.91], [116.37, 39.93]])
    expect(vm.$refs.overlay.$$editor).to.exist
    util.destroyVM(vm)
  })

  it('editor', async() => {
    vm = util.createVue({
      template: `
        <lhp-amap-editor ref="editor">
          <template v-if="visible">
            <lhp-amap-editor-marker id="marker" :map="map" :position="center"></lhp-amap-editor-marker>
            <lhp-amap-editor-polyline id="polyline" :map="map" :path="line"></lhp-amap-editor-polyline>
            <lhp-amap-editor-polygon id="polygon" :map="map" :path="polygon"></lhp-amap-editor-polygon>
            <lhp-amap-editor-circle id="circle" :map="map" :center="circle" :radius="1000"></lhp-amap-editor-circle>
            <lhp-amap-editor-rectangle id="rectangle" :map="map" :bounds="bounds"></lhp-amap-editor-rectangle>
          </template>
        </lhp-amap-editor>
      `,
      data() {
        return {
          map: map,
          visible: true,
          center: [116.43, 39.92],
          line: [[116.41, 39.93], [116.43, 39.91]],
          polygon: [[116.46, 39.93], [116.44, 39.91], [116.49, 39.91]],
          circle: [116.39, 39.92],
          bounds: [[116.35, 39.91], [116.37, 39.93]]
        }
      }
    })
    await util.wait(500)
    let params = vm.$refs.editor.getParams()
    expect(params).to.length(5)
    expect(params.map(e => e.id)).to.eql(['marker', 'polyline', 'polygon', 'circle', 'rectangle'])
  })

  it('editor overlay destroyed', async() => {
    vm.visible = false
    await util.wait(500)
    let params = vm.$refs.editor.getParams()
    expect(params).to.length(0)
    util.destroyVM(vm)
    util.destroyVM(vmm)
  })

})