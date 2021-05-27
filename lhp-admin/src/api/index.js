import $$cache from './cache'

import * as loginServer from './loginServer'
export * from './loginServer'

export default {
  install (Vue, options) {
    Vue.prototype.$api = {
      $$cache,
      ...loginServer
    }
  }
}
