let socket = {}
let forcedClose = false
let isOpen = false
let message = {}
let init = function (wsip, options){
  const self = {}

  if (isOpen){
    return false
  }

  const settings = {
    reconnectInterval: 1000,
    maxReconnectInterval: 30000,
    reconnectDecay: 1.5,
    timeoutInterval: 2010,
    maxReconnectAttempts: null
  }

  if (!options) { options = {} }

  for (let key in settings) {
    if (typeof options[key] !== 'undefined') {
      self[key] = options[key]
    } else {
      self[key] = settings[key]
    }
  }

  self.reconnectAttempts = 0

  self.open = function(){
    wx.connectSocket({
      url: wsip
    })

    if (self.maxReconnectAttempts && self.reconnectAttempts > self.maxReconnectAttempts) {
      return;
    }

    var timeout = setTimeout(function () {
      socket.close();
    }, self.timeoutInterval);

    wx.onSocketOpen(function (res) {
      clearTimeout(timeout);
      isOpen = true
      self.reconnectAttempts = 0;
      socket.onOpen && socket.onOpen()
    })

    wx.onSocketClose(function (res) {
      clearTimeout(timeout);
      isOpen = false
      if (!forcedClose) {
        let time = self.reconnectInterval * Math.pow(self.reconnectDecay, self.reconnectAttempts);
        setTimeout(function () {
          self.reconnectAttempts++;
          self.open(true);
        }, time > self.maxReconnectInterval ? self.maxReconnectInterval : time);
      } else {
        socket.onClose && socket.onClose()
      }
    })

    wx.onSocketError(function (res) {
      isOpen = false
    })

    wx.onSocketMessage(function (res) {
      let msg
      try {
        msg = JSON.parse(res.data);
      } catch (msg) {
        return false
      }
      // console.log(msg)
      if (msg.code != 0) {
        console.error(msg.msg)
        return false
      }
      if (message[msg.service]) {
        message[msg.service](msg.data)
      }
    })
  }
  
  self.open()
}

socket.init = function (wsip, options){
  init(wsip, options)
}

socket.close = function(){
  forcedClose = true
  if (isOpen){
    wx.closeSocket()
  }
}

socket.on = function (service, callback) {
  message[service] = callback
}

socket.off = function (service, callback) {
  if (!message[service]) {
    return false
  }
  delete message[service]
}

socket.emit = function (service, params) {
  if (!isOpen) {
    console.error('消息发送失败，未连接到服务器！')
    return false
  }
  var data = {
    service: service,
    params: params || {}
  }
  // console.log(data)
  wx.sendSocketMessage({
    data: JSON.stringify(data)
  })
}

socket.ifOpen = function(){
  return isOpen
}

module.exports = socket
