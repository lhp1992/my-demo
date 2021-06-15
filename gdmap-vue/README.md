# gdmap-vue

> 基于Vue的高德地图组件

## Build Setup

``` bash
# 运行demo示例
npm run dev

# 打包完整组件
npm run build

# 按组件进行打包
npm run build:component

# 打包demo示例
npm run build:demo

# 单元测试
npm run unit
```

## Amap
地图组件

### Amap Attributes
参数|说明|类型|可选值|默认值
-|-|-|-|-
options|同高德地图Options|Object|-|{}

### Amap Events
事件名|说明|参数
-|-|-
onLoad|地图渲染完成后触发（map对象也会赋值给全局window.$$amap）|map

### Amap Ref Data
事件名|说明
-|-
zoom|地图当前层级（响应式），可通过map.$$vue.zoom或者$refs.map.zoom获取（用于一些需要监听zoom进行响应式操作的场合）

### Amap Scoped Slot
name|说明
-|-
-|地图渲染完成后才渲染的内容，参数为 { map }

``` vue
<lhp-amap @onLoad="map => {}" :options="{}"></lhp-amap>
```

## Marker

### Marker Attributes
参数|说明|类型|可选值|默认值
-|-|-|-|-
options|同高德地图Options|Object|-|{}
id|marker对象id，feature对象通过feature.$$lhpid获取|-|-|-
events|为feature绑定的事件对象（{click: handleClick, dragend: handleDragend}）|Object|-|{}
feature|AMap.Marker对象，不为空时将不会new AMap.Marker()（用于一些需缓存feature对象的场合）|AMap.Marker|-|-

### Marker Attributes(响应式)
参数|说明|类型|可选值|默认值
-|-|-|-|-
map|地图对象|AMap.Map|-|-
position|坐标|Array|-|-
content|显示内容|-|-|-
icon|显示的图标|-|-|-
extData|自定义属性|-|-|-

### Marker Events
事件名|说明|参数
-|-|-
onCreated|feature对象生成后触发|feature
onDestroyed|feature对象销毁前触发|feature

### Marker Feature Events
事件名|说明|参数
-|-|-
dreated|feature对象销毁前触发（this.$$feature.emit('destroyed', this)）|vm

## Text

### Text Attributes
参数|说明|类型|可选值|默认值
-|-|-|-|-
options|同高德地图Options|Object|-|{}
events|为feature绑定的事件对象（{click: handleClick, dragend: handleDragend}）|Object|-|{}

### Text Attributes(响应式)
参数|说明|类型|可选值|默认值
-|-|-|-|-
map|地图对象|AMap.Map|-|-
position|坐标|Array|-|-
text|文本内容|-|-|-
extData|自定义属性|-|-|-

### Text Events
事件名|说明|参数
-|-|-
onCreated|feature对象生成后触发|feature
onDestroyed|feature对象销毁前触发|feature

### Text Feature Events
事件名|说明|参数
-|-|-
dreated|feature对象销毁前触发（this.$$feature.emit('destroyed', this)）|vm

## Polygon/Polyline

### Polygon/Polyline Attributes
参数|说明|类型|可选值|默认值
-|-|-|-|-
options|同高德地图Options|Object|-|{}
events|为feature绑定的事件对象（{click: handleClick, dragend: handleDragend}）|Object|-|{}

### Polygon/Polyline Attributes(响应式)
参数|说明|类型|可选值|默认值
-|-|-|-|-
map|地图对象|AMap.Map|-|-
path|路径|Array|-|-
extData|自定义属性|-|-|-

### Polygon/Polyline Events
事件名|说明|参数
-|-|-
onCreated|feature对象生成后触发|feature
onDestroyed|feature对象销毁前触发|feature

### Polygon/Polyline Feature Events
事件名|说明|参数
-|-|-
dreated|feature对象销毁前触发（this.$$feature.emit('destroyed', this)）|vm

## Circle

### Circle Attributes
参数|说明|类型|可选值|默认值
-|-|-|-|-
options|同高德地图Options|Object|-|{}
events|为feature绑定的事件对象（{click: handleClick, dragend: handleDragend}）|Object|-|{}

