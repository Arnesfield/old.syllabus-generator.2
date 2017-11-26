<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',

  sockets: {
    connect() {
      // check if login
      this.$socket.emit('isLoggedIn')
    },

    disconnect() {
      
    },

    login(data) {
      console.log('login: ' + data)
    }
  }
}
</script>
