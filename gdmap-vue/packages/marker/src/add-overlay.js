import config from 'lhp-amap/packages/config'
let _default = config.getOptions('marker')

export default ({ options = {}, map, position, content, icon, extData, id, events = [] }) => {
  let feature = new AMap.Marker(Object.assign(
    {},
    _default,
    options, 
    {
      map: map,
      position: position,
      content: content,
      icon: icon,
      extData: extData
    }
  ))

  if(id) feature.$$lhpid = id
  
  for (let key in events) {
    feature.on(key, events[key])
  }

  return feature
}