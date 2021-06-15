import * as util from '../util'
import Vue from 'vue'
import Text from 'lhp-amap/packages/text'
Vue.use(Text)

describe('Text', () => {
  let vmm, vm, map, center

  it('amap created', async() => {
    vmm = await util.createAMap()
    map = vmm.map
    center = map.getCenter().toString().split(',').map(e => parseFloat(e))
    expect(vmm.$el.querySelector('.amap-maps')).to.exist
  })

  it('text created', () => {
    vm = util.createTest(Text)
    expect(vm.$$feature).to.exist
    expect(vm.$$feature.constructor).to.equal(AMap.Text)
    util.destroyVM(vm)
  })

  const createText = function(props, data) {
    return util.createVue({
      template: `
        <lhp-amap-text ref="overlay" ${props}></lhp-amap-text>
      `,
      data() {
        return {
          ...data
        }
      }
    })
  }

  it('position', async() => {
    vm = createText(':position="position"', { position: center })
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
  
  it('text', async() => {
    vm = createText(':text="text"', { text: 'test text' })
    await util.wait(500)
    expect(vm.$refs.overlay.$$feature.getText()).to.equal('test text')
  })

  it('update text', async() => {
    vm.text = 'new text'
    await util.wait()
    expect(vm.$refs.overlay.$$feature.getText()).to.equal('new text')
    util.destroyVM(vm)
  })

  it('extData', async() => {
    let extData = { data: 'test extData' }
    vm = createText(':extData="extData"', { extData: extData })
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
    vm = createText(':map="map"', { map: map })
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
    vm = createText(':options="options"', { options: { zIndex: 200, animation: 'AMAP_ANIMATION_DROP' } })
    let $$feature = vm.$refs.overlay.$$feature
    expect($$feature.getzIndex()).equal(200)
    expect($$feature.getAnimation()).equal('AMAP_ANIMATION_DROP')
    util.destroyVM(vm)
  })

  describe('events', () => {
    const createTextEvents = function(event) {
      return util.createVue({
        template: `
          <lhp-amap-text ref="overlay" :events="events" :map="map"></lhp-amap-text>
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
      vm = createTextEvents('custom event')
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
        <lhp-amap-text ref="overlay" @${prop}="handleEvent"></lhp-amap-text>
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