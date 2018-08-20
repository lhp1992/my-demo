import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/marker',
      name: 'marker',
      component: () => import('@/components/map-feature/marker')
    }, {
      path: '/marker-run',
      name: 'markerr-un',
      component: () => import('@/components/marker-run')
    }, {
      path: '/markerclusterer',
      name: 'markerclusterer',
      component: () => import('@/components/map-feature/markerclusterer')
    }, {
      path: '/markerclusterer-run',
      name: 'markerclusterer-un',
      component: () => import('@/components/markerclusterer-run')
    }, {
      path: '/polyline',
      name: 'polyline',
      component: () => import('@/components/map-feature/polyline')
    }, {
      path: '/polygon',
      name: 'polygon',
      component: () => import('@/components/map-feature/polygon')
    }, {
      path: '/geojson',
      name: 'geojson',
      component: () => import('@/components/map-feature/geojson')
    }, {
      path: '/circle',
      name: 'circle',
      component: () => import('@/components/map-feature/circle')
    }, {
      path: '/overlaygroup',
      name: 'overlaygroup',
      component: () => import('@/components/map-feature/overlaygroup')
    }, {
      path: '/infowindowcustom',
      name: 'infowindowcustom',
      component: () => import('@/components/infowindowcustom')
    }, {
      path: '/playback',
      name: 'playback',
      component: () => import('@/components/playback-range')
    }, {
      path: '/marker-edit',
      name: 'marker-edit',
      component: () => import('@/components/marker-edit')
    }, {
      path: '/polyline-edit',
      name: 'polyline-edit',
      component: () => import('@/components/polyline-edit')
    }, {
      path: '/polygon-edit',
      name: 'polygon-edit',
      component: () => import('@/components/polygon-edit')
    }, {
      path: '/circle-edit',
      name: 'circle-edit',
      component: () => import('@/components/circle-edit')
    }
  ]
})
