import Vue from 'vue'

export default new Vue ({
  data() {
    return {
      responses: {}
    }
  },
  methods: {
    GET_RESPONSE(type) {
      return this.responses[type]
    },
    SET_RESPONSE(type, value) {
      this.$set(this.responses, type, value)
    },
    ADD_RESPONS_DATA(type, value, isAfter) {
      isAfter ? this.responses[type].data.push(value) : this.responses[type].data.unshift(value)
    },
    DELETE_RESPONS_DATA(type, index) {
      this.$delete(this.responses[type].data, index)
    },
    UPDATE_RESPONS_DATA(type, index, value) {
      this.$set(this.responses[type].data, index, value)
    },
    async getResponse(type, asyncFnc) {
      if(!this.responses[type]) {
        let data = await asyncFnc()
        this.SET_RESPONSE(type, data)
      }
      return this.GET_RESPONSE(type)
    },
    add(type, value, isAfter) {
      if(!this.responses[type]) return
      this.ADD_RESPONS_DATA(type, value, isAfter)
    },
    delete(type, value) {
      if(!this.responses[type]) return
      let index = this.responses[type].findIndex(e => e.id === value.id)
      if(index !== -1) this.DELETE_RESPONS_DATA(type, index)
    },
    update(type, value) {
      if(!this.responses[type]) return
      let index = this.responses[type].findIndex(e => e.id === value.id)
      if(index !== -1) this.UPDATE_RESPONS_DATA(type, index, value)
    },
    fuzzyQuery (target, value) {
      if(!target) return false
      if(!value) return true
      let str = ['', ...value.toString(), ''].join('.*');
      let reg = new RegExp(str)
      return reg.test(target.toString())
    }
  }
})
