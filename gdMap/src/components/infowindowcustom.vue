<template>
  <my-feature :onclick="onclick" :map="map"></my-feature>
</template>
<script>
export default {
  components: {
    'my-feature': () => import('./map-feature/marker')
  },
  props: ['map'],
  methods: {
    onclick (e){
      this.tableHtml.show(e.getPosition(), {
        name:"名称",
        address_name:"地址",
        branchname:"所属派出所代码",
        stationname:"所属派出所",
        tag:'类型',
        telephone:'联系电话'   
      })
    }
  },
  mounted () {
    gdMap.setInfoWindow({
        isCustom: true,
        autoMove: false
    }, this.map.infoWindow)
    this.tableHtml = new gdMap.InfoWindowCustom({
      width: 300,
      title: '警情详情',
      field: {name:"名称",address_name:"地址",branchname:"所属派出所代码",stationname:"所属派出所",tag:'类型',telephone:'联系电话'},
      buts: ["呼叫", "指派任务"],
      // btnClass: ' ',
      butClick:function(title,data){
          if(title == "呼叫") {
              console.log(111)
          } else if (title == "指派任务") {
              console.log(222)
          }
      },
      map: this.map,
      // butsModel: function(buts){
      //   return buts
      // },
      // model: function(data){
      //   console.log(data)
      //   return JSON.stringify(data)
      // }
    })
  },
  destroyed () {
    this.tableHtml.hide()
    gdMap.setInfoWindow({
        isCustom: false,
        autoMove: true
    }, this.map.infoWindow)
  }
}
</script>

<style>
  .my_infoWindow{
    background-color: rgb(2, 44, 83);
    padding: 10px;
    border: 1px solid #3366ff;
    border-radius: 5px;
    color: #fff;
    font-size: 10px;
    position: relative;
  }
  .my_infoWindow .weui-loadmore__tips{
    border-bottom: 1px solid #154e85;
    padding-bottom: 10px;
    display: block;
    text-align: center;
    margin-bottom: 3px;
  }
  .my_iw_jt,
  .my_iw_jt:after{
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 20px solid #3366ff;
    width: 0px;
    height: 0px;
  }
  .my_iw_jt{
    margin: 0 auto;
    position: relative;
  }
  .my_iw_jt:after{
    content: '';
    border-top: 20px solid #08103f;
    display: inline-block;
    position: absolute;
    top: -3px;
    left: 0px;
    transform: translate(-50%, -100%);
  }
  .my_infoWindow .amap-info-close {
    position: absolute;
    right: 10px;
    top: 10px;
    color: red;
    text-decoration: none;
    /* font: bold 16px/14px Tahoma,Verdana,sans-serif; */
    width: 14px;
    height: 14px;
    background: #fff;
    color: #022c53 !important;
    border-radius: 100%;
    font-size: 12px;
  }
  .my_iw_main{
    line-height: 1.5;
  }
  .my_iw_main table{
    /*margin: 0 auto;*/
  }
  .my_iw_title{
    text-align: right;
    min-width: 5em;
    color: #94d8ff;
    white-space: nowrap;
  }
  .my_iw_content{
    max-height: 6em;
    overflow-y: auto;
  }
  .my_iw_colon{
    width: 1em;
    color: #94d8ff;
  }
  .my_iw_btns{
    /*text-align: right;*/
    margin-top: 3px;
    border-top: 1px solid #154e85;
    padding-top: 4px;
    line-height: 18px;
  }
  .my_iw_btn {
    color: #94d8ff;
    margin-left: 5px;
    line-height: 2;
    cursor: pointer;
    border-radius: 2px;
    text-decoration: none;
  }

  .table_Html_buts{
    color: #FFA500;
  }
  .table_Html_buts:FOCUS{
    color: #FFA500;
  }

  .my_iw_btn:focus {
    color: #3366ff;
  }
  .my_iw_btns a:hover {
    color: #33ffff;
  }
  .my_iw_top:before{
    border-left-style: solid;
    border-top-style: solid;
    border-top-left-radius: 5px;
    left: -2px;
    top: -2px;
  }
  .my_iw_top:after{
    border-right-style: solid;
    border-top-style: solid;
    border-top-right-radius: 5px;
    right: -2px;
    top: -2px;
  }
  .my_iw_bottom:before{
    border-left-style: solid;
    border-bottom-style: solid;
    border-bottom-left-radius: 5px;
    left: -2px;
    bottom: -2px;
  }
  .my_iw_bottom:after{
    border-right-style: solid;
    border-bottom-style: solid;
    border-bottom-right-radius: 5px;
    right: -2px;
    bottom: -2px;
  }
  .my_iw_top:before,
  .my_iw_top:after,
  .my_iw_bottom:before,
  .my_iw_bottom:after{
    content: '';
    border-color: #00ffff;
    border-width: 2px;
    width: 10px;
    height: 10px;
    position: absolute;
    display: block;
  }
</style>