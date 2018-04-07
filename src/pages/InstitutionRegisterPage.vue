<template>
  <div class="register">
    <el-form :model="institution" ref="institution" label-width="100px">
      <el-form-item label="机构名">
        <el-input v-model="institution.username" size="tiny" @blur="onUsernameBlur"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="institution.password" auto-complete="off" size="tiny"></el-input>
      </el-form-item>
      <el-form-item label="城市">
        <el-input type="textarea" autosize placeholder="请输入所在城市" v-model="institution.location">
        </el-input>
      </el-form-item>
      <el-form-item label="机构介绍">
        <el-input type="textarea" autosize placeholder="请输入机构介绍" v-model="institution.description">
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="confirm">确认注册</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="提示" :visible.sync="successDialogVisible" width="30%">
      <span>您已经注册成功,您的ID是{{id}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="returnLogin">回到登录页面</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
export default {
  data() {
    return {
      institution: {
        username: '',
        password: '',
        location: '',
        description: ''
      },
      successDialogVisible: false,
      id: null
    }
  },
  methods: {
    isUsernameDuplicated() {
      if (this.institution.username === '') {
        return
      }
      this.axios
        .get(`/users/${this.institution.username}/duplication`)
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
      console.log('表单数据为', this.institution)
      if (
        this.institution.username !== '' &&
        this.institution.password !== ''
      ) {
        this.axios
          .post('/institutions', this.institution)
          .then(response => {
            console.log(response.data)
            const h = this.$createElement
            this.$notify({
              title: '注册成功',
              message: h('i', { style: 'color: teal' }, '欢迎您加入我们')
            })
            this.id = response.data.id
            this.successDialogVisible = true
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
    returnLogin() {
      this.successDialogVisible = false
      this.$router.push('/')
    },
    resetForm() {
      this.institution.username = ''
      this.institution.password = ''
      this.institution.location = ''
      this.institution.description = ''
    }
  }
}
</script>

<style scoped>
.register {
  width: 30%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
