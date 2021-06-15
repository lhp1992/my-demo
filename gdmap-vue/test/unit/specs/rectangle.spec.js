import * as util from '../util'
import Mock from 'mockjs'
import Vue from 'vue'
import Rectangle from 'lhp-amap/packages/rectangle'
Vue.use(Rectangle)

describe('Rectangle', () => {
  let vmm, vm, map, center

  it('amap created', async() => {
    vmm = await util.createAMap()
    map = vmm.map
    center = map.getCenter().toString().split(',').map(e => parseFloat(e))
    expect(vmm.$el.querySelector('.amap-maps')).to.exist
  })

  it('rectangle created', () => {
    vm = util.createTest(Rectangle)
    expect(vm.$$feature).to.exist
    expect(vm.$$feature.constructor).to.equal(AMap.Rectangle)
    util.destroyVM(vm)
  })

  const createRectangle = function(props, data) {
    return util.createVue({
      template: `
        <lhp-amap-rectangle ref="overlay" ${props}></lhp-amap-rectangle>
      `,
      data() {
        return {
          ...data
        }
      }
    })
  }

  it('bounds', async() => {
    vm = createRectangle(':bounds="bounds"', { bounds: [[116.35, 39.91], [116.37, 39.93]] })
    await util.wait(500)
    let bounds = vm.$refs.overlay.$$feature.getBounds()
    let southWest = bounds.getSouthWest()
    let northEast = bounds.getNorthEast() 
    expect([southWest.lng, southWest.lat]).to.eql([116.35, 39.91])
    expect([northEast.lng, northEast.lat]).to.eql([116.37, 39.93])
  })

  it('update bounds', async() => {
    vm.bounds = [[116.37, 39.93], [116.39, 39.95]]
    await util.wait(500)
    let bounds = vm.$refs.overlay.$$feature.getBounds()
    let southWest = bounds.getSouthWest()
    let northEast = bounds.getNorthEast() 
    expect([southWest.lng, southWest.lat]).to.eql([116.37, 39.93])
    expect([northEast.lng, northEast.lat]).to.eql([116.39, 39.95])
    util.destroyVM(vm)
  })

  it('extData', async() => {
    let extData = { data: 'test extData' }
    vm = createRectangle(':extData="extData"', { extData: extData })
    await util.wait(500)
    expect(vm.$refs.overlay.$$feature.getExtData()).to.eql(extData)
  })
  
  it('update extData', async() => {
    let $$feature = vm.$refs.overlay.$$feature
    vm.$set(vm.extData, 'newData', 'new data')
    await util.wait()
    expect($$feature.getExtData()).to.have.deep.property('newData', 'new data')

    vm.$delete(vm.extData, 'data')
    await util.wait()
    expect($$feature.getExtData()).to.not.have.deep.property('data')

    vm.$set(vm, 'extData', { data: 'new test data' })
    await util.wait()
    expect($$feature.getExtData()).to.have.deep.property('data', 'new test data')
    util.destroyVM(vm)
  })

  it('map', async() => {
    vm = createRectangle(':map="map"', { map: map })
    await util.wait(500)
    let $$feature = vm.$refs.overlay.$$feature
    let currentMap = $$feature.getMap()
    expect(currentMap).to.exist
    expect(currentMap.constructor).to.equal(AMap.Map)
    expect(currentMap).to.equal(map)
  })

  it('update map', async() => {
    let $$feature = vm.$refs.overlay.$$feature
    vm.map = null
    await util.wait()
    expect($$feature.getMap()).to.null

    vm.map = map
    await util.wait()
    expect($$feature.getMap()).to.equal(map)
    util.destroyVM(vm)
  })

  it('options', async() => {
    vm = createRectangle(':options="options"', { options: { strokeStyle: 'dashed', fillColor: 'red' } })
    let $$feature = vm.$refs.overlay.$$feature
    let options = $$feature.getOptions()
    expect(options).to.have.deep.property('strokeStyle', 'dashed')
    expect(options).to.have.deep.property('fillColor', 'red')
    util.destroyVM(vm)
  })

  describe('events', () => {
    const createRectangleEvents = function(event) {
      return util.createVue({
        template: `
          <lhp-amap-rectangle ref="overlay" :events="events" :map="map"></lhp-amap-rectangle>
        `,
        data() {
          let _event = {}
          _event[event] = this.handleEvent
          return {
            result: '',
            map: map,
            events: _event
          }
        },
        methods: {
          handleEvent(...args) {
            this.result = args
          }
        }
      })
    }

    afterEach(() => {
      util.destroyVM(vm)
    })

    it('custom event', async() => {
      vm = createRectangleEvents('custom event')
      let $$feature = vm.$refs.overlay.$$feature
      $$feature.emit('custom event', 'custom event params')
      expect(vm.result).to.length(1)
      expect(vm.result[0]).to.have.deep.property('type', 'custom event')
      expect(vm.result[0]).to.have.deep.property('value', 'custom event params')
    })
  })

  const createEvents = function(prop) {
    return util.createVue({
      template: `
        <lhp-amap-rectangle ref="overlay" @${prop}="handleEvent"></lhp-amap-rectangle>
      `,
      methods: {
        handleEvent(...args) {
          this.result = args
        }
      },
      data() {
        return { result: '' }
      }
    })
  }

  it('onCraeted', async() => {
    vm = createEvents('onCreated')
    await util.wait(500)
    let $$feature = vm.$refs.overlay.$$feature
    expect(vm.result).to.length(1)
    expect(vm.result[0]).to.equal($$feature)
    util.destroyVM(vm)
  })

  it('onDestroyed', async() => {
    vm = createEvents('onDestroyed')
    await util.wait()
    let $$feature = vm.$refs.overlay.$$feature
    util.destroyVM(vm)
    expect(vm.result).to.length(1)
    expect(vm.result[0]).to.equal($$feature)

    util.destroyVM(vmm)
  })

})