<template>
  <div id="create-account">
    <div class="pure-form pure-form-stacked" style="display: flex">
      <div style="margin-right:32px">
        <label for="option-two" class="pure-radio">
          <input id="option-two" type="radio" name="optionsRadios" value="student" v-model="account.type">
          學生賬號
        </label>

        <label for="option-three" class="pure-radio">
          <input id="option-two" type="radio" name="optionsRadios" value="teacher" v-model="account.type">
          教師賬號
        </label>
      </div>

      <fieldset v-show="account.type === 'student'">

        <label for="student-name">姓名</label>
        <input id="student-name" type="text" placeholder="姓名" v-model="form.student.name">

        <label for="schoolId">學號</label>
        <input id="schoolId" type="text" placeholder="例如:20134021" v-model="form.student.schoolId">

        <div style="display:flex">
          <div style="margin-right:16px">
            <label for="grade">年級</label>
            <select id="grade" v-model="form.student.grade">
              <option value="1">中一</option>
              <option value="2">中二</option>
              <option value="3">中三</option>
              <option value="4">中四</option>
              <option value="5">中五</option>
              <option value="6">中六</option>
            </select>
          </div>
          <div>
            <label for="class">班級</label>
            <select id="class" v-model="form.student.class">
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
            </select>
          </div>
        </div>

        <button class="pure-button pure-button-primary" style="margin-top:16px" :disabled="!formComplete" @click="createStudent()">創建學生賬號</button>

      </fieldset>

      <fieldset v-show="account.type === 'teacher'">

        <label for="student-name">姓名</label>
        <input id="student-name" type="text" placeholder="姓名" v-model="form.teacher.name">

        <label for="schoolId">郵箱</label>
        <input id="schoolId" type="email" placeholder="郵箱" v-model="form.teacher.email">

        <button class="pure-button pure-button-primary" style="margin-top:16px" :disabled="!formComplete" @click="createTeacher()">創建教師賬號</button>

      </fieldset>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      account: {
        type: 'student'
      },
      form: {
        student: {
          name: '',
          schoolId: '',
          grade: 6,
          class: 'B'
        },
        teacher: {
          name: '',
          email: ''
        }
      },
      validate: {
        student: true,
        teacher: true
      }
    }
  },
  computed: {
    formComplete: function () {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if (this.account.type === 'student') {
        return (this.form.student.name.trim() !== '' && this.form.student.schoolId.length === 8)
      } else if (this.account.type === 'teacher') {
        return (this.form.teacher.name.trim() !== '' && re.test(this.form.teacher.email))
      } else {
        return false
      }
    }
  },
  methods: {
    createStudent: function () {
      if (this.formComplete) {
        let data = {
          name: this.form.student.name,
          schoolId: this.form.student.schoolId,
          grade: this.form.student.grade,
          class: this.form.student.class
        }
        this.$http.post('/api/manage-account/students', data).then(function (response) {
          this.showToast('成功創建新學生賬號')
          this.form.student.name = ''
          this.form.student.schoolId = ''
          this.form.student.grade = 6
          this.form.student.class = 'B'
        }, function (response) {
          this.showToast('！＃創建新學生賬號失敗＃!' + response.data)
        })
      }
    },
    createTeacher: function () {
      if (this.formComplete) {
        let data = {
          name: this.form.teacher.name,
          email: this.form.teacher.email
        }
        this.$http.post('/api/manage-account/teachers', data).then(function (response) {
          this.showToast('成功創建新教師賬號')
          this.form.teacher.name = ''
          this.form.teacher.email = ''
        }, function (response) {
          this.showToast('！＃創建新教師賬號失敗＃!' + response.data)
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
#create-account {
  margin-top: 16px
}

#create-account fieldset {
  background-color: #fff;
  padding: 16px 32px;
  border-radius: 4px;
  box-shadow: 0 1px 3px#aaa;
  min-width: 300px;
}

.pure-table {
  width: 100%
}

</style>
