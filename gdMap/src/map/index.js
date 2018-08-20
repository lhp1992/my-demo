import {getMap, setMap, getContextMenu, getInfoWindow, setInfoWindow} from './map.js'
import { Marker } from './marker.js'
import { Polyline } from './polyline.js'
import { Polygon } from './polygon.js'
import { Circle } from './circle.js'
import OverlayGroup from './overlayGroup.js'
import MarkerClusterer from './markerClusterer.js'
import InfoWindowCustom from './infoWindowCustom.js'
import MarkerRunning from './markerRunning.js'
import Playback from './playback.js'
import GeoJSON from './geoJSON.js'

const gdMap = {
    getMap: getMap,
    setMap: setMap,
    getContextMenu: getContextMenu,
    getInfoWindow: getInfoWindow,
    setInfoWindow: setInfoWindow,
    Playback: Playback,
    Markers: Marker,
    Polylines: Polyline,
    Polygons: Polygon,
    Circles: Circle,
    OverlayGroup: OverlayGroup,
    MarkerClusterer: MarkerClusterer,
    InfoWindowCustom: InfoWindowCustom,
    MarkerRunning: MarkerRunning,
    GeoJSON: GeoJSON
}

window.gdMap = gdMap