### Circle Attributes(响应式)
参数|说明|类型|可选值|默认值
-|-|-|-|-
map|地图对象|AMap.Map|-|-
center|中心点|Array|-|-
radius|半径|Number|-|-
extData|自定义属性|-|-|-

### Circle Events
事件名|说明|参数
-|-|-
onCreated|feature对象生成后触发|feature
onDestroyed|feature对象销毁前触发|feature

### Circle Feature Events
事件名|说明|参数
-|-|-
dreated|feature对象销毁前触发（this.$$feature.emit('destroyed', this)）|vm

## Rectangle

### Rectangle Attributes
参数|说明|类型|可选值|默认值
-|-|-|-|-
options|同高德地图Options|Object|-|{}
events|为feature绑定的事件对象（{click: handleClick, dragend: handleDragend}）|Object|-|{}

### Rectangle Attributes(响应式)
参数|说明|类型|可选值|默认值
-|-|-|-|-
map|地图对象|AMap.Map|-|-
bounds|矩形范围[southWest:Array, northEast:Array]|Array|-|-
extData|自定义属性|-|-|-

### Rectangle Events
事件名|说明|参数
-|-|-
onCreated|feature对象生成后触发|feature
onDestroyed|feature对象销毁前触发|feature

### Rectangle Feature Events
事件名|说明|参数
-|-|-
dreated|feature对象销毁前触发（this.$$feature.emit('destroyed', this)）|vm

``` vue
<template>
  <lhp-amap :options="{center: center, zoom: 13}">
    <template slot-scope="{map}">
      <lhp-amap-marker :map="map" :position="center" :events="events"></lhp-amap-marker>
      <lhp-amap-polyline :map="map" :path="line" :events="events"></lhp-amap-polyline>
      <lhp-amap-polygon :map="map" :path="polygon" :events="events"></lhp-amap-polygon>
      <lhp-amap-text :map="map" :position="text" text="text" :events="events"></lhp-amap-text>
      <lhp-amap-circle :map="map" :center="circle" :radius="1000" :events="events"></lhp-amap-circle>
      <lhp-amap-rectangle :map="map" :bounds="bounds" :events="events"></lhp-amap-rectangle>
    </template>
  </lhp-amap>
</template>

<script>
export default {
  data() {
    return {
      events: {click: this.handleClick},
      center: [116.43, 39.92],
      line: [[116.41, 39.93], [116.43, 39.91]],
      polygon: [[116.46, 39.93], [116.44, 39.91], [116.49, 39.91]],
      text: [116.41, 39.92],
      circle: [116.39, 39.92],
      bounds: [[116.35, 39.91], [116.37, 39.93]]
    }
  },
  methods: {
    handleClick(feature) {
      console.log(feature)
    }
  }
};
</script>
```

## Cluster
点聚合

### Cluster Attributes
参数|说明|类型|可选值|默认值
-|-|-|-|-
options|同高德地图Options|Object|-|{}
map|地图对象|AMap.Map|-|-
gently|是否平缓的改变点标记集合（为true会对新旧值进行对比，分别执行addMarkers和removeMarkers方法。为false会直接执行setMarkers方法）|Boolean|-|false

### Cluster Attributes(响应式)
参数|说明|类型|可选值|默认值
-|-|-|-|-
features|需要进行聚合显示的点标记集合|Array|-|[]
visible|是否可见|Boolean|-|true

``` vue
<template>
  <lhp-amap :options="{center: center}">
    <template slot-scope="{map}">
      <lhp-amap-cluster :map="map" :features="features"></lhp-amap-cluster>
      <lhp-amap-marker v-for="point, index in points" :position="point" :key="index" @onCreated="feature => features.push(feature)"></lhp-amap-marker>
    </template>
  </lhp-amap>
</template>

<script>
export default {
  data() {
    return {
      center: [116.43, 39.92],
      points: [[116.46, 39.93], [116.44, 39.91], [116.49, 39.91]],
      features: []
    }
  }
};
</script>
```

