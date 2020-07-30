;(function(){
    
    function vueLazyLoad(jsUrl, htmlUrl){
        var loadArr = [jsUrl +'.js']
        if (htmlUrl) loadArr.push(htmlUrl +'.html')
        return function(resolve){
            $ajax.load(loadArr, function(_js, _html){
                if (_html) _js.template = _html
                resolve($.extend(true, {}, _js))
            })
        }
    }
    var $vue = function(url){
        return vueLazyLoad(url, url)
    }
    $vue.load = vueLazyLoad
    window.$vue = $vue


    var socket = io.connect()
    var rtc = new Vue({
        data(){
            return {
                userId: null,
                roomList: [],
                users: [],
                sendOfferUsers: [],
                mediaStream: null,
                connections: [],
                peerConnections: {}
            }
        },
        methods:{
            muteVideo(){
                this.mediaStream && this.mediaStream.getVideoTracks().forEach(function(e){
                    e.enabled = 0
                })
            },
            muteAudio(){
                this.mediaStream && this.mediaStream.getAudioTracks().forEach(function(e){
                    e.enabled = 0
                })
            },
            unmuteVideo(){
                this.mediaStream && this.mediaStream.getVideoTracks().forEach(function(e){
                    e.enabled = 1
                })
            },
            unmuteAudio(){
                this.mediaStream && this.mediaStream.getAudioTracks().forEach(function(e){
                    e.enabled = 1
                })
            },
            createStream() {
                this.isShow = true
                this.peerConnections = []
                window.navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                }).then(mediaStream => {
                    if (!this.isShow) {
                        mediaStream.getTracks().forEach(e => e.stop())
                        return
                    }
                    this.mediaStream = mediaStream;
                    this.createPeerConnections()
                    this.sendOffers()
                });
            },
            closeStream() {
                this.isShow = false
                for (var key in this.peerConnections) {
                    this.peerConnections[key].close()
                }
                this.peerConnections = []
                this.connections = []
                if (this.mediaStream) {
                    this.mediaStream.getTracks().forEach(e => e.stop())
                }
                // this.mediaStream && [0].stop()
                this.mediaStream = null
            },
            createPeerConnections(){
                this.sendOfferUsers.forEach(targetId => {
                    if(targetId !== this.userId) this.createPeerConnection(targetId)
                })
            },
            createPeerConnection(targetId){
                if (this.peerConnections[targetId]) return
                let pc = new window.RTCPeerConnection()
                this.peerConnections[targetId] = pc;
                pc.onicecandidate = event => {
                    if (!event.candidate) {
                        return;
                    }
                    socket.emit("candidate", {
                        candidate: event.candidate,
                        targetId: targetId
                    })
                };
                pc.onaddstream = event => {
                    this.connections.push({
                        id: targetId,
                        stream: event.stream
                    })
                };
                pc.oniceconnectionstatechange = event => {
                    if (pc.iceConnectionState === 'disconnected') {
                        const index = [].findIndex.call(this.connections, item => item.id == targetId)
                        if (index != -1) this.connections.splice(index, 1)
                        delete this.peerConnections[targetId]
                    }
                };

                // pc.onnegotiationneeded = event => {
                //     this.sendOffer(pc, targetId)
                // };

                pc.addStream(this.mediaStream)
                return pc
            },
            sendOffers(){
                for (var targetId in this.peerConnections) {
                    this.sendOffer(this.peerConnections[targetId], targetId)
                }
            },
            async sendOffer (pc, targetId) {
                let offer = await pc.createOffer({
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: true
                });
                await pc.setLocalDescription(offer);
                socket.emit("offer", {
                    desc: pc.localDescription,
                    targetId: targetId
                })
            },
            async sendAnswer (pc, targetId, offer) {
                await pc.setRemoteDescription(offer);
                await pc.setLocalDescription(await pc.createAnswer());
                socket.emit("answer", {
                    desc: pc.localDescription,
                    targetId: targetId
                })
            },
            receiveOffer(targetId, offer){
                var pc = this.peerConnections[targetId]
                if (!pc) pc = this.createPeerConnection(targetId)
                this.sendAnswer(pc, targetId, offer)
            },
            receiveAnswer(targetId, offer){
                var pc = this.peerConnections[targetId]
                pc && pc.setRemoteDescription(offer)
            },
            receiveCandidate(targetId, candidate){
                var pc = this.peerConnections[targetId]
                pc && pc.addIceCandidate(new RTCIceCandidate(candidate))
            },
            joinRoom(roomId, roomPwd, roomName){
                socket.emit("joinRoom", {
                    roomId: roomId,
                    roomName: roomName
                })
            },
            addRoom(roomName, roomPwd){
                socket.emit("addRoom", {
                    roomName: roomName
                })
            },
            leaveRoom(){
                this.closeStream()
                this.users = []
                socket.emit("leaveRoom")
            }
        },
        beforeCreate () {
            var self = this
            // 系统消息
            socket.on("system message", function(msg){
                console.log("system message", msg)
            })

            // socket连接成功后返回该用户信息
            socket.on("getUserInfo",function (data) {
                self.userId = data.userId
            });

            socket.on("getRoomList",function (data) {
                self.roomList = data
            });

            // 其他用户进入房间时回调
            socket.on("joinRoom",function (data) {
                self.users.push(data.userId)
            });

            // 新建房间回调
            socket.on("addRoom",function (data) {
                router.push({
                    path: 'main',
                    query: {
                        roomName: encodeURIComponent(data.roomName),
                        roomId: data.roomId
                    }
                })
            });

            // 自己进入房间后。返回房间信息，并createStream
            socket.on("getRoomInfo",function (data) {
                self.users = [...data.users]
                self.sendOfferUsers = [...data.users] // 对当前users进行深拷贝，防止getUserMedia（加入回调执行之前有新user加入）后2个用户相互sendOffer
                self.createStream()
            });

            // 其他用户退出房间时回调
            socket.on("leaveRoom",function (userId) {
                const index = [].findIndex.call(self.users, id => id == userId)
                if (index != -1) self.users.splice(index, 1)
                const cindex = [].findIndex.call(self.connections, item => item.id == userId)
                if (cindex != -1) self.connections.splice(cindex, 1)
            });

            socket.on("offer",function (data) {
                self.receiveOffer(data.userId, data.desc)
            });

            socket.on("answer",function (data) {
                self.receiveAnswer(data.userId, data.desc)
            });

            socket.on("remoteCandidate",function (data) {
                self.receiveCandidate(data.userId, data.candidate)
            });
        }
    })
    Vue.prototype.$rtc = rtc


    const routerPush = VueRouter.prototype.push
    VueRouter.prototype.push = function push(location) {
      return routerPush.call(this, location).catch(error=> error)
    }
    var router = new VueRouter({
        //mode: 'history',
        routes:[
            {
                path:'/',
                name: 'list',
                component: $vue('./component/roomlist')
            },
            {
                path:'/create',
                name: 'create',
                component: $vue('./component/createRoom')
            },
            {
                path: '/main',
                name: 'Main',
                component: $vue('./component/mainwindow')
            },
            // {
            //     path: '/main2',
            //     name: 'Main2',
            //     component: $vue('./component/mainwindow2')
            // },
            // {
            //     path: '/list2',
            //     name: 'list2',
            //     component: $vue('./component/roomlist2')
            // }
        ]
    });

    new Vue({
        el: '#vue-app',
        router:router,
    })
    
})()


