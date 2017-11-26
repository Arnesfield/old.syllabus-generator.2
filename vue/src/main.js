// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

const port = process.env.PORT || 3000
const baseURL = process.env.NODE_ENV !== 'production' ?
  'http://localhost:8080' : 'http://localhost:' + port;

export const SocketInstance = socketio(baseURL)
Vue.use(VueSocketIO, SocketInstance)

// css
import './assets/css/common.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
  baseURL: baseURL
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
