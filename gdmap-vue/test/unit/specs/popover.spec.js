import * as util from '../util'
import Vue from 'vue'
import Popover from 'lhp-amap/packages/popover'
Vue.use(Popover)
import Marker from 'lhp-amap/packages/marker'
Vue.use(Marker)

const toArray = function(obj) {
  return [].slice.call(obj)
}

describe('Popover', () => {
  let vmm, vm, map, center

  it('amap created', async() => {
    vmm = await util.createAMap()
    map = vmm.map
    center = map.getCenter().toString().split(',').map(e => parseFloat(e))
    expect(vmm.$el.querySelector('.amap-maps')).to.exist
  })

  describe('Popover Attributes', () => {
    afterEach(() => {
      util.destroyVM(vm)
    })

    it('popover created', () => {
      vm = util.createTest(Popover)
      expect(vm.$el).to.exist
    })

    it('width', () => {
      vm = util.createTest(Popover, { width: 320 })
      expect(vm.$el.style.width).to.equal('320px')
    })
  
    it('title', () => {
      vm = util.createTest(Popover, { title: 'test title' })
      expect(util.trim(vm.$el.querySelector('.lhp-amap-popover-title').textContent)).to.equal('test title')
    })
    
    it('field & data', () => {
      vm = util.createTest(Popover, { 
        field: {id: 'id', name: '名称', address: '地址'},
        data: {id: 'test', name: '张三', address: '地球'}
      })
      let content = []
      for(let key in vm.field) {
        let title = vm.field[key]
        let label = vm.data[key]
        content.push(title +'：'+ label)
      }
      let nodes = vm.$el.querySelectorAll('.lhp-amap-popover-content>div')
      expect(nodes).to.length(3)
      expect(toArray(nodes).map(e => util.trim(e.textContent))).to.eql(content)
    })

    it('buttons', async() => {
      vm = util.createVue({
        template: `
          <lhp-amap-popover ref="target" :buttons="buttons" :data="data"></lhp-amap-popover>
        `,
        data() {
          return {
            buttons: ['无绑定事件', {
              text: '绑定事件',
              action: (...args) => {
                this.result = args
              }
            }],
            data: { id: 0 },
            result: undefined
          }
        }
      }, true)
      let nodes = vm.$el.querySelectorAll('.lhp-amap-popover-buttons>a')
      expect(nodes).to.length(2)
      expect(toArray(nodes).map(e => util.trim(e.textContent))).to.eql(['无绑定事件', '绑定事件'])

      util.triggerEvent(nodes[0], 'click')
      await util.wait()
      expect(vm.result).to.undefined

      util.triggerEvent(nodes[1], 'click')
      await util.wait()
      expect(vm.result).to.length(2)
      expect(vm.result[0]).to.eql(vm.data)
      expect(vm.result[1]).to.eql(vm.$refs.target)
    })

    it('authority', () => {
      Vue.prototype.$ifPermission = authority => authority === 'authority'
      vm = util.createTest(Popover, { 
        buttons: [{ text: '无权限', authority: 'unauthority' }, { text: '有权限1', authority: 'authority' }, { text: '有权限2' }]
      })
      let nodes = vm.$el.querySelectorAll('.lhp-amap-popover-buttons>a')
      expect(nodes).to.length(2)
      expect(toArray(nodes).map(e => util.trim(e.textContent))).to.eql(['有权限1', '有权限2'])
    })
  })

  describe('$popover', () => {
    let vmp

    afterEach(() => {
      vmm.$lhpamap.popover.close()
    })

    it('open', async() => {
      vmm.$lhpamap.popover.open({
        map: map,
        position: center
      })
      await util.wait()
      expect(document.querySelector('.amap-info').parentNode.style.display).to.not.equal('none')
    })

    it('close', async() => {
      vmm.$lhpamap.popover.open({
        map: map,
        position: center
      })
      await util.wait()
      expect(document.querySelector('.amap-info').parentNode.style.display).to.not.equal('none')
      vmm.$lhpamap.popover.close()
      await util.wait()
      expect(document.querySelector('.amap-info').parentNode.style.display).to.equal('none')

      vmp = vmm.$lhpamap.popover.open({
        map: map,
        position: center
      })
      await util.wait()
      expect(document.querySelector('.amap-info').parentNode.style.display).to.not.equal('none')
      vmp.close()
      await util.wait()
      expect(document.querySelector('.amap-info').parentNode.style.display).to.equal('none')
    })

    it('options', async() => {
      vmp = vmm.$lhpamap.popover.open({
        map: map,
        position: center,
        options: {
          title: 'test title',
          extData: { content: 'test content' }
        }
      })
      await util.wait()
      expect(util.trim(document.querySelector('.lhp-amap-popover-title').textContent)).to.equal('test title')
      expect(vmp.title).to.equal('test title')
      expect(vmp.extData).to.have.property('content', 'test content')
    })

    it('data', async() => {
      let data = {id: 'test', name: '张三', address: '地球'}
      let field = {id: 'id', name: '名称', address: '地址'}
      vmm.$lhpamap.popover.open({
        map: map,
        position: center,
        data: data,
        options: {
          field: field
        }
      })
      let content = []
      for(let key in field) {
        let title = field[key]
        let label = data[key]
        content.push(title +'：'+ label)
      }
      await util.wait()
      let nodes = document.querySelectorAll('.lhp-amap-popover-content>div')
      expect(nodes).to.length(3)
      expect(toArray(nodes).map(e => util.trim(e.textContent))).to.eql(content)
    })

    it('instance', async() => {
      const popover = {
        template: `
          <div class="test-popover">
            {{ content }}
          </div>
        `,
        data() {
          return {
            content: undefined
          }
        }
      }
      const Constructor = Vue.extend(popover)
      let $$instance = new Constructor({
        el: document.createElement('div')
      })

      vmp = vmm.$lhpamap.popover.open({
        map: map,
        position: center,
        instance: $$instance,
        options: {
          content: 'test content'
        }
      })
      await util.wait()
      let testElm = document.querySelector('.test-popover')
      expect(testElm).to.exist
      expect(util.trim(testElm.textContent)).to.equal('test content')
    })

    it('feature', async() => {
      vm = util.createVue({
        template: `
          <lhp-amap-marker v-if="visible" :position="position" :map="map" @onCreated="onCreated"></lhp-amap-marker>
        `,
        data() {
          return {
            map: map,
            position: center,
            visible: true
          }
        },
        methods: {
          onCreated(feature) {
            this.$lhpamap.popover.open({
              map: this.map,
              position: this.position
            }, feature)
          }
        }
      })
      await util.wait()
      expect(document.querySelector('.amap-info').parentNode.style.display).to.not.equal('none')
      vm.visible = false
      await util.wait()
      expect(document.querySelector('.amap-info').parentNode.style.display).to.equal('none')
      util.destroyVM(vm)
      util.destroyVM(vmm)
    })
  })

})