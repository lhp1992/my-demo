import * as turf from '@turf/turf'
import * as util from '../util'
import Vue from 'vue'
import Polyline from 'lhp-amap/packages/polyline'
Vue.use(Polyline)

describe('Polyline', () => {
  let vmm, vm, map, center, bbox

  const getOverlays = (number = 1, length = 10) => {
    let arr = []
    var lineStrings = turf.randomLineString(number, {bbox: bbox, num_vertices: length})
    turf.geomEach(lineStrings, (geojson) => arr.push(turf.getCoords(geojson).map(e => [parseFloat(parseFloat(e[0]).toFixed(6)), parseFloat(parseFloat(e[1]).toFixed(6))])))
    return arr
  }

  let path = getOverlays()[0]
  let pathString = path.toString()

  it('amap created', async() => {
    vmm = await util.createAMap()
    map = vmm.map
    center = map.getCenter().toString().split(',').map(e => parseFloat(e))
    bbox = map.getBounds().toString().replace(';', ',').split(',').map(e => parseFloat(e))
    expect(vmm.$el.querySelector('.amap-maps')).to.exist
  })

  it('polyline created', () => {
    vm = util.createTest(Polyline)
    expect(vm.$$feature).to.exist
    expect(vm.$$feature.constructor).to.equal(AMap.Polyline)
    util.destroyVM(vm)
  })

  const createPolyline = function(props, data) {
    return util.createVue({
      template: `
        <lhp-amap-polyline ref="overlay" ${props}></lhp-amap-polyline>
      `,
      data() {
        return {
          ...data
        }
      }
    })
  }

  it('path', async() => {
    vm = createPolyline(':path="path"', { path: path })
    await util.wait(500)
    expect(vm.$refs.overlay.$$feature.getPath()).to.have.length(10)
  })

  it('update path', async() => {
    let target = getOverlays(1, 15)[0]
    let targetString = target.toString()
    vm.path = target
    await util.wait()
    expect(vm.$refs.overlay.$$feature.getPath()).to.have.length(15)

    vm.path = undefined
    await util.wait()
    expect(vm.$refs.overlay.$$feature.getPath()).to.have.length(0)
    util.destroyVM(vm)
  })

  it('extData', async() => {
    let extData = { data: 'test extData' }
    vm = createPolyline(':extData="extData"', { extData: extData })
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
    vm = createPolyline(':map="map"', { map: map })
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
    vm = createPolyline(':options="options"', { options: { strokeOpacity: 0.6, strokeWeight: 6 } })
    let $$feature = vm.$refs.overlay.$$feature
    let options = $$feature.getOptions()
    expect(options).to.have.deep.property('strokeOpacity', 0.6)
    expect(options).to.have.deep.property('strokeWeight', 6)
    util.destroyVM(vm)
  })

  describe('events', () => {
    const createPolylineEvents = function(event) {
      return util.createVue({
        template: `
          <lhp-amap-polyline ref="overlay" :events="events" :map="map"></lhp-amap-polyline>
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
      vm = createPolylineEvents('custom event')
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
        <lhp-amap-polyline ref="overlay" @${prop}="handleEvent"></lhp-amap-polyline>
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