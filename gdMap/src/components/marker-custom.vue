<template>
  <div>
    <my-feature v-if="show" :map="map" :options="options"></my-feature>
    <div class="button-group">
      <input @click="load(null)" type="button" class="button" value="默认" id="point"/>
      <input @click="load(options_icon)" type="button" class="button" value="自定义图标" id="line"/>
      <input @click="load(options_content)" type="button" class="button" value="自定义内容" id="polygon"/>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    'my-feature': () => import('./map-feature/marker')
  },
  data() {
    return {
      show: true,
      options: null,
      options_icon:{
        default: {
          icon: './static/img1.png'
        }
      },
      options_content:{
        default: {
          offset: new AMap.Pixel(-12, -44)
        },
        onAdd: function(item){
          item.content = '<div class="gd-point">\
            <div class="gd-point-title">第'+ item.id +'个点标记</div>\
            <div class="gd-point-img"><img src="./static/img1.png"></div>\
            <i class="gd-point-i animated"></i>\
          </div>'
        },
        onClick: function(item){
          console.log(item)
        }
      },
    }
  },
  props: ['map'],
  methods: {
    load(opt) {
      this.options = opt
    }
  }
}
</script>

<style>
  .gd-point{
    text-align: center;
    /* transform: translate(-50%, -100%); */
    position: relative;
  }
  .gd-point-img{
    width: 24px;
    margin: 5px auto 0;
  }
  .gd-point-img img{
    width: 100%;
  }
  .gd-point-img.animated {
    animation-iteration-count: infinite;
    -webkit-animation-iteration-count: infinite;
  }
  .gd-point-i {
    display: block;
    width: 50px;
    height: 30px;
    overflow: hidden;
    border-radius: 100%;
    margin: 0px auto;
    transform: scale3d(.4, .4, .4);
    border: 2px solid rgba(255,255,255,.3);
    background: -webkit-radial-gradient(#d5272a 30%, transparent 80%);
    background: radial-gradient(#d5272a 30%, transparent 80%);
    position: absolute;
    bottom: -30px;
    left: 50%;
    margin-left: -25px;
  }
  .gd-point-i.animated{
    animation: pulse2 2s infinite linear;
  }
  @-webkit-keyframes pulse2 {
    from {
      -webkit-transform: scale3d(.2, .2, .2);
      transform: scale3d(.2, .2, .2);
      opacity: 1;
    }
    to {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
      opacity: 0;
    }
  }
  @keyframes pulse2 {
    from {
      -webkit-transform: scale3d(.2, .2, .2);
      transform: scale3d(.2, .2, .2);
      opacity: 1;
    }
    to {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
      opacity: 0;
    }
  }
  .gd-point .gd-point-title{
    color: #d5272a
  }
  .gd-point-title{
    text-shadow: 1px 1px 0 rgba(0,0,0,.2);
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translate(-50%, -100%);
    white-space: nowrap;
  }
</style>