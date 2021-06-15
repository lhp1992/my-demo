<template>
  <lhp-amap-popover title="自定义标题" :width="420" :field="field" :buttons="buttons" :data="data">
    <div slot="text-after" slot-scope="scope">
      自定义名称： {{ scope.data.content }}
    </div>
    
    <div slot="btns-after" slot-scope="scope">
      自定义操作：
      <el-link type="primary" @click="handleClick">主要链接1</el-link>
      <el-link type="primary">主要链接2</el-link>
    </div>
  </lhp-amap-popover>
</template>

<script>
export default {
  data() {
    return {
      field: {
        id: 'id',
        content: '名称',
        position: '坐标'
      },
      buttons: [
        '无绑定事件', 
        {
          text: '绑定事件',
          action(data, vm) {
            console.log(data)
            console.log(vm)
          }
        }
      ],
      data: {}
    }
  },
  methods: {
    handleClick() {
      console.log('触发点击事件')
    }
  }
};
</script>
