import {newMap, getMap, setMap, setInfoWindow} from './map.js'
import { Marker } from './marker.js'
import { Polyline } from './polyline.js'
import { Polygon } from './polygon.js'
import { Circle } from './circle.js'
import { Rectangle } from './rectangle.js'
import { Text } from './text.js'
import OverlayGroup from './overlayGroup.js'
import MarkerClusterer from './markerClusterer.js'
import InfoWindowCustom from './infoWindowCustom.js'
import MarkerRunning from './markerRunning.js'
import Playback from './playback.js'
import GeoJSON from './geoJSON.js'
import mouseTool from './mouseTool.js'
import * as overlay from './overlay-more.js'

const gdMap = {
    newMap: newMap,
    getMap: getMap,
    setMap: setMap,
    setInfoWindow: setInfoWindow,
    Playback: Playback,
    Marker: Marker,
    Polyline: Polyline,
    Polygon: Polygon,
    Circle: Circle,
    Rectangle: Rectangle,
    Text: Text,
    OverlayGroup: OverlayGroup,
    MarkerClusterer: MarkerClusterer,
    InfoWindowCustom: InfoWindowCustom,
    MarkerRunning: MarkerRunning,
    GeoJSON: GeoJSON,
    mouseTool: mouseTool,
    markerTitleIpt: overlay.markerTitleIpt
}

window.gdMap = gdMap
