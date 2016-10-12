import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App'

Vue.config.debug = true

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.http.interceptors.push((request, next) => {
  // modify request
  if (window.sessionStorage.token) {
    request.headers['x-access-token'] = window.sessionStorage.token
  }
  next((response) => {
    try {
      response.data = JSON.parse(response.data)
    } catch (e) {
    }
  })
})

// Vue.http.interceptors.push({
//
//   request: function (request) {
//     console.log(window.sessionStorage.token)
//     if (window.sessionStorage.token) {
//       request.headers['x-access-token'] = window.sessionStorage.token
//     }
//     return request
//   },
//   response: function (response) {
//     return response
//   }
//
// })

var router = new VueRouter()

router.map({
  '/': {
    name: 'dashboard',
    component: function (resolve) {
      require(['./Dashboard.vue'], resolve)
    },
    title: '控制台'
  },
  '/login': {
    name: 'login',
    component: function (resolve) {
      require(['./views/login.vue'], resolve)
    },
    title: '管理員登入'
  },
  '/manage-account': {
    name: 'manage-account',
    component: function (resolve) {
      require(['./ManageAccount.vue'], resolve)
    },
    title: '賬號管理',
    subRoutes: {
      '/reset-password/:role/:id': {
        name: 'reset-password',
        component: function (resolve) {
          require(['./components/Reset-password.vue'], resolve)
        },
        title: '重置密碼'
      },
      '/student-account': {
        name: 'student-account',
        component: function (resolve) {
          require(['./components/Student-account.vue'], resolve)
        },
        title: '學生賬號'
      },
      '/student-account/detail/:student_id': {
        name: 'student-detail',
        component: function (resolve) {
          require(['./components/Student-detail.vue'], resolve)
        },
        title: '學生賬號詳情'
      },
      '/teacher-account': {
        name: 'teacher-account',
        component: function (resolve) {
          require(['./components/Teacher-account.vue'], resolve)
        },
        title: '教師賬號'
      },
      '/create-account': {
        name: 'create-account',
        component: function (resolve) {
          require(['./components/Create-account.vue'], resolve)
        },
        title: '创建賬號'
      }
    }
  }
})

router.beforeEach(function (transition) {
  if (transition.to.path !== '/login') {
    if (window.sessionStorage.token && window.sessionStorage.admin) {
      transition.next()
    } else {
      router.go({name: 'login'})
    }
  } else {
    transition.next()
  }
})

router.start(App, '#app')
