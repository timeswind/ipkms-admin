<template>
  <div id="login">
    <div class="form">
      <input class="field zocial-dribbble" v-model="email" type="text" placeholder="Admin email" />
      <input class="field zocial-dribbble" v-model="password" type="password" placeholder="Password"/>
      <button class="submit" value="Login" @click="login()">Log in</button>
      <div v-text="message" style="text-align: center;color:red;margin: 16px"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      message: ''
    }
  },
  methods: {
    login: function () {
      let data = {
        email: this.email,
        password: this.password
      }
      this.$http.post('/api/login', data).then(function (response) {
        console.log(response)
        if (response.status === 200 && response.data && response.data.token && response.data.admin && response.data.admin === true) {
          console.log('success')
          window.sessionStorage.token = response.data.token
          window.sessionStorage.admin = true
          this.email = ''
          this.password = ''
          this.message = ''
          this.$router.go({name: 'dashboard'})
        } else {
          this.password = ''
          this.message = '登入失败'
        }
      }, function (response) {
        if (response.status === 401) {
          this.password = ''
          this.message = '登入失败'
        }
      })
    },
    showToast: function (message) {
      this.$dispatch('show-toast', message)
    }
  }
}
</script>

<style>

#login .form{
  width: 400px;
  height: 230px;
  background: #edeff1;
  margin: 0px auto;
  padding-top: 20px;
  border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
}

#login .field{
  display: block;
  width: 309px;
  height: 35px;
  margin: 15px auto;
  background: #fff;
  border: 0px;
  padding: 5px;
  font-size: 16px;
  border: 2px solid #fff;
  transition: all 0.3s ease;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
}



#login .submit{
  display: block;
  background: #1abc9d;
  width: 314px;
  padding: 12px;
  cursor: pointer;
  color: #fff;
  border: 0px;
  margin: auto;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  font-size: 17px;
  transition: all 0.3s ease;
}

#login .submit:hover{
  background: #09cca6
}

#login a{
  text-align: center;
  font-family: Arial;
  color: gray;
  display: block;
  margin: 15px auto;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 12px;
}

#login a:hover{
  color: #1abc9d;
}


#login ::-webkit-input-placeholder {
  color: gray;
}

#login :-moz-placeholder { /* Firefox 18- */
  color: gray;
}

#login ::-moz-placeholder {  /* Firefox 19+ */
  color: gray;
}

#login :-ms-input-placeholder {
  color: gray;
}
</style>
