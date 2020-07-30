exports = {
  name: 'MainView',
  computed: {
    userId(){
      return this.$rtc.userId
    },
    roomList(){
      return this.$rtc.users && this.$rtc.users.filter(id => id !== this.$rtc.userId)
    },
    peerConnections() {
      return this.$rtc.connections
    }
  },
  data() {
    return {
      roomName: '',
      roomId: null,
      bigVideoId: 'local',
      base64img: null,
      isMuteVideo: false,
      isMuteAudio: false,
      isReadyMedia: false
    };
  },
  mounted() {
    let query = this.$route.query;
    this.roomName = decodeURIComponent(query.roomName)
    this.roomId = query.roomId
    this.$rtc.joinRoom(this.roomId, this.roomName)
  },
  watch: {
    '$rtc.mediaStream'(){
      this.isReadyMedia = true
      this.$nextTick(() => {
        if (this.$refs.localVideo) this.$refs.localVideo.srcObject = this.$rtc.mediaStream
        // setTimeout(() => this.drawMedia(), 2000)
      })
    },
    '$rtc.connections'(){
      // console.log(a.length, b.length)
      // console.log(this.$rtc.connections)
      // console.log(this.$refs)
      // let bigVideoId = 'local'
      // const addList = this.$rtc.connections.filter(item => {
      //   if (item.id == bigVideoId) bigVideoId = item.id
      //   return !this.$refs['peerVideo-'+ item.id]
      // })
      // if (bigVideoId !== this.bigVideoId) this.bigVideoId = bigVideoId
      let connectionObj
      // let bigVideoId = 'local'
      // this.$rtc.connections.forEach(item => {
      //   if (item.id == bigVideoId) bigVideoId = item.id
      //   connectionObj[item.id] = item
      // })
      // if (bigVideoId !== this.bigVideoId) this.bigVideoId = bigVideoId
      this.$nextTick(() => {
        this.$refs.peerConnections.forEach(e => {
          // console.log(e.id, e.srcObject)
          if (!e.srcObject) {
            if (!connectionObj) {
              connectionObj = {}
              this.$rtc.connections.forEach(item => connectionObj[item.id] = item)
            }
            e.srcObject = connectionObj[e.id].stream
          }
        })
      })
    }
  },
  methods: {
    drawMedia(){
      const canvas = document.createElement("canvas");
      const context = canvas.getContext('2d');
      const video = this.$refs.localVideo
      // canvas.setAttribute("width", video.videoWidth);
      // canvas.setAttribute("height", video.videoHeight);
      // context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      canvas.setAttribute("width", 320);
      canvas.setAttribute("height", 240);
      context.drawImage(video, 0, 0, 320, 240);
      const image = canvas.toDataURL("image/jpeg");
      this.base64img = image
    },
    logout(){
      this.$router.push({
        path: '/'
      });
    },
    muteVideo(){
      this.isMuteVideo = true
      this.$rtc.muteVideo()
    },
    unmuteVideo(){
      this.isMuteVideo = false
      this.$rtc.unmuteVideo()
    },
    muteAudio(){
      this.isMuteAudio = true
      this.$rtc.muteAudio()
    },
    unmuteAudio(){
      this.isMuteAudio = false
      this.$rtc.unmuteAudio()
    },
    setBigVideoId(id){
      this.bigVideoId = id
    }
  },
  destroyed(){
    this.$rtc.leaveRoom()
  }
};
