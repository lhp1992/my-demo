<template>
  <div class="chat-content">
    <div class="chat-list">
      <div v-if="activeRoom">
        <div class="chat-title" @click="switchRoom(defaultRoom)" :class="activeRoom == defaultRoom ? 'active' : ''">
          所有人<span class="chat-badge" v-if="roomList[defaultRoom].number !== 0">{{ roomList[defaultRoom].number }}</span>
        </div>
        <ul v-if="activeRoom == defaultRoom">
          <li v-for="(item, key) in userList" @dblclick="addWhisper(key)" v-if="socket.id !== key">{{ item }}</li>
        </ul>
      </div>
      <div v-for="(item, key) in roomList" v-if="key != defaultRoom">
        <div class="chat-title" @click="switchRoom(key)" :class="activeRoom == key ? 'active' : ''">
          {{ item.name }}<span class="chat-badge" v-if="roomList[key].number !== 0">{{ roomList[key].number }}</span>
        </div>
        <ul v-if="activeRoom == key">
          <li v-for="item in item.list" @dblclick="addWhisper(item)" v-if="socket.id !== item">{{ userList[item] }}</li>
          <li  v-if="item.type == 'group'" @click="dialogcheck = true; checkList = []">
            <i class="el-icon-circle-plus-outline"></i>邀请在线用户
          </li>
          <li  v-if="item.type == 'group'" @click="outRoom(key)">
            <i class="el-icon-remove-outline"></i>退出群聊
          </li>
        </ul>
      </div>
      <div class="chat-title" @click="addRoom"><i class="el-icon-plus"></i>新建群聊</div>
    </div>
    <div class="chat-main">
      <div id="chat-box" v-if="activeRoom">
        <div v-for="(item, index) in roomList[activeRoom].messageList" :key="index" v-if="item.text" class="text-center">
          {{ item.text }}
        </div>
        <div class="media right" v-else-if="item.username == userName">
          <div class="media-body">
            <div class="content" v-html="item.message">
            </div>
          </div>
          <div class="media-right">
            <i class="el-icon-edit"></i>
          </div>
        </div>
        <div class="media left" v-else>
          <div class="media-left">
            <i class="el-icon-edit"></i>
          </div>
          <div class="media-body">
            <div>{{ item.username }}</div>
            <div class="content" v-html="item.message">
            </div>
          </div>
        </div>
      </div>
      <input class="inputMessage" placeholder="Type here..." @keyup.13="sendMessage()" v-model="text">
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogcheck"
      width="50%">
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="(item, key) in userList" v-if="key !== socket.id" :key="key" :label="key" border>{{ item }}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogcheck = false">取 消</el-button>
        <el-button type="primary" @click="request">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as io from 'socket.io-client'
