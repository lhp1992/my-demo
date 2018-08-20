import * as types from '../mutation-types'
import map from '@/api/map'

const state = {
  data: null,
  features: null
}

const mutations = {
	[types.SET_MARKER_DATA] (state, msg) {
    state.data = msg
  },
  [types.SET_MARKER_FEATURES] (state, msg) {
    state.features = msg
  }
}

const actions = {
  queryMarker ({ commit }, cb) {
  	map.getMarker({}, (data) => {
      commit(types.SET_MARKER_DATA, data)
      cb(data)
    })
  },
  setFeatures ({ commit }, data) {
    commit(types.SET_MARKER_FEATURES, data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
