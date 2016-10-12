<template>
  <div id="app">
    <router-view :is="view" transition="fade" transition-mode="out-in"></router-view>
    <toast :message="toast.message" :show="toast.show"></toast>
  </div>
</template>

<script>
import Toast from './components/Toast'

import './css/main.css'
export default {
  data () {
    return {
      toast: {
        message: '',
        show: false
      }
    }
  },
  components: {
    Toast
  },
  events: {
    'show-toast': function (message) {
      if (!this.toast.show) {
        let v = this
        this.toast.message = message
        this.toast.show = true
        setTimeout(function hideToast () {
          v.toast.show = false
        }, 2000)
      }
    },
    'confirm': function (message, proceed, cancel) {
      // Do something with args and fire callback (or not)
      var r = window.confirm(message)
      if (r === true) {
        proceed()
      } else {
        cancel()
      }
    }
  }
}
</script>

<style>
html {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #eee
}
</style>
