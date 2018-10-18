# myGdMap

高德地图的二次封装

## 基础

方法|返回值|说明
-|-|-
gdMap.newMap(container:String/HTMLDivElement, opts:MapOptions)|MapObject|构造一个地图对象，参数container中传入地图容器DIV的ID值或者DIV对象，opts地图初始化参数对象，参数详情参看MapOptions列表。
gdMap.setMap(obj:MapObject)||设置地图对象
gdMap.getMap()|MapObject|返回地图对象
gdMap.setInfoWindow(opts:InfoWindowOptions, obj:InfoWindowObject)||修改InfoWindow的属性（InfoWindowObject参数默认为当前地图InfoWindowObject）

```
gdMap.newMap('container', {
    zoom: 15
})
```

## feature

feature为覆盖物基础。所有覆盖物都继承自feature，拥有feature全部属性、Options、方法。

featureOptions|类型|说明
-|-|-
map|MapObject|要显示该覆盖物的地图对象（默认为当前MapObject）
idKey|String|该feature的ID键名（默认id）
isShow|Boolean|feature是否显示
isEditor|Boolean|feature是否允许修改
onLoad|function(obj:feature集合对象, Array: load的data)|加载之前的回调
onAdd|function(opts: add的params, obj: 覆盖物集合对象)|对象add之前的回调
onAddEnd|function(obj: add的feature对象, obj: 覆盖物集合对象)|对象add之后的回调
onClick|function(obj: 触发事件的feature对象)|feature绑定click事件
onEvent|Object(EventObject)|feature绑定事件的键值对对象。键名：事件名称，键值：触发的回调函数（function(obj: 触发事件的feature对象)）
setContextMenu|Object(ContextMenuObject)|地图右键菜单

ContextMenuObject|类型|说明
-|-|-
title|String|右键菜单内容（可以是HTML要素字符串。）
callback|function(obj: 触发事件的feature对象)|click时的触发回调

```
var features = new gdMap.Marker({
  positionKey: 'center',
  isEditor: true,
  setContextMenu: [
    {
      title: "编辑",
      callback: function(e) {
        e.editor()
      }
    }
  ]
})
```

方法|返回值|说明
-|-|-
load(array:data)||加载数据（load会执行remove方法，清空对象。）
remove()||清空对象
add(obj:params)|obj:FeatureObject|新增（params.default：可定义单独的覆盖物Options），返回新增的FeatureObject。
del(obj:FeatureObject)||删除FeatureObject
delById(id)||根据id删除FeatureObject
getById(id)|obj:FeatureObject|查询FeatureObject
showAll||显示全部FeatureObject
hideAll||隐藏全部FeatureObject

```
var feature = features.add({
  center: [112.982279, 28.19409],
  default: {
    icon: 'myIcon.png'
  }
})
```

FeatureObject属性|类型|说明
-|-|-
del|Function|删除该FeatureObject
editor|Function|对该FeatureObject进行编辑（右键地图关闭编辑）
params|Options|add时的params
_params|Options|处理后的params

```
feature.del()
```

## 构造函数

构造函数|说明
-|-
gdMap.Marker(opt:MarkerOptions)|点标记对象集
gdMap.Polygon(opt:PolygonOptions)|多边形对象集
gdMap.Polyline(opt:PolylineOptions)|折线对象集
gdMap.Circle(opt:CircleOptions)|圆形对象集
gdMap.Rectangle(opt:RectangleOptions)|矩形对象集
gdMap.Text(opt:TextOptions)|纯文本对象集
gdMap.OverlayGroup(opt:OverlayGroupOptions)|OverlayGroup类用来包装其它覆盖物类的实例，对实例集合做整体操作
gdMap.MarkerClusterer(opt:MarkerClustererOptions)|点聚合对象集
gdMap.InfoWindowCustom(opt:InfoWindowCustomOptions)|自定义信息窗体
gdMap.MarkerRunning(opt:MarkerRunningOptions)|Marker实时运动监听
gdMap.Playback(opt:PlaybackOptions)|轨迹回放
gdMap.GeoJSON(opt:GeoJSONOptions)|根据GeoJSON绘制边界，可用于行政边界的绘制

### Marker类

MarkerOptions|类型|说明
-|-|-
contentKey|String|content键名（默认content）
positionKey|String|position键名（默认position）
default|AMap.Marker(Options)|默认的AMap.Marker样式

### Polygon类

PolygonOptions|类型|说明
-|-|-
-|-|featureOptions所有属性
pathKey|String|path键名（默认path）
default|AMap.Polygon(Options)|默认的AMap.Polygon样式

