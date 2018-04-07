<template>
  <!-- 键盘监听回车键，按下时提交表单 -->
  <div class="login" @keydown.enter="submitForm">
    <el-form v-if="!_isLogin()" :model="loginForm" ref="loginForm" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" size="tiny"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" size="tiny"></el-input>
      </el-form-item>
      <el-form-item label="用户类型" prop="userType">
        <el-select v-model="loginForm.userType" placeholder="请选择">
          <el-option v-for="item in userTypes" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="item">
        <el-button type="primary" @click="submitForm">登录</el-button>
        <el-button @click="resetForm">重置</el-button>
        <el-button @click="register('institution')">注册机构</el-button>
        <el-button @click="register('student')">注册学生</el-button>
      </el-form-item>
    </el-form>
    <div v-if="_isLogin()">
      请转至入口区
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        userType: ''
      },
      userTypes: [
        { label: '学生', value: 'STUDENT' },
        { label: '机构', value: 'INSTITUTION' },
        { label: '经理', value: 'MANAGER' }
      ]
    }
  },
  methods: {
    register(type) {
      this.$router.push(`/register/${type}`)
    },
    submitForm() {
      console.log(this.loginForm)
      this.axios
        .post('/tokens', this.loginForm)
        .then(response => {
          console.log('登录成功')
          console.log(response.data)
          //清空表单
          this.resetForm()
          //发出成功提示
          const h = this.$createElement
          this.$notify({
            title: '登录成功',
            message: h(
              'i',
              { style: 'color: teal' },
              '欢迎您，' + response.data.username
            )
          })
          localStorage.setItem('loginResult', JSON.stringify(response.data))
          setTimeout(() => {
            //跳转回主页
            if ('redirect' in this.$route.query) {
              this.$router.push(this.$route.query.redirect)
            }
            this.$router.push(
              `/endpoint/${response.data.role + 's'}/${response.data.id}`
            )
          }, 500)
        })
        .catch(error => {
          console.log(error)
        })
    },
    resetForm() {
      this.$refs['loginForm'].resetFields()
    }
  }
}
</script>

<style scoped>
.login {
  width: 40%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
