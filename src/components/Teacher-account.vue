<template>
  <div id="teacher-account">
    <div class="pure-form">
      <fieldset>
        <input class="pure-input-rounded" type="text" placeholder="姓名" v-model="query.name">
        <input class="pure-input-rounded" type="text" placeholder="郵箱" v-model="query.email">

        <button class="pure-button pure-button-primary" @click="queryTeachers()">查詢</button>
      </fieldset>
    </div>
    <p v-show="results.data[0]" style="color:#aaa">以下是有關 <i v-show="results.query.name" style="color: #FF9800">姓名: {{results.query.name}} </i> <i v-show="results.query.email" style="color: #FF9800">郵箱: {{results.query.email}} </i> 的搜索結果</p>
    <table class="pure-table pure-table-horizontal" style="background-color: #fff">
      <thead>
        <tr>
          <th>#</th>
          <th>姓名</th>
          <th>郵箱</th>
          <th>操作</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="teacher in results.data">
          <td style="width: 1%;white-space:nowrap">{{$index + 1}}</td>
          <td>{{teacher.name}}</td>
          <td>{{teacher.email}}</td>
          <td style="width: 1%;white-space:nowrap">
            <button class="pure-button">查看</button>
            <button class="button-secondary pure-button" v-link="{name:'reset-password', params: { role: 'teacher', id: teacher._id}}">重置密碼</button>
            <button class="button-warning pure-button" @click="deleteTeacher($index, teacher._id)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      query: {
        name: '',
        email: ''
      },
      results: {
        query: {
          name: '',
          email: ''
        },
        data: {}
      }
    }
  },
  methods: {
    queryTeachers: function () {
      if (this.query.name || this.query.email) {
        let apiUrl = '/api/manage-account/teachers?name=' + this.query.name + '&email=' + this.query.email
        this.$http.get(apiUrl).then(function (response) {
          this.results.data = response.data
          if (this.query.name) {
            this.results.query.name = this.query.name
          } else {
            this.results.query.name = null
          }
          if (this.query.email) {
            this.results.query.email = this.query.email
          } else {
            this.results.query.email = null
          }
        }, function (response) {
          console.log(response)
        })
      }
    },
    deleteTeacher: function (index, teacher_id) {
      console.log('prepare to delete')
      if (window.confirm('確定刪除？')) {
        let data = {
          teacher_id: teacher_id
        }
        this.$http.delete('/api/manage-account/teachers', data).then(function (response) {
          this.results.data.splice(index, 1)
          this.showToast('删除成功')
        }, function (response) {
          this.showToast('！＃删除失败＃!' + response.data)
        })
      }
    },
    showToast: function (message) {
      this.$dispatch('show-toast', message)
    }
  }
}
</script>

<style>
#teacher-account {
  margin-top: 16px
}

.pure-table {
  width: 100%
}

</style>
