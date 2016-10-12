<template>
  <div id="student-detail">
    <!-- {{results.data | json}} -->
    <div class="student-detail-card">
      <div class="pure-form">
        <fieldset>
          <div class="column" style="display:flex; flex-direction: column">
            <span class="label">姓名</span><span v-show="!editMode"> {{results.data.name}}</span>
            <input class="pure-input" type="text" placeholder="姓名" v-model="update.data.name" v-show="editMode">
          </div>
          <div class="column" style="display:flex; flex-direction: column">
            <span class="label">學號</span><span v-show="!editMode"> {{results.data.schoolId}}</span>
            <input class="pure-input" type="number" placeholder="學號" v-model="update.data.schoolId" v-show="editMode">
          </div>
          <div class="column" style="display:flex; flex-direction: column">
            <span class="label">班級</span><span v-show="!editMode"> {{results.data.grade}}{{results.data.class}}</span>
            <div v-show="editMode">
              <div style="display:flex; flex-direction: row">
                <div style="margin-right:16px">
                  <select id="grade" v-model="update.data.grade">
                    <option value="1">中一</option>
                    <option value="2">中二</option>
                    <option value="3">中三</option>
                    <option value="4">中四</option>
                    <option value="5">中五</option>
                    <option value="6">中六</option>
                  </select>
                </div>
                <div>
                  <select id="class" v-model="update.data.theclass">
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                  </select>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div style="text-align: center;">
          <button class="pure-button pure-button-primary" style="width: 100%" @click="startEdit()" v-show="!editMode">編輯基本信息</button>
          <button class="pure-button button-warning" style="width: 100%; margin-top:8px" v-show="!editMode" v-link="{name:'reset-password', params: { role: 'student', id: $route.params.student_id}}">重置密碼</button>
          <button class="pure-button button-secondary" style="width: 100%; margin-bottom: 8px" @click="updateStudent()" v-show="editMode">更新</button>
          <button class="pure-button" style="width: 100%" @click="editMode = false" v-show="editMode">取消</button>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script>
export default {
  attached () {
    var student_id = this.$route.params.student_id
    this.getStudentDetail(student_id)
  },
  data () {
    return {
      results: {
        data: {}
      },
      update: {
        data: {
          name: null,
          schoolId: null,
          grade: null,
          theclass: null
        }
      },
      editMode: false
    }
  },
  methods: {
    getStudentDetail: function (student_id) {
      if (student_id) {
        var apiURL = '/api/manage-account/students/' + student_id
        this.$http.get(apiURL).then(function (response) {
          this.results.data = response.data
        }, function (response) {
          this.showToast('遇到錯誤: ' + response.data)
        })
      }
    },
    updateStudent: function () {
      var student_id = this.$route.params.student_id
      if (student_id && this.updateDataDifference) {
        var data = {
          student_id: student_id,
          name: this.update.data.name,
          schoolId: this.update.data.schoolId,
          grade: this.update.data.grade,
          class: this.update.data.theclass
        }
        var apiURL = '/api/manage-account/students/' + student_id
        this.$http.put(apiURL, data).then(function (response) {
          this.editMode = false
          this.results.data = response.data
          this.showToast('更新成功')
        }, function (response) {
          this.showToast('遇到錯誤: ' + response.data)
        })
      } else {
        this.editMode = false
      }
    },
    startEdit: function () {
      this.update.data.name = this.results.data.name
      this.update.data.schoolId = this.results.data.schoolId
      this.update.data.grade = this.results.data.grade
      this.update.data.theclass = this.results.data.class

      this.editMode = true
    },
    showToast: function (message) {
      this.$dispatch('show-toast', message)
    }
  },
  computed: {
    updateDataDifference: function () {
      return (this.results.data.name !== this.update.data.name || this.results.data.schoolId !== this.update.data.schoolId || this.results.data.class !== this.update.data.theclass || this.results.data.grade !== this.update.data.grade)
    }
  }
}
</script>

<style>
#student-detail {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
}

.student-detail-card {
  background: #fff;
  margin: 0 auto;
  min-width: 300px;
  padding: 16px 32px;
  box-shadow: 0 1px 3px #aaa
}

.student-detail-card .column {
  margin-bottom: 16px;
  font-size: 20px
}

.student-detail-card .column>.label {
  font-size: 14px;
  margin-bottom: 4px;
  color: #9e9e9e
}
</style>
