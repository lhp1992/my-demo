# 小程序websocket简易连接及通讯插件
* author： lhp
------

> 小程序websocket简易连接及通讯插件。

## 请求与回调
------

## 参数

#### `开启websocket`
``` javascript
const socket = require('../../utils/websocket');
socket.init('wsurl', options)
```

#### `wsurl`
- 您要连接的URL。

#### `options`
- 选项（见下文）

## Options

#### `reconnectInterval`
- 尝试重新连接之前延迟的毫秒数。
- Accepts `integer`
- Default: `1000`

#### `maxReconnectInterval`
- 延迟重新连接尝试的最大毫秒数。
- Accepts `integer`
- Default: `30000`

#### `reconnectDecay`
- 重新连接延迟的增加率。允许重新连接尝试在问题仍然存在时退出。
- Accepts `integer` or `float`
- Default: `1.5`

#### `timeoutInterval`
- 在关闭和重试之前等待连接成功的最长时间（以毫秒为单位）。
- Accepts `integer`
- Default: `2000`

#### `maxReconnectAttempts`
- 在放弃之前将进行的最大重新连接尝试次数。如果为null，则将继续永久重新连接尝试。
- Accepts `integer` or `null`.
- Default: `null`

---

## 方法

``` javascript
const socket = require('../../utils/websocket');
```

#### `socket.on(service, callback)`
- 绑定接口监听
- service：接口名
- callback：回调函数（msg.data回调参数）
- 后台返回格式：
``` javascript
{
	code：错误代码,
	msg：错误消息,
	service：推送接口,
	data：推送内容
}
```

#### `socket.emit(service, params)`
- 向后台发送请求
- service：接口名
- params：参数
- 前台请求格式：
``` javascript
{
	service：接口名,
	params：参数
}
```

#### `socket.off(service, callback)`
- 移除接口监听
- service：接口名
- callback：回调函数

#### `socket.close()`
- 关闭websocket连接

#### `socket.ifOpen()`
- websocket是否连接判断

---

## 监听

``` javascript
socket.onOpen = function(){
  console.log('连接成功！')
}
```
- 监听WebSocket连接打开事件。

``` javascript
socket.onClose = function(){
  console.log('连接关闭！')
}
```
- 监听WebSocket连接关闭事件（断线重连不会触发该回调）。
