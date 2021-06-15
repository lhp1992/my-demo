import * as turf from '@turf/turf'
import * as util from '../util'
import Vue from 'vue'
import Cluster from 'lhp-amap/packages/cluster'
Vue.use(Cluster)

describe('Cluster', () => {
  let vmm, vm, map, center, bbox

  it('amap created', async() => {
    vmm = await util.createAMap()
    map = vmm.map
    center = map.getCenter().toString().split(',').map(e => parseFloat(e))
    bbox = map.getBounds().toString().replace(';', ',').split(',').map(e => parseFloat(e))
    expect(vmm.$el.querySelector('.amap-maps')).to.exist
  })

  it('cluster created', async() => {
    vm = util.createTest(Cluster, {map: map})
    await util.wait(500)
    expect(vm.$$cluster).to.exist
    expect(vm.$$cluster.constructor).to.equal(AMap.MarkerClusterer)
    util.destroyVM(vm)
  })

  const createCluster = function(props, data) {
    return util.createVue({
      template: `
        <lhp-amap-cluster ref="overlay" :map="map" ${props}></lhp-amap-cluster>
      `,
      data() {
        return {
          map,
          ...data
        }
      }
    })
  }

  it('visible', async() => {
    vm = createCluster(':visible="visible"', { visible: false })
    await util.wait(300)
    expect(vm.$refs.overlay.$$cluster.getMap()).to.null
  })
  
  it('update visible', async() => {
    vm.visible = true
    await util.wait()
    expect(vm.$refs.overlay.$$cluster.getMap()).to.equal(map)

    vm.visible = false
    await util.wait()
    expect(vm.$refs.overlay.$$cluster.getMap()).to.null
    util.destroyVM(vm)
  })

  const getMarkers = () => {
    let position = turf.randomPosition(bbox)
    return new AMap.Marker({
      position: position
    })
  }

  it('features', async() => {
    let marker = getMarkers()
    vm = createCluster(':features="features" :gently="gently" :visible="visible"', { features: [marker], gently: false, visible: true })
    await util.wait(300)
    let $$cluster = vm.$refs.overlay.$$cluster
    let currentMarkers = $$cluster.getMarkers()
    expect(currentMarkers).to.length(1)
    expect(currentMarkers[0]).to.equal(marker)
  })

  it('update features', async() => {
    let marker1 = getMarkers()
    let marker2 = getMarkers()
    vm.features = [marker1, marker2]
    await util.wait(300)
    let $$cluster = vm.$refs.overlay.$$cluster
    let currentMarkers = $$cluster.getMarkers()
    expect(currentMarkers).to.length(2)
    expect(currentMarkers[0]).to.equal(marker1)
    expect(currentMarkers[1]).to.equal(marker2)

    vm.features = []
    await util.wait(300)
    expect($$cluster.getMarkers()).to.length(0)
  })

  it('update features gently', async() => {
    vm.gently = true
    let marker1 = getMarkers()
    let marker2 = getMarkers()
    vm.features = [marker1, marker2]
    await util.wait(300)
    let $$cluster = vm.$refs.overlay.$$cluster
    let currentMarkers = $$cluster.getMarkers()
    expect(currentMarkers).to.length(2)
    expect(currentMarkers[0]).to.equal(marker1)
    expect(currentMarkers[1]).to.equal(marker2)

    let marker3 = getMarkers()
    vm.features = [marker3]
    await util.wait(300)
    currentMarkers = $$cluster.getMarkers()
    expect(currentMarkers).to.length(1)
    expect(currentMarkers[0]).to.equal(marker3)

    vm.features = []
    await util.wait(300)
    expect($$cluster.getMarkers()).to.length(0)
  })

  it('update features unvisible', async() => {
    vm.visible = false
    await util.wait(300)
    let marker1 = getMarkers()
    let marker2 = getMarkers()
    vm.features = [marker1, marker2]
    await util.wait(300)
    vm.visible = true
    await util.wait(300)

    let $$cluster = vm.$refs.overlay.$$cluster
    let currentMarkers = $$cluster.getMarkers()
    expect(currentMarkers).to.length(2)
    expect(currentMarkers[0]).to.equal(marker1)
    expect(currentMarkers[1]).to.equal(marker2)
    util.destroyVM(vm)
    util.destroyVM(vmm)
  })
})