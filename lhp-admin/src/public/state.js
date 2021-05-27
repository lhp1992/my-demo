import Vue from 'vue'

export const state = new Vue ({
  data() {
    return {
      waits: 0
    }
  },
  computed: {
    waiting() {
      return this.waits > 0 ? true : false
    }
  }
})

export default {
  install (Vue, options) {
    Vue.prototype.$state = state
  }
}