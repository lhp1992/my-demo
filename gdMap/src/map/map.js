let map

function newMap (id, opt = {}, parmas = {}) {
    map = new AMap.Map(id, (opt || {})) // eslint-disable-line
    !parmas.notContextMenu && (map.contextMenu = new AMap.ContextMenu()) // eslint-disable-line
    !parmas.notInfoWindow && (map.infoWindow = new AMap.InfoWindow()) // eslint-disable-line
    return map
}

function setMap (_map) {
    map = _map
}

function getMap () {
    return map
}

function setInfoWindow (opt = {}, infoWindow) {
    const _infoWindow = infoWindow || map.infoWindow
    for (let key in opt) {
        _infoWindow.set(key, opt[key])
    }
}

export {map, newMap, setMap, getMap, setInfoWindow}