### Polyline类

PolylineOptions|类型|说明
-|-|-
pathKey|String|path键名（默认path）
default|AMap.Polyline(Options)|默认的AMap.Polyline样式

### Circle类

CircleOptions|类型|说明
-|-|-
centerKey|String|center键名（默认center）
radiusKey|String|radius键名（默认radius）
default|AMap.Circle(Options)|默认的AMap.Circle样式

### Rectangle类

RectangleOptions|类型|说明
-|-|-
boundsKey|String|bounds键名（默认bounds）
default|AMap.Rectangle(Options)|默认的AMap.Rectangle样式

### Text类

TextOptions|类型|说明
-|-|-
textKey|String|text键名（默认text）
positionKey|String|position键名（默认position）
default|AMap.Text(Options)|默认的AMap.Text样式

### OverlayGroup类

OverlayGroupOptions|类型|说明
-|-|-
(xxx)Key|-|各种覆盖物键名
typeKey|-|type键名（默认type）
defaults|Options|默认样式集

defaults|说明
-|-
all|全部覆盖物共有样式
marker,polygon,polyline,circle,text,rectangle|(AMap.Marker,AMap.Polygon...)独有样式

方法|返回值|说明
-|-|-
add,load|-|add,load时必须带参数type（marker,polygon,polyline,circle,text,rectangle）

```
var features = new gdMap.OverlayGroup({
  isEditor: true,
  setContextMenu: [
    {
      title: "删除",
      callback: function(e) {
        e.del()
      }
    },
    {
      title: "编辑",
      callback: function(e) {
        e.editor()
      }
    }
  ],
  defaults: {
    'marker': {
      icon: 'myIcon.png',
      offset: {x: -12, y: -24}
    },
    'all': {
      strokeColor: "#1791fc",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#1791fc",
      fillOpacity: 0.35
    }
  }
})
features.load([
  {
    id: '1',
    type: 'marker',
    position: [112.982279, 28.19409]
  }, {
    id: '2',
    type: 'text',
    position: [112.984279, 28.19609],
    text: '文字标记'
  }, {
    id: '3',
    type: 'polyline',
    path: [[112.982279, 28.19409], [112.984279, 28.19609], [112.984279, 28.19409]]
  }, {
    id: '4',
    type: 'polygon',
    path: [[112.982279, 28.19209], [112.984279, 28.19409], [112.984279, 28.19209]]
  }, {
    id: '5',
    type: 'circle',
    center: [112.984279, 28.19409],
    radius: 100
  }, {
    id: '6',
    type: 'rectangle',
    bounds: [[112.982279, 28.19609], [112.984279, 28.19809]]
  }
])
```

### MarkerClusterer类

点聚合继承自Marker类

MarkerClustererOptions|类型|说明
-|-|-
default|Options|MarkerClusterer默认样式
markerDefault|Options|Marker默认样式

方法|返回值|说明
-|-|-
add,remove,load,getById,delById|-|同Marker

### InfoWindowCustom类

InfoWindowCustomOptions|类型|说明
-|-|-
map|MapObject|要显示该覆盖物的地图对象（默认为当前MapObject）
title|String|信息窗体标题（可以是HTML要素字符串。）
width|Int|信息窗体宽度
field|Object|名称写自己定义的每列的字段名
buts|Array|按钮组
butClick|Function|按钮点击事件
butsModel|Function|自定义按钮
model|Function|自定义信息窗体
btnClass|String|

方法|返回值|说明
-|-|-
show(position, data)||
hide()||

```
gdMap.setInfoWindow({
    isCustom: true,
    autoMove: false
})
var tableHtml = new gdMap.InfoWindowCustom({
  width: 300,
  title: '警情详情',
  field: {name:"名称",address_name:"地址"},
  buts: ["呼叫", "指派任务"],
  // btnClass: ' ',
  butClick:function(title,data){
    if(title == "呼叫") {
      console.log(111)
    } else if (title == "指派任务") {
      console.log(222)
    }
  },
  // butsModel: function(buts){
  //   return buts
  // },
  // model: function(data){
  //   console.log(data)
  //   return JSON.stringify(data)
  // }
})
var features = new gdMap.Marker({
  onEvent: {
    'click': function(e){
      tableHtml.show(e.getPosition(), e.params)
    }
  }
})
features.add({
  position: [112.982279, 28.19409],
  name: '张三',
  address_name: '岳麓区'
})
```

### MarkerRunning类

