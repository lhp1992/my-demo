import * as util from '../util'
import Vue from 'vue'
import Amap from 'lhp-amap/packages/map'
Vue.use(Amap)

describe('Amap', () => {
  let vmm, vm

  it('amap created', async() => {
    vmm = await util.createAMap()
    expect(vmm.$el.querySelector('.amap-maps')).to.exist
  })

  it('watch zoom', async() => {
    expect(vmm.zoom).to.equal(11)
    vmm.map.setZoom(16)
    await util.wait(500)
    expect(vmm.zoom).to.equal(16)
    util.destroyVM(vmm)
  })

  it('onLoad', async() => {
    vm = await util.createTest({
      template: `
        <lhp-amap ref="amap" @onLoad="handleEvent"></lhp-amap>
      `,
      methods: {
        handleEvent(...args) {
          this.result = args
        }
      }
    }, true)
    expect(vm.result).to.length(1)
    expect(vm.result[0].constructor).to.equal(AMap.Map)
    expect(vm.result[0]).to.equal(vm.$refs.amap.map)
    util.destroyVM(vm)
  })
})