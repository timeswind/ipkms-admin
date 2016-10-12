<template>
  <div id="manage-account">
    <h1 class="left-heading">{{$route.title}}</h1>
    <div class="pure-menu pure-menu-horizontal">
      <ul class="pure-menu-list">
        <li class="pure-menu-item" v-link=""><a class="pure-menu-link" v-link="{name: 'student-account', activeClass: 'active'}">學生賬號</a></li>
        <li class="pure-menu-item"><a class="pure-menu-link" v-link="{name: 'teacher-account', activeClass: 'active'}">教師賬號</a></li>
        <li class="pure-menu-item"><a class="pure-menu-link">家长賬號</a></li>
        <li class="pure-menu-item"><a class="pure-menu-link">高級權限賬號</a></li>
        <a class="pure-button button-secondary" @click="goToCreateAccount()">新建賬號</a>
      </ul>
    </div>
    <router-view :is="view" transition="fade" transition-mode="out-in" keep-alive></router-view>

  </div>
</template>

<script>
export default {
  ready () {
    // this.$router.go({name: 'student-account'})
  },
  methods: {
    goToCreateAccount: function () {
      this.$router.go({name: 'create-account'})
    }
  }
}
</script>

<style>
#manage-account {
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 8px
}

#manage-account .pure-menu {
  border-bottom: 1px solid #ccc;
  padding-bottom: 16px
}

</style>
