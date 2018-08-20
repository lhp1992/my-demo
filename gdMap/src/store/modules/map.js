import * as types from '../mutation-types'
import map from '@/api/map'

const state = {
  ftObjects: {}
}

const mutations = {
	[types.SET_MARKER_DATA] (state, msg) {
    let obj = state.ftObjects
    obj[msg.key] = {
      data: msg.data
    }
  },
  [types.SET_MARKER_FEATURES] (state, msg) {
    let obj = state.ftObjects[msg.key]
    obj = Object.assign({}, obj, {
      features: msg.features
    })
  }
}

const actions = {
  queryMarker ({ commit }, msg) {
  	map.queryData(msg.key, (msg.params || {}), (data) => {
      commit(types.SET_MARKER_DATA, {
        key: msg.key,
        data: data
      })
      msg.cb(data)
    })
  },
  setFeatures ({ commit }, msg) {
    commit(types.SET_MARKER_FEATURES, msg)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
