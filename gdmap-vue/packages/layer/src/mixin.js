import LhpAmapCluster from 'lhp-amap/packages/cluster'

export default {
  components: {
    LhpAmapCluster
  },
  props: {
    value: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default() { return [] }
    },
    map: {
      required: true
    },
    props: {
      type: Object,
      default() { return {} }
    },
    disabled: Boolean,
    alone: Boolean,
    gently: Boolean,
    // rebuildMethod: Function,
    markerOptions: {
      type: Object,
      default() { return {} }
    },
    clusterOptions: {
      type: Object,
      default() { return {} }
    },
    unvisibleIds: {
      type: Array,
      default() { return [] }
    },
    events: Object
  },
  data() {
    return {
      features: {},
      visible: this.value,
      isAlone: false,
      aloneList: []
    }
  },
  watch: {
    value(val) {
      this.visible = val
    },
    visible(val) {
      this.$emit('input', val)
    }
  },
  computed: {
    defaultProps() {
      return Object.assign({
        id: 'id',
        content: 'content',
        position: 'position',
      }, this.props)
    },
    listObj() {
      let obj = {}
      this.data.forEach(item => {
        obj[item[this.defaultProps.id]] = item
      })
      return obj
    },
    unvisibleIdsObj() {
      let obj = {}
      this.unvisibleIds.forEach(id => {
        obj[id] = true
      })
      return obj
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    },
    toggle() {
      this.visible ? this.hide() : this.show()
    },
    setAlone(data = []) {
      if(!this.alone) return
      this.isAlone = true
      this.aloneList = data
    },
    clearAlone() {
      if(!this.alone) return
      this.isAlone = false
      this.aloneList = []
    }
  }
}