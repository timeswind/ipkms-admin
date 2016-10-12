<template>
  <div id="student-account">
    <div class="pure-form">
      <fieldset>
        <input class="pure-input-rounded" type="text" placeholder="姓名" v-model="query.name">
        <input class="pure-input-rounded" type="number" placeholder="學號" v-model="query.schoolId">

        <button class="pure-button pure-button-primary" @click="queryStudents()">查詢</button>
      </fieldset>
    </div>
    <p v-show="results.data[0]" style="color:#aaa">以下是有關 <i v-show="results.query.name" style="color: #FF9800">姓名: {{results.query.name}} </i><i v-show="results.query.schoolId" style="color: #FF9800">學號: {{results.query.schoolId}} </i> 的搜索結果</p>
    <table class="pure-table pure-table-bordered" style="background-color: #fff">
      <thead>
        <tr>
          <th>#</th>
          <th>姓名</th>
          <th>學號</th>
          <th>操作</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="student in results.data" track-by="_id">
          <td style="width: 1%;white-space:nowrap">{{$index + 1}}</td>
          <td style="width: 1%;white-space:nowrap">{{student.name}}</td>
          <td>{{student.schoolId}}</td>
          <td style="width: 1%;white-space:nowrap">
            <button class="pure-button" v-link="{name:'student-detail', params: {student_id: student._id}}">查看</button>
            <button class="button-secondary pure-button" v-link="{name:'reset-password', params: { role: 'student', id: student._id}}">重置密碼</button>
            <button class="button-warning pure-button" @click="deleteStudent($index, student._id, student.name)">刪除</button>
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
        schoolId: null
      },
      results: {
        query: {
          name: '',
          schoolId: null
        },
        data: {}
      }
    }
  },
  methods: {
    queryStudents: function () {
      if (this.query.name || this.query.schoolId) {
        let apiUrl = '/api/manage-account/students?name=' + this.query.name + '&schoolId=' + this.query.schoolId
        this.$http.get(apiUrl).then(function (response) {
          this.results.data = response.data
          if (this.query.name) {
            this.results.query.name = this.query.name
          } else {
            this.results.query.name = null
          }
          if (this.query.schoolId) {
            this.results.query.schoolId = this.query.schoolId
          } else {
            this.results.query.schoolId = null
          }
        }, function (response) {
          console.log(response)
        })
      }
    },
    deleteStudent: function (index, student_id, name) {
      console.log('prepare to delete')
      if (window.confirm('確定刪除 ' + name + ' 這個學生賬號?')) {
        this.$http.delete('/api/manage-account/students?studentid=' + student_id).then(function (response) {
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
#student-account {
  margin-top: 16px
}

.pure-table {
  width: 100%
}

</style>
