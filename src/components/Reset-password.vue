<template>
  <div id="reset-password">
    <div class="flex-card">
      <div class="column flex-column">
        <span class="label">姓名</span>
        <span>{{user.data.name}}</span>
      </div>
      <div class="column flex-column">
        <span class="label">賬戶類型</span>
        <span>{{user.data.role}}</span>
      </div>
      <div class="column flex-column">
        <span class="label">重置的密码</span>
        <input class="pure-input" type="text" placeholder="password" v-model="password">
      </div>
      <div style="text-align: center;">
        <button class="pure-button button-warning" style="width: 100%; margin-top:8px" @click="resetUserPassword($route.params.role, $route.params.id)">確認重置</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  attached () {
    var role = this.$route.params.role
    var id = this.$route.params.id

    if (id && role) {
      console.log('good')
      this.getUserInfo(role, id)
    } else {
      this.showToast('params传入错误')
    }
  },
  data () {
    return {
      user: {
        id: null,
        data: {}
      },
      password: '123456'
    }
  },
  methods: {
    getUserInfo: function (role, id) {
      var apiURL = ''
      if (role === 'student') {
        apiURL = '/api/manage-account/students/reset-password/' + id
        this.$http.get(apiURL).then(function (response) {
          this.user.id = response.data._id
          this.user.data = response.data.local
        }, function (response) {
          this.showToast('發生錯誤: ' + response.data)
        })
      } else if (role === 'teacher') {
        apiURL = '/api/manage-account/teachers/reset-password/' + id
        this.$http.get(apiURL).then(function (response) {
          this.user.id = response.data._id
          this.user.data = response.data.local
        }, function (response) {
          this.showToast('發生錯誤: ' + response.data)
        })
      } else {
        this.showToast('不支持此用戶類型重置密碼')
      }
    },
    resetUserPassword: function (role, id) {
      var apiURL = ''
      var data = {
        password: this.password
      }
      if (role === 'student' && this.password.trim() !== '') {
        apiURL = '/api/manage-account/students/reset-password/' + id
        this.$http.post(apiURL, data).then(function (response) {
          this.showToast('重置密碼成功')
        }, function (response) {
          this.showToast('重置密碼失敗: ' + response.data)
        })
      } else if (role === 'teacher') {
        apiURL = '/api/manage-account/teachers/reset-password/' + id
        this.$http.post(apiURL, data).then(function (response) {
          this.showToast('重置密碼成功')
        }, function (response) {
          this.showToast('重置密碼失敗: ' + response.data)
        })
      } else {
        this.showToast('不支持此用戶類型重置密碼')
      }
    },
    showToast: function (message) {
      this.$dispatch('show-toast', message)
    }
  }
}
</script>

<style>
#reset-password {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
}

</style>