MarkerRunningOptions|类型|说明
-|-|-
map|MapObject|要显示该覆盖物的地图对象（默认为当前MapObject）
markers|Marker类|Running的Marker类
markerClusterer|MarkerClusterer类|Running的MarkerClusterer类
endKey|String|结束点坐标key（默认end）
idKey|String|唯一id键名（默认id）
type|String|变化类型键名（默认type）
speed|Int|运动速度（默认30）
time|Int|持续时间（默认10000）

方法|返回值|说明
-|-|-
running(data)||开始坐标变换（data.type: 'add','del','change'。）
startTrack(id)||开启ID的坐标轨迹绘制
clearTrack()||结束坐标轨迹绘制
remove||清空对象 

```
gdMap.newMap('container', {
    zoom: 15
})
var markerClusterer = new gdMap.MarkerClusterer()
var MarkerRunning = new gdMap.MarkerRunning({
  markers: markerClusterer.markers,
  markerClusterer: markerClusterer
})
markerClusterer.load([
  {
    position: [112.982279, 28.19409],
    id: 1
  }, {
    position: [112.982279, 28.19409],
    id: 2
  }
])
MarkerRunning.startTrack(1)
setTimeout(function(){
  MarkerRunning.running([
    {
      id: 1,
      end: [112.992279, 28.20409],
      type: 'change'
    }, {
      id: 2,
      type: 'del'
    }, {
      id: 3,
      position: [112.982279, 28.19409],
      type: 'add'
    }
  ])
}, 1000)
```

### Playback类

PlaybackOptions|类型|说明
-|-|-
map|MapObject|要显示该覆盖物的地图对象（默认为当前MapObject）
markerDefault|AMap.Marker(Options)|默认的AMap.Marker样式
polylineDefault|AMap.Polyline(Options)|默认的AMap.Polyline样式
rate|Int|播放倍率（默认为20）
index|Int|从第几个点开始播放（默认为0）
onStart(index: 当前播放点的数组下标, speed: 速度km/h)|Function|每个点播放前的回调

方法|返回值|说明
-|-|-
setData(data)||设置轨迹坐标
pause()||暂停
play()||播放 
reload(index)||中断当前播放，并充index开始从新播放
remove()||清空对象

```
var feature = new gdMap.Playback({
  map: this.map,
  polylineDefault: {
    // strokeStyle: 'dashed',
    // strokeWeight: 1,
    strokeWeight: 7,
    showDir: true,
    strokeColor: '#f00'
  },
  onStart: function(opt){
    console.log('实时速度'+ opt.speed.toFixed(2) +'km/h')
  }
})
var data = [{"position":["112.988748","28.192613"],"time":"2018-10-18 14:43:39"},{"position":["112.988748","28.192613"],"time":"2018-10-18 14:45:39"},{"position":["112.976040","28.186521"],"time":"2018-10-18 14:47:39"},{"position":["112.987611","28.197618"],"time":"2018-10-18 14:49:39"}]
feature.setData(data)
```

### GeoJSON类

GeoJSONOptions|类型|说明
-|-|-
map|MapObject|要显示该覆盖物的地图对象（默认为当前MapObject）
ifText|Boolean|是否显示名称（默认为true）
polygonDefault|AMap.Polygon(Options)|默认的AMap.Polygon样式
textDefault|AMap.Text(Options)|默认的AMap.Text样式

方法|返回值|说明
-|-|-
load(json)||加载地图边界
showText()||显示名称
hideText()||隐藏名称 
remove()||清空对象

## 其他对象

方法|说明
-|-
gdMap.mouseTool|鼠标工具插件
gdMap.markerTitleIpt|点标记名称点击修改，用于编辑带名称点标记

### mouseTool

方法|返回值|说明
-|-|-
init(mouseToolOptions)||初始化
draw(type, options = \{})||开启绘制
close()||关闭绘制
remove()||清空对象

mouseToolOptions|类型|说明
-|-|-
map|MapObject|要显示该覆盖物的地图对象（默认为当前MapObject）
onDraw|function(\{type,obj})|鼠标工具绘制覆盖物结束时触发此事件，obj对象为绘制出来的覆盖物对象。

### markerTitleIpt

```
gdMap.newMap('container', {
    zoom: 15
})
var markerTitleIpt = gdMap.markerTitleIpt({
  icon: './static/img1.png'
})
var features = new gdMap.Marker({
  onAdd: markerTitleIpt.onAdd,
  onAddEnd: markerTitleIpt.onAddEnd
})
setTimeout(function(){
  features.add({
    position: [112.982279, 28.19409]
  })._params.$dom.find('.marker-title').click()
}, 2000)
```