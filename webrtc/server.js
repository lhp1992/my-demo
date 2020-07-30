var express = require('express')
var app = express();
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./192.168.0.109.key', 'utf8');
var certificate = fs.readFileSync('./192.168.0.109.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
var PORT = 8090;
var SSLPORT = 8091;

httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
httpsServer.listen(SSLPORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});

app.use(express.static('./public'));

// Welcome
app.get('/', function(req, res) {
  if(req.protocol === 'https') {
    // res.sendfile('./socket.html');
  }
  else {
    res.status(200).send('Welcome!');
  }
});


var socketIo = require("socket.io")
var io = new socketIo(httpsServer)

var roomInfo = {}
var userList = {}

io.on("connection",function (socket) {
  let userId = socket.id
  userList[userId] = {
    userId: socket.id
  }
  socket.emit('getUserInfo', userList[userId])
  socket.emit('getRoomList', roomInfo)
  
  socket.on('disconnect', function() {
    let roomId = userList[userId].roomId
      if (roomId) {
        let index = roomInfo[roomId].users.indexOf(userId)
        if (index != -1) {
          roomInfo[roomId].users.splice(index, 1)
          if (roomInfo[roomId].users.length < 1) {
            delete roomInfo[roomId]
          } else {
            socket.to(roomId).emit('system message', userId + '离开了房间')
            socket.to(roomId).emit('leaveRoom', userId)
          }
        }
        io.sockets.emit('getRoomList', roomInfo)
      }
      delete userList[userId]
  });

  socket.on('leaveRoom', function() {
    let roomId = userList[userId].roomId
      if (roomId) {
        let index = roomInfo[roomId].users.indexOf(userId)
        if (index != -1) {
          roomInfo[roomId].users.splice(index, 1)
          if (roomInfo[roomId].users.length < 1) {
            delete roomInfo[roomId]
          } else {
            socket.to(roomId).emit('system message', userId + '离开了房间')
            socket.to(roomId).emit('leaveRoom', userId)
          }
        }
        io.sockets.emit('getRoomList', roomInfo)
      }
      delete userList[userId].roomId
  });

  function joinRoom(roomId){
    userList[userId].roomId = roomId
    roomInfo[roomId].users.push(userId)
    socket.join(roomId)
    socket.to(roomId).emit('system message', userId + '加入了房间')
    socket.to(roomId).emit('joinRoom', userList[userId])
    socket.emit('getRoomInfo', roomInfo[roomId])
    io.sockets.emit('getRoomList', roomInfo)
  }

  socket.on('joinRoom', function(data) {
    let roomId = data.roomId
    if (!roomId) return
    if (roomInfo[roomId]) {
      joinRoom(roomId)
    } else {
      addRoom(roomId, data.roomName)
      joinRoom(roomId)
    }
  });

  function addRoom(roomId, roomName){
    roomInfo[roomId] = {
      roomId: roomId,
      roomName: roomName,
      // users: [userId],
      users: []
    }
    // userList[userId].roomId = roomId
    // socket.join(roomId)
  }

  socket.on('addRoom', function(data) {
    let roomId = getUuid(8, 16)
    addRoom(roomId, data.roomName)
    socket.emit('system message', '成功，新建房间！')
    socket.emit('addRoom', roomInfo[roomId])
    io.sockets.emit('getRoomList', roomInfo)
    // joinRoom(roomId)
  });

  socket.on('offer', function(data) {
    socket.to(data.targetId).emit('offer', {
      desc: data.desc,
      userId: userId
    })
  });

  socket.on('answer', function(data) {
    socket.to(data.targetId).emit('answer', {
      desc: data.desc,
      userId: userId
    })
  });

  socket.on('candidate', function(data) {
    socket.to(data.targetId).emit('remoteCandidate', {
      candidate: data.candidate,
      userId: userId
    })
  });

})

function getUuid (len, radix) {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  let uuid = []
  let i
  radix = radix || chars.length
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    let r
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}