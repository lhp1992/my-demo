<template>
  <div class="lhp-amap-popover" :style="width ? `width: ${ width }px;` : ''">
    <div class="lhp-amap-popover-title">
      {{ title }}
    </div>
    <slot name="content">
      <div class="lhp-amap-popover-content">
        <div v-for="text, key in field">
          {{ text }}：{{ data[key] }}
        </div>
        <slot name="text-after" :data="data"></slot>
      </div>
      <div class="lhp-amap-popover-buttons">
        <slot name="buttons" :data="data" :buttons="authorityButtons">
          <template v-if="authorityButtons && authorityButtons.length > 0">
            <hr>
            操作：<template v-for="item in authorityButtons">
              <a v-if="item.action" @click="handleClick(item.action, data)">{{ item.text }}</a>
              <a v-else>{{ item.text || item }}</a>
            </template>
          </template>
        </slot>
        <slot name="buttons-after" :data="data" :buttons="authorityButtons"></slot>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'LhpAmapPopover',
  props: {
    width: Number,
    title: [String, Number],
    field: {
      type: Object,
      default() {
        return {}
      }
    },
    buttons: {
      type: Array,
      default() {
        return []
      }
    },
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    extData: undefined
  },
  computed: {
    authorityButtons() {
      return this.buttons.filter(e => {
        if(e.authority) {
          return this.$ifPermission(e.authority)
        } else {
          return true
        }
      })
    }
  },
  methods: {
    handleClick(fnc, data) {
      // fnc.bind(this)(data)
      fnc(data, this)
    }
  }
};
</script>

<style scoped>
  .lhp-amap-popover {
    width: 360px;
    font-size: 14px;
    position: relative;
    color: #777;
    padding: 8px 0 0 8px;
  }
  .lhp-amap-popover-title {
    border-bottom: 1px solid #E6E6E6;
    text-align: center;
    color: #333;
    line-height: 1;
    padding-bottom: 10px;
    font-weight: 700;

  }
  .lhp-amap-popover-content {
    line-height: 2;
    padding: 5px 0;
  }
  .lhp-amap-popover-buttons {
    
    line-height: 22px;
  }
  .lhp-amap-popover-buttons a {
    color: #3385ff;
    cursor: pointer;
    margin-right: 5px;
  }
  .lhp-amap-popover-buttons a:hover {
    color: #018efb;
  }
  .lhp-amap-popover-buttons hr {
    border: none;
    border-top: 1px solid #E6E6E6;
    margin-bottom: 4px;
  }
</style>