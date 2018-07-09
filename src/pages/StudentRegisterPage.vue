<template>
  <div class="register">
    <el-form v-if="!send" :model="student" ref="student" label-width="100px" class="my-form">
      <el-form-item label="用户名">
        <el-input v-model="student.username" size="tiny" @blur="onUsernameBlur"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="student.password" auto-complete="off" size="tiny"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input placeholder="请输入昵称" v-model="student.nickname">
        </el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input placeholder="请输入邮箱" v-model="student.email">
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="confirm">确认注册</el-button>
      </el-form-item>
    </el-form>

    <div v-if="send">
      请验证邮件
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      student: {
        username: '',
        password: '',
        email: '',
        nickname: ''
      },
      send: false
    }
  },
  methods: {
    isUsernameDuplicated() {
      if (this.student.username === '') {
        return
      }
      this.axios
        .get(`/users/${this.student.username}/duplication`)
        .then(response => {
          if (response.data) {
            this.resetForm()
            this.$alert('用户名不可重复', '输入错误', {
              confirmButtonText: '确定'
            })
          }
        })
    },
    onUsernameBlur() {
      this.isUsernameDuplicated()
    },
    confirm() {
      this.isUsernameDuplicated()
      console.log('表单数据为', this.student)
      if (this.student.username !== '' && this.student.password !== '') {
        this.axios
          .post('/students', this.student)
          .then(response => {
            console.log(response.data)
            const h = this.$createElement
            this.$notify({
              title: '请验证邮件',
              message: h('i', { style: 'color: teal' }, '验证邮件已发送，请查收')
            })
            this.send = true
          })
          .catch(error => {
            throw error
          })
      } else {
        this.$alert('用户名和密码不可为空', '输入错误', {
          confirmButtonText: '确定'
        })
      }
    },
    resetForm() {
      this.student.username = ''
      this.student.password = ''
      this.student.email = ''
      this.student.nickname = ''
    }
  }
}
</script>

<style scoped>
.register {
  width: 50%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  margin-bottom: 20px;
}
.my-form {
  background-color: rgba(159, 216, 226, 0.75);
  padding: 20px;
  padding-right: 102px;
  border-radius: 10px;
}
</style>
