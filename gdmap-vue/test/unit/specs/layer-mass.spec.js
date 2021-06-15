import * as turf from '@turf/turf'
import * as util from '../util'
import Mock from 'mockjs'
import Vue from 'vue'
import LayerMass from 'lhp-amap/packages/layer-mass'
Vue.use(LayerMass)

describe('LayerMass', () => {
  let vmm, vm, map, center, bbox

  const getPoints = (len) => {
    const pointsGeo = turf.randomPoint(len, {bbox: bbox})
    const points = turf.coordAll(pointsGeo).map(e => {
      return Mock.mock({
        position: e,
        id: '@id',
        content: '@cname'
      })
    })
    return points
  }

  const createLayer = function(props, data) {
    return util.createVue({
      template: `
        <lhp-amap-layer-mass ref="layer" :map="map" ${props}></lhp-amap-layer-mass>
      `,
      data() {
        return {
          map,
          ...data
        }
      }
    })
  }

  it('amap created', async() => {
    vmm = await util.createAMap()
    map = vmm.map
    center = map.getCenter().toString().split(',').map(e => parseFloat(e))
    bbox = map.getBounds().toString().replace(';', ',').split(',').map(e => parseFloat(e))
    expect(vmm.$el.querySelector('.amap-maps')).to.exist
  })

  describe('layer visible', () => {
    let $$cluster, $$layer

    it('layer created', async() => {
      vm = createLayer('v-model="visible"', {visible: true})
      await util.wait(300)
      $$layer = vm.$refs.layer
      $$cluster = $$layer.$refs.cluster.$$cluster
      expect($$cluster).to.exist
      expect($$cluster.constructor).to.equal(AMap.MarkerClusterer)

      expect(vm.visible).to.true
      expect($$layer.visible).to.true
    })

    it('hide', async() => {
      $$layer.hide()
      await util.wait()
      expect(vm.visible).to.false
      expect($$layer.visible).to.false
    })

    it('show', async() => {
      $$layer.show()
      await util.wait()
      expect(vm.visible).to.true
      expect($$layer.visible).to.true
    })

    it('toggle', async() => {
      $$layer.toggle()
      await util.wait()
      expect(vm.visible).to.false
      expect($$layer.visible).to.false

      $$layer.toggle()
      await util.wait()
      expect(vm.visible).to.true
      expect($$layer.visible).to.true
    })

    it('update visible', async() => {
      vm.visible = false
      await util.wait()
      expect(vm.visible).to.false
      expect($$layer.visible).to.false
      util.destroyVM(vm)
    })
  })

  it('layer unvalue toggle', async() => {
    vm = util.createTest(LayerMass, {map: map})
    await util.wait(300)
    let $$cluster = vm.$refs.cluster.$$cluster

    vm.toggle()
    await util.wait()
    expect(vm.visible).to.false
    expect($$cluster.getMap()).to.null

    vm.toggle()
    await util.wait()
    expect(vm.visible).to.true
    expect($$cluster.getMap()).to.not.null
    util.destroyVM(vm)
  })

  it('disabled', async() => {
    vm = util.createTest(LayerMass, {map: map, disabled: true, alone: true})
    await util.wait(300)
    const $$cluster = vm.$refs.cluster.$$cluster
    expect($$cluster.visible).to.not.ok

    vm.setAlone([])
    await util.wait(300)

    const $$clusterAlone = vm.$refs.clusterAlone.$$cluster
    expect($$clusterAlone.visible).to.not.ok
    
    util.destroyVM(vm)
  })

  it('unvisibleIds', async() => {
    let points = getPoints(10)
    vm = util.createTest(LayerMass, {map: map, data: points, unvisibleIds: [points[0].id]})
    await util.wait(300)
    let $$cluster = vm.$refs.cluster.$$cluster
    let markers = $$cluster.getMarkers()
    expect(markers).to.length(9)
    util.destroyVM(vm)
  })

  describe('data', () => {
    let $$cluster

    it('created', async() => {
      let points = getPoints(10)
      let contents = points.map(e => e.content).join(',')
      vm = createLayer(':data="points"', {points: points})
      await util.wait(300)
      $$cluster = vm.$refs.layer.$refs.cluster.$$cluster
      let currentMarkers = $$cluster.getMarkers()
      expect($$cluster).to.exist
      expect($$cluster.constructor).to.equal(AMap.MarkerClusterer)
      expect(currentMarkers).to.length(10)
      expect(currentMarkers.map(e => e.getContent()).join(',')).to.equal(contents)
    })

    it('update list', async() => {
      let points = getPoints(20)
      let contents = points.map(e => e.content).join(',')
      vm.$set(vm, 'points', points)
      await util.wait(300)
      let currentMarkers = $$cluster.getMarkers()
      expect(currentMarkers).to.length(20)
      expect(currentMarkers.map(e => e.getContent()).join(',')).to.equal(contents)
    })
  })

  describe('alone', () => {
    let $$layer, $$refCluster, $$refClusterAlone, $$cluster, $$clusterAlone

    describe('unhasData', () => {
      it('created', () => {
        vm = createLayer(':data="points" alone', {points: []})
        $$layer = vm.$refs.layer
        $$refClusterAlone = $$layer.$refs.clusterAlone
        $$clusterAlone = $$refClusterAlone.$$cluster
        expect($$clusterAlone).to.exist
        expect($$clusterAlone.constructor).to.equal(AMap.MarkerClusterer)
      })

      let points, contents
      it('setAlone', async() => {
        points = getPoints(10)
        contents = points.map(e => e.content).join(',')
        $$layer.setAlone(points)
        await util.wait(300)
        let markers = $$clusterAlone.getMarkers()
        expect(markers).to.length(10)
        expect(markers.map(e => e.getContent()).join(',')).to.equal(contents)
      })

      it('clearAlone', async() => {
        $$layer.clearAlone()
        await util.wait(300)
        expect($$refClusterAlone.visible).to.false
      })

      it('clearAlone after setAlone', async() => {
        points = getPoints(20)
        contents = points.map(e => e.content).join(',')
        $$layer.setAlone(points)
        await util.wait(300)
        let markers = $$clusterAlone.getMarkers()
        expect($$refClusterAlone.visible).to.true
        expect(markers).to.length(20)
        expect(markers.map(e => e.getContent()).join(',')).to.equal(contents)
      })

      it('setAlone duplicate data', async() => {
        $$layer.setAlone(points)
        await util.wait(300)
        let markers = $$clusterAlone.getMarkers()
        expect(markers).to.length(20)
        expect(markers.map(e => e.getContent()).join(',')).to.equal(contents)
      })

      it('setAlone repeat data', async() => {
        points = getPoints(10)
        vm.points = points
        await util.wait(300)
        let alonePoints = points.concat(getPoints(10))
        contents = alonePoints.map(e => e.content).join(',')
        $$layer.setAlone(alonePoints)
        await util.wait(300)
        let markers = $$clusterAlone.getMarkers()
        expect(markers).to.length(20)
        expect(markers.map(e => e.getContent()).join(',')).to.equal(contents)
        util.destroyVM(vm)
      })
    })

    describe('hasData', () => {
      let value = getPoints(10)
      let valueContents = value.map(e => e.content).join(',')

      it('created', async() => {
        vm = createLayer(':data="points" alone', {points: value})
        await util.wait(300)

        $$layer = vm.$refs.layer
        $$refClusterAlone = $$layer.$refs.clusterAlone
        $$refCluster = $$layer.$refs.cluster
        $$clusterAlone = $$layer.$refs.clusterAlone.$$cluster
        $$cluster = $$layer.$refs.cluster.$$cluster
        expect($$refCluster.visible).to.true
        expect($$cluster.getMarkers()).to.length(10)
        expect($$refClusterAlone.visible).to.false
      })

      it('setAlone', async() => {
        let points = getPoints(20)
        let contents = points.map(e => e.content).join(',')
        $$layer.setAlone(points)
        await util.wait(300)

        expect($$refCluster.visible).to.false
        expect($$refClusterAlone.visible).to.true

        let markers = $$clusterAlone.getMarkers()
        expect(markers).to.length(20)
        expect(markers.map(e => e.getContent()).join(',')).to.equal(contents)
      })

      it('setAlone equal data', async() => {
        $$layer.setAlone(value)
        await util.wait(300)

        expect($$refCluster.visible).to.false
        expect($$refClusterAlone.visible).to.true

        let markers = $$clusterAlone.getMarkers()
        expect(markers).to.length(10)
        expect(markers.map(e => e.getContent()).join(',')).to.equal(valueContents)
      })

      it('hasAlone toggle', async() => {
        expect($$layer.visible).to.true
        expect($$refCluster.visible).to.false
        expect($$refClusterAlone.visible).to.true

        $$layer.hide()
        await util.wait()
        expect($$layer.visible).to.false
        expect($$refCluster.visible).to.false
        expect($$refClusterAlone.visible).to.true

        $$layer.show()
        await util.wait()
        expect($$layer.visible).to.true
        expect($$refCluster.visible).to.false
        expect($$refClusterAlone.visible).to.true
      })

      it('unhasAlone toggle', async() => {
        $$layer.clearAlone()
        await util.wait()
        expect($$layer.visible).to.true
        expect($$refCluster.visible).to.true
        expect($$refClusterAlone.visible).to.false

        $$layer.hide()
        await util.wait()
        expect($$layer.visible).to.false
        expect($$refCluster.visible).to.false
        expect($$refClusterAlone.visible).to.false

        $$layer.show()
        await util.wait()
        expect($$layer.visible).to.true
        expect($$refCluster.visible).to.true
        expect($$refClusterAlone.visible).to.false
      })
    })

    it('unalone setAlone', async() => {
      vm = createLayer()
      $$layer = vm.$refs.layer
      $$refClusterAlone = $$layer.$refs.clusterAlone
      expect($$refClusterAlone).to.not.exist

      let points = getPoints(10)
      $$layer.setAlone(points)
      await util.wait(300)
      expect($$refClusterAlone).to.not.exist
    })

    it('unalone clearAlone', async() => {
      $$layer.clearAlone()
      await util.wait(300)
      expect($$refClusterAlone).to.not.exist
      util.destroyVM(vm)
    })
  })
})