## Layer/LayerMass
点集合，包含点聚合。  
Layer用于数据量不大，但数据需响应式的场景。  
LayerMass用于数据量较大，但数据不需响应式的场景。

### Layer/LayerMass Attributes
参数|说明|类型|可选值|默认值
-|-|-|-|-
value/v-model|是否可见|Boolean|-|-true
data|点标记列表|Array|-|-
map|地图对象|AMap.Map|-|-
props|配置选项，具体看下表|Object|-|-
disabled|禁用|Boolean|-|false
alone|单独显示模式（用于一些条件查询场合，无论visible是否为true都会显示点集合。）|Boolean|-|false
gently|是否平缓的改变点标记集合（为true会对新旧值进行对比，分别执行addMarkers和removeMarkers方法。为false会直接执行setMarkers方法）|Boolean|-|false
markerOptions|同高德地图Options|Boolean|-|false
clusterOptions|同高德地图Options|Boolean|-|false
unvisibleIds|禁用的点位id数组（进行编辑操作的场合可用）|Array|-|[]

### Layer/LayerMass props
参数|说明|类型|可选值|默认值
-|-|-|-|-
id|指定id为节点对象的某个属性值|-|-|id
content|指定显示内容为节点对象的某个属性值|-|-|content
position|指定坐标为节点对象的某个属性值|Array|-|-

### Layer/LayerMass Methods
方法名|说明|参数
-|-|-
show|显示|-
hide|隐藏|-
toggle|切换显示/隐藏|-
setAlone|设置单独显示列表|(list:Array)
clearAlone|清除单独显示|-

## Editor
由EditorMarker、EditorPolyline、EditorPolygon、EditorCircle、EditorRectangle等控件组成，用编辑、修改数据

### Editor Methods
方法名|说明|参数
-|-|-
getParams|获取所有编辑项的参数数组|(params:Array[{id: id, extData: extData, params: params:Object{具体值根据featrue参照下表}}])

## EditorMarker/EditorPolyline/EditorPolygon/EditorCircle/EditorRectangle
Attributes、Events、Feature Events同Marker、Polyline、Polygon、Circle、Rectangle

### EditorMarker/EditorPolyline/EditorPolygon/EditorCircle/EditorRectangle params
组件名|参数
-|-
EditorMarker|{position: position}
EditorPolyline/EditorPolyline|{path: path}
EditorCircle|{center: center, radius:radius}
EditorRectangle|{bounds: bounds:[southWest:Array, northEast:Array]}

### EditorMarker/EditorPolyline/EditorPolygon/EditorCircle/EditorRectangle Methods
方法名|说明|参数
-|-|-
getParams|获取编辑项的参数|(params:Object{id: id, extData: extData, params: params:Object{具体值根据featrue参照上表}})

``` vue
<template>
  <lhp-amap :options="{center: center, zoom: 13}">
    <template slot-scope="{map}">
      <lhp-amap-editor ref="amapEditor">
        <lhp-amap-editor-marker :map="map" :position="center"></lhp-amap-editor-marker>
        <lhp-amap-editor-polyline :map="map" :path="line"></lhp-amap-editor-polyline>
        <lhp-amap-editor-polygon :map="map" :path="polygon"></lhp-amap-editor-polygon>
        <lhp-amap-editor-circle :map="map" :center="circle" :radius="1000"></lhp-amap-editor-circle>
        <lhp-amap-editor-rectangle :map="map" :bounds="bounds"></lhp-amap-editor-rectangle>
      </lhp-amap-editor>
    </template>
  </lhp-amap>
</template>

<script>
export default {
  data() {
    return {
      center: [116.43, 39.92],
      line: [[116.41, 39.93], [116.43, 39.91]],
      polygon: [[116.46, 39.93], [116.44, 39.91], [116.49, 39.91]],
      circle: [116.39, 39.92],
      bounds: [[116.35, 39.91], [116.37, 39.93]]
    }
  },
  mounted() {
    this.$nextTick(() => console.log(this.$refs.amapEditor.getParams()))
  }
};
</script>
```

