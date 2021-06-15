import * as turf from '@turf/turf'
import Mock from 'mockjs'

let bbox

const initBbox = () => {
  if(!bbox) bbox = window.$$amap.getBounds().toString().replace(';', ',').split(',').map(e => parseFloat(e))
}

export const getPoints = (number = 1) => {
  initBbox()
  const pointsGeo = turf.randomPoint(number, {bbox: bbox})
  return turf.coordAll(pointsGeo)
}

export const getPointList = (number = 1) => {
  return getPoints(number).map(e => {
    return Mock.mock({
      position: e,
      id: '@id',
      name: '@cname'
    })
  })
}

export const getLines = (number = 1, length = 10) => {
  initBbox()
  let target = []
  let lineStrings = turf.randomLineString(number, {bbox: bbox, num_vertices: length, max_length: 0.2})
  turf.geomEach(lineStrings, (geojson) => target.push(turf.getCoords(geojson)))
  return target
}

export const getPolygons = (number = 1, length = 10) => {
  initBbox()
  let target = []
  let polygons = turf.randomPolygon(number, {bbox: bbox, num_vertices: length, max_radial_length: 0.2})
  turf.geomEach(polygons, (geojson) => target.push(turf.getCoords(geojson)[0]))
  return target
}

export const getCircles = (number = 1) => {
  initBbox()
  let points = getPoints(number)
  return points.map(e => {
    return Mock.mock({
      center: e,
      'radius|5000-10000': 0
    })
  })
}

export const getBounds = (number = 1) => {
  initBbox()
  let lines = getLines(number)
  return lines.map(e => {
    let bounds = [[], []]
    if(e[0][0] > e[1][0]) {
      bounds[0][0] = e[1][0]
      bounds[1][0] = e[0][0]
    } else {
      bounds[0][0] = e[0][0]
      bounds[1][0] = e[1][0]
    }
    if(e[0][1] > e[1][1]) {
      bounds[0][1] = e[1][1]
      bounds[1][1] = e[0][1]
    } else {
      bounds[0][1] = e[0][1]
      bounds[1][1] = e[1][1]
    }
    return bounds
  })
}

export default {
  install (Vue, options) {
    Vue.prototype.$units = {
      getPoints,
      getPointList,
      getLines,
      getPolygons,
      getCircles,
      getBounds
    }
  }
}

