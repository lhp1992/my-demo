import * as turf from '@turf/turf'
import * as util from '../util'
import Vue from 'vue'
import Polygon from 'lhp-amap/packages/polygon'
Vue.use(Polygon)

describe('Polygon', () => {
  let vmm, vm, map, center, bbox

  const getOverlays = (number = 1) => {
    let arr = []
    var polygons = turf.randomPolygon(number, {bbox: bbox})
    turf.geomEach(polygons, (geojson) => arr.push(turf.getCoords(geojson)[0].map(e => [parseFloat(parseFloat(e[0]).toFixed(6)), parseFloat(parseFloat(e[1]).toFixed(6))])))
    return arr
  }

  let path = getOverlays()

  it('amap created', async() => {
    vmm = await util.createAMap()
    map = vmm.map
    center = map.getCenter().toString().split(',').map(e => parseFloat(e))
    bbox = map.getBounds().toString().replace(';', ',').split(',').map(e => parseFloat(e))
    expect(vmm.$el.querySelector('.amap-maps')).to.exist
  })

  it('polygon created', () => {
    vm = util.createTest(Polygon)
    expect(vm.$$feature).to.exist
    expect(vm.$$feature.constructor).to.equal(AMap.Polygon)
    util.destroyVM(vm)
  })

  const createPolygon = function(props, data) {
    return util.createVue({
      template: `
        <lhp-amap-polygon ref="overlay" ${props}></lhp-amap-polygon>
      `,
      data() {
        return {
          ...data
        }
      }
    })
  }

  it('path', async() => {
    vm = createPolygon(':path="path"', { path: path })
    await util.wait(500)
    let pathString = path.toString()
    expect(vm.$refs.overlay.$$feature.getPath().toString()).to.equal(pathString)
  })

  it('update path', async() => {
    let target = getOverlays()[0]
    vm.path = target
    await util.wait()
    let targetString = target.toString()
    expect(vm.$refs.overlay.$$feature.getPath().toString()).to.equal(targetString)

    vm.path = undefined
    await util.wait()
    expect(vm.$refs.overlay.$$feature.getPath().toString()).to.equal('')
    util.destroyVM(vm)
  })

  it('extData', async() => {
    let extData = { data: 'test extData' }
    vm = createPolygon(':extData="extData"', { extData: extData })
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
    vm = createPolygon(':map="map"', { map: map })
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

  it('options', () => {
    vm = createPolygon(':options="options"', { options: { strokeOpacity: 0.6, strokeWeight: 6 } })
    let $$feature = vm.$refs.overlay.$$feature
    let options = $$feature.getOptions()
    expect(options).to.have.deep.property('strokeOpacity', 0.6)
    expect(options).to.have.deep.property('strokeWeight', 6)
    util.destroyVM(vm)
  })

  describe('events', () => {
    const createPolygonEvents = function(event) {
      return util.createVue({
        template: `
          <lhp-amap-polygon ref="overlay" :events="events" :map="map"></lhp-amap-polygon>
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
      vm = createPolygonEvents('custom event')
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
        <lhp-amap-polygon ref="overlay" @${prop}="handleEvent"></lhp-amap-polygon>
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