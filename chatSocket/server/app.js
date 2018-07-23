const express = require('express');  
const app = express();  
const server = require('http').Server(app);  
const io = require('socket.io')(server); 

server.listen(9000, () => {  
    console.log('server running at 127.0.0.1:9000');  
});

app.use(express.static('../dist'));

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/dist/index.html');
});

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

let userList = {};
/*     socket.io 逻辑     */  

io.on('connection', (socket) => {
	socket.join('all');
	socket.roomList = ['all'];
	socket.emit('system message', "welcome to sharlly's chatroom", 'all');
	socket.on('login', function (username) {
		socket.username = username;
		userList[socket.id] = socket.username;
		io.emit('setUserList', userList);
		socket.broadcast.to('all').emit('system message', username + ' joined', 'all');
	});
	/**
     * 断开连接
     */
	socket.on('disconnect', function () {
		if(userList[socket.id]){
			delete userList[socket.id];
		}
		for(var i = 0, len = socket.roomList.length; i < len; i++){
			var roomId = socket.roomList[i];
			var room = io.sockets.adapter.rooms[roomId];
			if(room){
				let arr = Object.keys(room.sockets);
				io.sockets.to(roomId).emit('setRoomList', {
					roomId: roomId,
					roomUserList: arr
				})	
			}
			io.sockets.to(roomId).emit('system message', socket.username + ' left', roomId);
		}
		socket.roomList = [];
		io.emit('disconnect', socket.id);
	});
	/**
     * 接收群消息
     * @params message 消息
     * @params id 发送人的socket.id
     */
	socket.on('message', function (message, id) {
		if(!id){
			id = 'all'
		}
		socket.broadcast.to(id).emit('message', message, id, socket.username);
		socket.emit('message', message, id, socket.username);
	});
	/**
     * 接收私聊
     * @params message 消息
     * @params id 发送人的socket.id
     */
	socket.on('whisper', function (message, id) {
		socket.broadcast.to(id).emit('whisper', message, socket.id, socket.username);
		socket.emit('whisper', message, id, socket.username);
	});
	/**
     * 新建群聊
     */
	socket.on('addRoom', function (res) {
		let arr = Object.keys(io.sockets.adapter.rooms);
		let roomId;
		do {
			roomId = getUuid(15)
		}
		while (arr.indexOf(roomId) !== -1);
		socket.join(roomId);
		io.sockets.adapter.rooms[roomId].name = res;
		socket.emit('setRoomList', {
			roomId: roomId,
			roomName: res
		})
		socket.roomList.push(roomId);
		socket.emit('system message', "welcome to sharlly's chatroom", roomId);
	});
	/**
     * 退出群聊
     * @params roomId 房间ID
     */
	socket.on('outRoom', function (roomId) {
		socket.leave(roomId)
		var room = io.sockets.adapter.rooms[roomId];
		if(room){
			let arr = Object.keys(room.sockets);
			io.sockets.to(roomId).emit('setRoomList', {
				roomId: roomId,
				roomUserList: arr
			})
		}
		socket.broadcast.to(roomId).emit('system message', socket.username + ' left', roomId)
		var n = socket.roomList.indexOf(roomId)
		if (n !== -1) {
	    	socket.roomList.splice(n, 1);
	    }
	});
	/**
     * 群聊邀请
     * @params roomId 房间ID
     * @params idArr 目标用户的socket.id数组
     */
	socket.on('request', function (roomId, idArr) {
		for(let i = 0, len = idArr.length; i < len; i++) {
			var room = io.sockets.adapter.rooms[roomId];
			let arr = Object.keys(room.sockets);
			if(arr.indexOf(idArr[i]) == -1){
				io.sockets.to(idArr[i]).emit('request', socket.id, roomId)
			}
		}
	});
	/**
     * 进入群聊房间
     * @params roomId 房间ID
     */
	socket.on('join', function (roomId) {
		socket.join(roomId);
		var room = io.sockets.adapter.rooms[roomId];
		let arr = Object.keys(room.sockets);
		io.sockets.to(roomId).emit('setRoomList', {
			roomId: roomId,
			roomName: room.name,
			roomUserList: arr
		})
		socket.roomList.push(roomId);
		socket.emit('system message', "welcome to sharlly's chatroom", roomId);
		socket.broadcast.to(roomId).emit('system message', socket.username + ' joined', roomId);
	});
});  
