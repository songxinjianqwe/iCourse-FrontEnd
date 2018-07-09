<template>
  <div>
    <h1>我的资料</h1>
    <el-form v-loading="loading" ref="student" :model="student" label-width="80px">
      <el-form-item label="ID" prop="id">
        {{student.id}}
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        {{student.username}}
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        {{student.email}}
      </el-form-item>
      <el-form-item label="注册时间" prop="regTime">
        {{student.regTime}}
      </el-form-item>
      <el-form-item label="会员等级" prop="vipLevel">
        {{student.vipLevel}}
      </el-form-item>
      <el-form-item label="消费金额" prop="consumptions">
        {{student.consumptions}}
      </el-form-item>
      <el-form-item label="昵称" prop="regTime">
        <el-input style="width:300px;" v-model="student.nickname"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="confirmUpdate">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      student: {},
      loading: true
    }
  },
  methods: {
    fetchStudent() {
      console.log('获取用户信息')
      let params = { key: this._id(), mode: 'id' }
      this.axios
        .get(`/students/query`, { params: params })
        .then(response => {
          this.student = response.data
          this.loading = false
        })
        .catch(error => {
          this.loading = false
          throw error
        })
    },
    confirmUpdate() {
      this.$confirm('此操作将修改用户信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.onModify()
      }).catch(() => {
         this.fetchStudent();        
      });
    },
    onModify() {
      console.log('待更新的表单数据')
      console.log(this.student)
      this.axios
        .put(`/students`, this.student)
        .then(response => {
          console.log('更新完毕')
          this.$message({
            type: 'success',
            message: '更新成功!'
          })
          this.student = response.data
        })
        .catch(error => {
          console.log('更新失败')
          console.log(error)
        })
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      console.log('beforeRouteEnter:跳转至', to.path)
      vm.fetchStudent()
    })
  }
}
</script>

<style>

</style>
