<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LhpAmapEditor',
  componentName: 'LhpAmapEditor',
  data() {
    return {
      vms: []
    }
  },
  methods: {
    getParams() {
      return this.vms.map(e => e.getParams())
    }
  },
  created() {
    this.$on('amap.editor.addVm', (vm) => {
      if (vm) {
        this.vms.push(vm)
      }
    })

    this.$on('amap.editor.removeVm', (vm) => {
      this.vms.splice(this.vms.indexOf(vm), 1)
    })
  }
};
</script>