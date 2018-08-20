let map
let contextMenu
let infoWindow

function setMap (id, opt = {}, parmas = {}) {
    map = new AMap.Map(id, (opt || {})) // eslint-disable-line
    !parmas.notContextMenu && (contextMenu = new AMap.ContextMenu()) // eslint-disable-line
    !parmas.notInfoWindow && (infoWindow = new AMap.InfoWindow()) // eslint-disable-line
    return map
}

function getMap () {
    return map
}

function getContextMenu () {
    return contextMenu
}

function setInfoWindow (opt = {}) {
    for (let key in opt) {
        infoWindow.set(key, opt[key])
    }
}

function getInfoWindow () {
    return infoWindow
}

export {map, setMap, getMap, contextMenu, getContextMenu, infoWindow, setInfoWindow, getInfoWindow}
