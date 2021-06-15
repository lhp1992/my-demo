export const getFeatureParams = (feature, type) => {
  let _CLASS_NAME
  if(type) {
    _CLASS_NAME = 'AMap.' + type.charAt(0).toUpperCase() + type.slice(1)
  } else {
    _CLASS_NAME = feature.CLASS_NAME
  }

  switch(_CLASS_NAME) {
    case 'AMap.Marker': case 'AMap.Text':
      let position = feature.getPosition()
      return {
        position: [position.lng, position.lat]
      }
    case 'AMap.Polyline':
      return {
        path: feature.getPath().map(e => [e.lng, e.lat])
      }
    case 'AMap.Polygon':
      return {
        path: feature.toGeoJSON().geometry.coordinates
      }
    case 'AMap.Circle':
      let center = feature.getCenter()
      let radius = feature.getRadius()
      return {
        center: [center.lng, center.lat],
        radius: radius
      }
    case 'AMap.Rectangle':
      let bounds = feature.getBounds()
      let southWest = bounds.getSouthWest()
      let northEast = bounds.getNorthEast() 
      return {
        bounds: [[southWest.lng, southWest.lat], [northEast.lng, northEast.lat]]
      }
  }
}

export default {
  getFeatureParams
}