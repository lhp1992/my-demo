<template>
  <my-feature :onclick="onclick" :onload="onload" :map="map"></my-feature>
</template>
<script>
export default {
  components: {
    'my-feature': () => import('./map-feature/marker')
  },
  props: ['map'],
  methods: {
    onclick (e){
      this.map.infoWindow.feature = e
      this.tableHtml.show(e.getPosition(), {
        name:"名称",
        address_name:"地址",
        branchname:"所属派出所代码",
        stationname:"所属派出所",
        tag:'类型',
        telephone:'联系电话'
      })
    },
    onload(e) {
      this.list = e.data
      this.features = e.features

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
        // butsModal: function(buts){
        //   return buts
        // },
        // modal: function(data){
        //   console.log(data)
        //   return JSON.stringify(data)
        // }
      })

      this.running = new gdMap.MarkerRunning({
        markers: this.features,
        endKey: 'center',
        map: this.map
      })
      
      this.running.startTrack(1)
      this.getPoints()
      this.t = setInterval(() => this.getPoints(), 10000)
    },
    getPoints() {
      this.$ajax.map.getPoints({}, (data) => {
        this.running.running(data)
      })
    }
  },
  destroyed () {
    clearInterval(this.t)
    this.running.remove()
  }
}
</script>
