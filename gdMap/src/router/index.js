import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/home'),
      children: [
        {
          path: '/marker',
          name: 'marker',
          component: () => import('@/components/map-feature/marker')
        }, {
          path: '/marker-custom',
          name: 'marker-custom',
          component: () => import('@/components/marker-custom')
        }, {
          path: '/marker-run',
          name: 'marker-run',
          component: () => import('@/components/marker-run')
        }, {
          path: '/markerclusterer',
          name: 'markerclusterer',
          component: () => import('@/components/map-feature/markerclusterer')
        }, {
          path: '/markerclusterer-run',
          name: 'markerclusterer-run',
          component: () => import('@/components/markerclusterer-run')
        }, {
          path: '/text',
          name: 'text',
          component: () => import('@/components/map-feature/text')
        }, {
          path: '/rectangle',
          name: 'rectangle',
          component: () => import('@/components/map-feature/rectangle')
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
        }, {
          path: '/driving-edit',
          name: 'driving-edit',
          component: () => import('@/components/driving-edit')
        }, {
          path: '/mouseTool',
          name: 'mouseTool',
          component: () => import('@/components/map-feature/mouseTool')
        }, {
          path: '/feature-more',
          name: 'feature-more',
          component: () => import('@/components/feature-more')
        }, {
          path: '/marker-title-ipt',
          name: 'marker-title-ipt',
          component: () => import('@/components/marker-title-ipt')
        }, {
          path: '/overlaygroup-add',
          name: 'overlaygroup-add',
          component: () => import('@/components/overlaygroup-add')
        }, {
          path: '/demo',
          name: 'demo',
          component: () => import('@/components/demo')
        }
      ]
    },
    {
      path: '/maps',
      name: 'maps',
      component: () => import('@/maps')
    }
  ]
})
