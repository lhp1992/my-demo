import * as util from '../util'
import Mock from 'mockjs'
import Vue from 'vue'
import Circle from 'lhp-amap/packages/circle'
Vue.use(Circle)

describe('Circle', () => {
  let vmm, vm, map, center

  it('amap created', async() => {
    vmm = await util.createAMap()
    map = vmm.map
    center = map.getCenter().toString().split(',').map(e => parseFloat(e))
    expect(vmm.$el.querySelector('.amap-maps')).to.exist
  })

  it('circle created', () => {
    vm = util.createTest(Circle)
    expect(vm.$$feature).to.exist
    expect(vm.$$feature.constructor).to.equal(AMap.Circle)
    util.destroyVM(vm)
  })

  const createCircle = function(props, data) {
    return util.createVue({
      template: `
        <lhp-amap-circle ref="overlay" ${props}></lhp-amap-circle>
      `,
      data() {
        return {
          ...data
        }
      }
    })
  }

  it('center', async() => {
    vm = createCircle(':center="center"', { center: center })
    await util.wait(500)
    let position = vm.$refs.overlay.$$feature.getCenter()
    expect(position.lng).to.equal(center[0])
    expect(position.lat).to.equal(center[1])
  })

  it('update center', async() => {
    vm.center = [112, 28]
    await util.wait()
    let position = vm.$refs.overlay.$$feature.getCenter()
    expect(position.lng).to.equal(112)
    expect(position.lat).to.equal(28)
    util.destroyVM(vm)
  })
  
  it('radius', async() => {
    vm = createCircle(':radius="radius"', { radius: 1000 })
    await util.wait(500)
    expect(vm.$refs.overlay.$$feature.getRadius()).to.equal(1000)
  })

  it('update radius', async() => {
    vm.radius = 1500
    await util.wait()
    expect(vm.$refs.overlay.$$feature.getRadius()).to.equal(1500)
    util.destroyVM(vm)
  })

  it('extData', async() => {
    let extData = { data: 'test extData' }
    vm = createCircle(':extData="extData"', { extData: extData })
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
    vm = createCircle(':map="map"', { map: map })
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
    vm = createCircle(':options="options"', { options: { strokeStyle: 'dashed', fillColor: 'red' } })
    let $$feature = vm.$refs.overlay.$$feature
    let options = $$feature.getOptions()
    expect(options).to.have.deep.property('strokeStyle', 'dashed')
    expect(options).to.have.deep.property('fillColor', 'red')
    util.destroyVM(vm)
  })

  describe('events', () => {
    const createCircleEvents = function(event) {
      return util.createVue({
        template: `
          <lhp-amap-circle ref="overlay" :events="events" :map="map"></lhp-amap-circle>
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
      vm = createCircleEvents('custom event')
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
        <lhp-amap-circle ref="overlay" @${prop}="handleEvent"></lhp-amap-circle>
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