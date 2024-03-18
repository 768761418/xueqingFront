<template>
  <div class="container">
    <div class="video-container">
        <video ref="videoElement" :src="videoUrl" controls></video>
    </div>
    <div class="chat-container">
        <div v-for="message in chatMessages" :key="message.id" class="chat-message">
            <span class="username">{{ message.username }}:</span>
            <span class="text">{{ message.text }}</span>
        </div>
        <div class="input-container">
            <input v-model="newMessage" placeholder="输入消息" />
            <button @click="sendMessage">发送</button>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      videoUrl: '', // 请替换为你的视频链接
      chatMessages: [
        { id: 1, username: 'User1', text: 'Hello!' },
        { id: 2, username: 'User2', text: 'Hi there!' }
      ],
      newMessage: ''
    };
  },
  mounted() {
    this.initializeVideoPlayer();
  },
  methods: {
    initializeVideoPlayer() {
      const video = this.$refs.videoElement;
      video.load();
    },
    sendMessage() {
      if (this.newMessage) {
        const message = {
          id: Date.now(),
          username: 'User',
          text: this.newMessage
        };
        this.chatMessages.push(message);
        this.newMessage = '';
      }
    }
  }
};
</script>

<style scoped>

.container {
    display: flex;
}

.live-view {
  display: flex;
  align-items: flex-start;
  height: 100vh;
  padding: 20px;
  margin-left: 20px;
  background-color: #f7f7f7;
  position: absolute;
}

.video-container {
  width: 60%;
  margin-right: 20px;
}

video {
  margin-left: 20px;
  margin-top: 20px;
  width: 100%;
  border-radius: 5px;
}

.chat-container {
  margin-left: 30px;
  flex: 1;
  max-width: 400px;
  height: 508px;
  background-color: #fff;
  border-radius: 5px;
  margin-top: 20px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.chat-message {
  margin-bottom: 10px;
}

.username {
  font-weight: bold;
  color: #007bff;
}

.text {
  margin-left: 5px;
}

.input-container {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 20px;
}

input {
  flex-grow: 1;
  margin-right: 10px;
  width: 280px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #f7f7f7;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
