# websocket简易连接及通讯插件
* author： lhp
------

> websocket简易连接及通讯插件，基于reconnecting-websocket插件开发。

## 请求与回调
------
#### `绑定接口回调`
``` javascript
$.socket.on(service, callback)
```
- service：接口名
- callback：回调函数（msg.data回调参数）

#### `后台返回格式`
``` javascript
{
	code：错误代码,
	msg：错误消息,
	service：推送接口,
	data：推送内容
}
```

#### `向后台发送请求`
``` javascript
$.socket.emit(service, params)
```
- service：接口名
- params：参数

#### `前台请求格式`
``` javascript
{
	service：接口名,
	params：参数
}
```
