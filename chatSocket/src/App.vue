<template>
  <div id="app">
    <chatMain v-if="showChat" v-bind:userName="userName"></chatMain>
    <div class="form" v-else>
      <h3 class="title">What's your nickname?</h3>
      <input class="usernameInput" type="text" maxlength="14" @keyup.13="sendName()" v-model="userName">
    </div>
  </div>
</template>

<script>
import chatMain from './components/chat'
export default {
  name: 'App',
  data () {
    return {
      value: 0,
      userName: '',
      showChat: false
    }
  },
  methods: {
    sendName () {
      if(this.userName){
        this.value = 2
        this.showChat = true
      }else{
        this.$message.error('nickname不能为空！');
      }
    }
  },
  components: {
    chatMain: chatMain
  }
}
</script>

<style>
html,body{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #000;
}
#app .form {
  height: 100px;
  margin-top: -100px;
  position: absolute;
  text-align: center;
  top: 50%;
  width: 100%;
}
#app .title, #app .usernameInput {
    color: #fff;
    font-weight: 100;
}
#app .title {
    font-size: 200%;
}
#app .usernameInput {
    font-size: 200%;
    letter-spacing: 3px;
}
#app .form .usernameInput {
    background-color: transparent;
    border: none;
    border-bottom: 2px solid #fff;
    outline: none;
    padding-bottom: 15px;
    text-align: center;
    width: 400px;
}
</style>
