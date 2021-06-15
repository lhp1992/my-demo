import * as util from '../util'
import Vue from 'vue'
import $$compute from 'lhp-amap/packages/compute'

describe('Compute', () => {
  describe('getFeatureParams', () => {
    let result, marker, polyline, polygon, circle, rectangle, rectanglePolygon
    
    it('loadAMapJs', async() => {
      await util.loadAMapJs()
      expect(AMap).to.exist

      marker = new AMap.Marker({ position: [116.43, 39.92] })
      polyline = new AMap.Polyline({ path: [[116.41, 39.93], [116.43, 39.91]] })
      polygon = new AMap.Polygon({ path: [[116.46, 39.93], [116.44, 39.91], [116.49, 39.91]] })
      circle = new AMap.Circle({ center: [116.39, 39.92], radius: 1000 })
      rectangle = new AMap.Rectangle({ bounds: new AMap.Bounds([116.35, 39.91], [116.37, 39.93]) })
      rectanglePolygon = new AMap.Polygon({ path: [[116.35, 39.91], [116.35, 39.93], [116.37, 39.93], [116.37, 39.91], [116.35, 39.91]] })
    })

    it('AMap.Marker', () => {
      result = $$compute.getFeatureParams(marker)
      expect(result).to.have.deep.property('position', [116.43, 39.92])
    })

    it('AMap.Polyline', () => {
      result = $$compute.getFeatureParams(polyline)
      expect(result).to.have.deep.property('path', [[116.41, 39.93], [116.43, 39.91]])
    })

    it('AMap.Polygon', () => {
      result = $$compute.getFeatureParams(polygon)
      expect(result).to.have.deep.property('path')
    })

    it('AMap.Circle', () => {
      result = $$compute.getFeatureParams(circle)
      expect(result).to.have.deep.property('center', [116.39, 39.92])
      expect(result).to.have.deep.property('radius', 1000)
    })

    it('AMap.Rectangle', () => {
      result = $$compute.getFeatureParams(rectangle)
      expect(result).to.have.deep.property('bounds', [[116.35, 39.91], [116.37, 39.93]])
    })

    it('type', () => {
      result = $$compute.getFeatureParams(rectanglePolygon)
      expect(result).to.not.have.deep.property('bounds')
      expect(result).to.have.deep.property('path')
      result = $$compute.getFeatureParams(rectanglePolygon, 'rectangle')
      expect(result).to.have.deep.property('bounds')
      expect(result).to.not.have.deep.property('path')
    })
  })

})