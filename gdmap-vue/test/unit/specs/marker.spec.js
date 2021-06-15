import * as util from '../util'
import Mock from 'mockjs'
import Vue from 'vue'
import Marker from 'lhp-amap/packages/marker'
Vue.use(Marker)

describe('Marker', () => {
  let vmm, vm, map, center

  it('amap created', async() => {
    vmm = await util.createAMap()
    map = vmm.map
    center = map.getCenter().toString().split(',').map(e => parseFloat(e))
    expect(vmm.$el.querySelector('.amap-maps')).to.exist
  })

  it('marker created', () => {
    vm = util.createTest(Marker)
    expect(vm.$$feature).to.exist
    expect(vm.$$feature.constructor).to.equal(AMap.Marker)
    util.destroyVM(vm)
  })

  const createMarker = function(props, data) {
    return util.createVue({
      template: `
        <lhp-amap-marker ref="overlay" ${props}></lhp-amap-marker>
      `,
      data() {
        return {
          ...data
        }
      }
    })
  }

  it('position', async() => {
    vm = createMarker(':position="position"', { position: center })
    await util.wait(500)
    let position = vm.$refs.overlay.$$feature.getPosition()
    expect(position.lng).to.equal(center[0])
    expect(position.lat).to.equal(center[1])
  })

  it('update position', async() => {
    vm.position = [112, 28]
    await util.wait()
    let position = vm.$refs.overlay.$$feature.getPosition()
    expect(position.lng).to.equal(112)
    expect(position.lat).to.equal(28)
    util.destroyVM(vm)
  })
  
  it('content', async() => {
    vm = createMarker(':content="content"', { content: 'test content' })
    await util.wait(500)
    expect(vm.$refs.overlay.$$feature.getContent()).to.equal('test content')
  })

  it('update content', async() => {
    vm.content = 'new content'
    await util.wait()
    expect(vm.$refs.overlay.$$feature.getContent()).to.equal('new content')
    util.destroyVM(vm)
  })

  it('icon', async() => {
    let image = Mock.Random.dataImage()
    vm = createMarker(':icon="icon" :map="map"', { icon: image, map: map })
    await util.wait(500)
    let makerElm = vmm.$el.querySelector('.amap-marker .amap-icon img')
    expect(vm.$refs.overlay.$$feature.getIcon()).to.equal(image)
    expect(makerElm.src).to.equal(image)
  })

  it('update icon', async() => {
    let newImage = Mock.Random.dataImage()
    vm.icon = newImage
    await util.wait(500)
    let makerElm = vmm.$el.querySelector('.amap-marker .amap-icon img')
    expect(vm.$refs.overlay.$$feature.getIcon()).to.equal(newImage)
    expect(makerElm.src).to.equal(newImage)
    util.destroyVM(vm)
  })

  it('extData', async() => {
    let extData = { data: 'test extData' }
    vm = createMarker(':extData="extData"', { extData: extData })
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
    vm = createMarker(':map="map"', { map: map })
    await util.wait(500)
    let $$feature = vm.$refs.overlay.$$feature
    let currentMap = $$feature.getMap()
    let makerElm = vmm.$el.querySelector('.amap-marker')
    expect(makerElm).to.exist
    expect(currentMap).to.exist
    expect(currentMap.constructor).to.equal(AMap.Map)
    expect(currentMap).to.equal(map)
  })

  it('update map', async() => {
    let $$feature = vm.$refs.overlay.$$feature
    vm.map = null
    await util.wait()
    expect($$feature.getMap()).to.null
    expect(vmm.$el.querySelector('.amap-marker')).to.not.exist

    vm.map = map
    await util.wait()
    expect($$feature.getMap()).to.equal(map)
    expect(vmm.$el.querySelector('.amap-marker')).to.exist
    util.destroyVM(vm)
  })

  it('options', async() => {
    vm = createMarker(':options="options"', { options: { zIndex: 200, animation: 'AMAP_ANIMATION_DROP' } })
    let $$feature = vm.$refs.overlay.$$feature
    expect($$feature.getzIndex()).equal(200)
    expect($$feature.getAnimation()).equal('AMAP_ANIMATION_DROP')
    util.destroyVM(vm)
  })

  it('feature', async() => {
    let feature = new AMap.Marker()
    vm = createMarker(':feature="feature"', { feature: feature })
    let $$feature = vm.$refs.overlay.$$feature
    expect($$feature).equal(feature)
    util.destroyVM(vm)
  })

  describe('events', () => {
    const createMarkerEvents = function(event) {
      return util.createVue({
        template: `
          <lhp-amap-marker ref="overlay" :events="events" :map="map"></lhp-amap-marker>
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
      vm = createMarkerEvents('custom event')
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
        <lhp-amap-marker ref="overlay" @${prop}="handleEvent"></lhp-amap-marker>
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