## Popover
地图弹出框

### Popover Attributes
参数|说明|类型|可选值|默认值
-|-|-|-|-
width|弹出框宽度|Number|-|-
title|标题|String/Number|-|-
field|列头对照字典|Object:{id: 'id', name: '名称', position: '坐标'}|-|-
buttons|文本按钮列表|Array:[String/Object]-['无绑定事件', { text: '绑定事件', action(data, vm) {console.log(vm)} }]|-|-
data|数据|Object|-|-
extData|自定义数据|-|-|-

### Popover Scoped Slot
name|说明
-|-
content|自定义弹出框内容
text-after|弹出框内容后置内容{ data }
buttons|自定义弹出框按钮列表{ data, buttons }
buttons-after|弹出框按钮列表后置内容{ data, buttons }

## $popover
全局方法，控制地图弹出框的隐藏/显示。this.$lhpamap.popover

### $popover Methods
方法名|说明|参数
-|-|-
open|在地图上显示弹出框|(options, feature)
close|关闭弹出框|-

### $popover open
this.$lhpamap.popover.open(options, feature)

参数|说明|类型|可选值|默认值
-|-|-|-|-
options|参照下表|Object|-|-
feature|地图覆盖物对象(为feature添加destroyed监听，在feature被销毁的时候关闭弹出框)|feature|-|-

### $popover open options
参数|说明|类型|可选值|默认值
-|-|-|-|-
map|地图对象|AMap.Map|-|-
position|坐标|Array|-|-
data|数据|Object|-|-
instance|弹出框模板，为空时使用Popover组件|Vue实例|-|Popover组件
options|传入instance实例的options|Object|-|-

``` vue
<template>
  <lhp-amap :options="{center: [116.43, 39.92], zoom: 13}" @onLoad="openPopover"></lhp-amap>
</template>

<script>
export default {
  methods: {
    openPopover(map) {
      let data = { id: 0, name: '张三', address: '中国' }
      this.$lhpamap.popover.open({
        map: map, 
        position: [116.43, 39.92],
        data: data,
        options: {
          width: 320,
          title: 'test title',
          field: {id: 'id', name: '名称', address: '地址'},
          buttons: ['无绑定事件', {
            text: '绑定事件',
            action: (data, vm) => {
              console.log(data, vm)
              this.$lhpamap.popover.close()
            }
          }]
        }
      })
    }
  }
};
</script>
```
基本用法

``` vue
<template>
  <lhp-amap :options="{center: [116.43, 39.92], zoom: 13}" @onLoad="openPopover"></lhp-amap>
</template>

<script>
import Vue from 'vue'
const popover = {
  template: `
    <div>
      <div>customize popover</div>
      <div>{{ content }}</div>
    </div>
  `,
  data() {
    return {
      content: undefined
    }
  }
}
const Constructor = Vue.extend(popover)
let $$instance = new Constructor({
  el: document.createElement('div')
})

export default {
  methods: {
    openPopover(map) {
      this.$lhpamap.popover.open({
        map: map, 
        position: [116.43, 39.92],
        instance: $$instance,
        options: {
          content: 'customize content'
        }
      })
    }
  }
};
</script>
```
自定义Vue实例

## $config
全局方法，控制组件全局配置项

### $config Methods
方法名|说明|参数
-|-|-
set|设置组件全局配置项|(path: String, value) path可以使用点.和中括号[]来指向对象和数组中的深层属性
get|获取某项组件全局配置项|(path: String, defaultValue) defaultValue(未查询到值时的返回值)
getOptions|按类型获取覆盖物默认options|(type) type可选值marker、text、polyline等
getEditor|按类型获取编辑覆盖物默认options|(type) type可选值marker、text、polyline等

## $draw
全局方法，绘制覆盖物并获取params

### $draw Methods
方法名|说明|参数
-|-|-
open|开启绘制|(path: Object{type: String 覆盖物类型, map: AMap.Map 地图对象, callback: Function(params) 绘制成功后的回调函数, isKeep: Boolean 绘制结束后是否保留feature})
close|清空并关闭|-