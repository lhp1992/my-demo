<template>
  <div class="button-group">
    <my-feature :onload="onload" :onstart="onStart" :map="map"></my-feature>
    <input @click="play" class="button" type="button" value="播放">
    <input @click="pause" class="button" type="button" value="暂停">
    <input type="hidden" class="slider-input" value="">
  </div>
</template>

<script>
import range from '../assets/jquery.range.js'
export default {
  components: {
    'my-feature': () => import('./map-feature/playback')
  },
  props: ['map'],
  methods: {
    onload(e) {
      this.playback = e.feature
      this.len = e.data.length - 1
    },
    onStart(opt) {
      console.log('实时速度'+ opt.speed.toFixed(2) +'km/h')
      var n = Math.round(opt.index / this.len * 100) || 0
      $('.slider-input').jRange('setValue', n.toString());
    },
    play() {
      this.playback.play()
    },
    pause() {
      this.playback.pause()
    }
  },
  mounted() {
    var _this = this
    $('.slider-input').jRange({
      from: 0,
      to: 100,
      width: 300,
      ondragstar: function(){
        _this.playback.onStart = null
      },
      ondragend: function(e){
        _this.playback.onStart = _this.onStart
        var index = Math.ceil(e / 100 * _this.len)
        _this.playback.reload(index)
      },
      onbarclicked: function(e){
        var index = Math.ceil(e / 100 * _this.len)
        _this.playback.reload(index)
      }
    });
  }
}
</script>
<style>
  @import "../assets/jquery.range.css";
  .slider-container {
    display: inline-block;
  }
</style>

<style scoped>
  .button-group {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 12px;
    padding: 10px;
  }
  .button-group .button {
    height: 28px;
    line-height: 28px;
    background-color: #0D9BF2;
    color: #FFF;
    border: 0;
    outline: none;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 3px;
    margin-bottom: 4px;
    cursor: pointer;
  }
  .slider-container{
    display: inline-block;
  }
</style>