export default{
  data () {
    return {
      defaultRoom: 'all',
      activeRoom: null,
      roomList: {},
      checkList: [],
      userList: [],
      socket: null,
      text: '',
      dialogcheck: false
    }
  },
  props: ['userName'],
  mounted () {
    this.socket = io() // eslint-disable-line
    /**
     * 连接成功
     */
    this.socket.on('connect', this.connect)
    /**
     * 用户断开连接
     */
    this.socket.on('disconnect', this.disconnect)
    /**
     * 系统消息
     */
    this.socket.on('system message', this.logMessage)
    /**
     * 群聊消息
     */
    this.socket.on('message', this.message)
    /**
     * 私聊消息
     */
    this.socket.on('whisper', this.whisper)
    /**
     * 设置用户列表
     */
    this.socket.on('setUserList', this.setUserList)
    /**
     * 设置房间列表
     */
    this.socket.on('setRoomList', this.setRoomList)
    /**
     * 邀请加入群聊
     */
    this.socket.on('request', this.ifJoin)
  },
  methods: {
    disconnect (id) {
      this.$delete(this.userList, id)
      if (this.roomList[id]) {
        this.$delete(this.roomList, id)
      }
    },
    connect () {
      this.socket.emit('login', this.userName)
      this.$set(this.roomList, this.defaultRoom, {
        messageList: [],
        number: 0
      })
      this.activeRoom = this.defaultRoom
    },
    setUserList (list) {
      this.userList = list
    },
    message (res, roomId, username) {
      if (!this.roomList[roomId]) {
        this.$set(this.roomList, roomId, {
          name: this.userList[roomId],
          messageList: [],
          number: 1
        })
      } else if (roomId !== this.activeRoom) {
        let n = this.roomList[roomId].number
        n++
        this.$set(this.roomList[roomId], 'number', n)
      }
      this.roomList[roomId].messageList.push({
        message: res,
        username: username
      })
      this.autoScroll(roomId)
    },
    whisper (res, roomId, username) {
      if (!this.roomList[roomId]) {
        this.$set(this.roomList, roomId, {
          name: this.userList[roomId],
          messageList: [],
          isWhisper: true,
          number: 1
        })
      } else if (roomId !== this.activeRoom) {
        let n = this.roomList[roomId].number
        n++
        this.$set(this.roomList[roomId], 'number', n)
      }
      this.roomList[roomId].messageList.push({
        message: res,
        username: username
      })
      this.autoScroll(roomId)
    },
    autoScroll (roomId) {
      if (roomId === this.activeRoom) {
        let t = document.getElementById('chat-box').scrollTop
        let s = document.getElementById('chat-box').scrollHeight
        let h = document.getElementById('chat-box').offsetHeight
        if (t + h < s) {
          return
        }
        this.$nextTick(() => {
          document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight
        })
      }
    },
    setRoomList (data) {
      let room = this.roomList[data.roomId]
      if (!room) {
        room = {}
        room.messageList = []
        room.number = 0
        room.type = 'group'
      }
      if (data.roomName) {
        room.name = data.roomName
      }
      if (data.roomUserList) {
        room.list = data.roomUserList
      }
      this.$set(this.roomList, data.roomId, room)
    },
    request () {
      this.dialogcheck = false
      this.socket.emit('request', this.activeRoom, this.checkList)
    },
    ifJoin (id, roomId) {
      this.$confirm(this.userList[id] + '邀请你加入群聊！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.socket.emit('join', roomId)
      }).catch(() => {})
    },
    logMessage (res, roomId) {
      this.roomList[roomId].messageList.push({
        text: res
      })
      this.autoScroll(roomId)
    },
    sendMessage () {
      if(this.roomList[this.activeRoom].isWhisper){
        this.socket.emit('whisper', this.text, this.activeRoom)
        console.log('私聊')
      }else{
        this.socket.emit('message', this.text, this.activeRoom)
      }
      this.text = ''
    },
    addRoom () {
      let _this = this
      this.$prompt('请输入群聊名称', '新建群聊', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        _this.socket.emit('addRoom', value)
      }).catch(() => {})
    },
    outRoom (id) {
      this.activeRoom = this.defaultRoom
      this.$delete(this.roomList, id)
      this.socket.emit('outRoom', id)
    },
    switchRoom (key) {
      this.activeRoom = key
      this.roomList[key].number = 0
      this.autoScroll(key)
    },
    addWhisper (key) {
      if (!this.roomList[key]) {
        this.$set(this.roomList, key, {
          name: this.userList[key],
          messageList: [],
          isWhisper: true,
          number: 0
        })
      }
      this.activeRoom = key
    }
  },
  beforeDestroy () {
    this.socket.disconnect()
  }

}
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
  .chat-content{
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
  }
  .chat-list{
    width: 300px;
    height: 100%;
  }
  .chat-main{
    height: 100%;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  .el-menu{
    height: 100%;
    overflow-y: auto;
  }
  #chat-box{
    height: calc(100% - 60px);
    padding: 10px 0;
    overflow-y: auto;
  }
  .inputMessage {
    height: 60px;
    padding-left: 10px;
    right: 0px;
    width: 100%;
    border-width: 10px;
    border-style: solid;
    border-color: rgb(0, 0, 0);
    border-image: initial;
    outline: none;
  }
  .media.left{
    text-align: left;
  }
  .media.right{
    text-align: right;
  }
  .content{
    padding: 5px 10px;
    border-radius: 4px;
    display: inline-block;
    background-color: #eee;
    position: relative;
  }
  .media.right .content{
    background-color: #b2e281;
  }
  .content:before{
    content: '';
    width: 0;
    height: 0;
    border: 6px solid transparent;
    position: absolute;
    top: 8px;
  }
  .media.left .content:before{
    border-right-width: 4px;
    border-right-color: #eee;
    left: -10px;
  }
  .media.right .content:before{
    border-left-color: #b2e281;
    border-left-width: 4px;
    right: -10px;
  }
  .media.left .media-body{
    padding-left: 10px;
  }
  .media.right .media-body{
    padding-right: 10px;
  }
  .list-item{
    margin-top: 10px;
  }
  .list-item:first-child{
    margin-top: 0px;
  }
  .media {
    margin-top: 15px;
  }
  .media:first-child {
    margin-top: 0;
  }
  .media,
  .media-body {
    zoom: 1;
    overflow: hidden;
  }

  .media-body {
    width: 10000px;
  }

  .media-object {
    display: block;
  }
  .media-object.img-thumbnail {
    max-width: none;
  }

  .media-right,
  .media > .pull-right {
    padding-left: 10px;
  }

  .media-left,
  .media > .pull-left {
    padding-right: 10px;
  }

  .media-left,
  .media-right,
  .media-body {
    display: table-cell;
    vertical-align: top;
  }

  .media-middle {
    vertical-align: middle;
  }

  .media-bottom {
    vertical-align: bottom;
  }

  .media-heading {
    margin-top: 0;
    margin-bottom: 5px;
  }

  .media-list {
    padding-left: 0;
    list-style: none;
  }
  .chat-list{
    border-right: 1px solid #e5e5e5;
  }
  .chat-list ul{
    margin: 0;
    padding: 0;
  }
  .chat-list li{
    list-style: none;
    height: 50px;
    line-height: 50px;
    padding: 0 45px;
    min-width: 200px;
    color: #666;
    cursor: pointer;
  }
  .chat-title {
    height: 56px;
    line-height: 56px;
    padding: 0 20px;
    position: relative;
    -webkit-box-sizing: border-box;
    cursor: pointer;
    white-space: nowrap;
  }
  .chat-title.active {
    color: #409eff;
    background-color: #ecf5ff;
  }
  .chat-badge {
    background-color: #f56c6c;
    border-radius: 10px;
    color: #fff;
    padding: 0 5px;
    margin-left: 5px;
    font-size: 12px;
    height: 18px;  
  }
</style>
