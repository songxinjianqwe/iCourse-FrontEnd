<template>
  <div>
    <h1>机构信息</h1>
    <el-form v-loading="loading" ref="institution" :model="institution" label-width="80px">
      <el-form-item label="ID" prop="id">
        {{institution.id}}
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        {{institution.username}}
      </el-form-item>
      <el-form-item label="所在城市" prop="location">
        <el-input v-model="institution.location"></el-input>
      </el-form-item>
      <el-form-item label="机构介绍" prop="description">
        <el-input type="textarea" autosize v-model="institution.description">
        </el-input>
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
      institution: {},
      loading: true
    }
  },
  methods: {
    fetchInstitution() {
      console.log('获取机构信息')
      let params = { key: this._id(), mode: 'id' }
      this.axios
        .get(`/institutions/query`, { params: params })
        .then(response => {
          this.institution = response.data
          this.loading = false
        })
        .catch(error => {
          this.loading = false
          throw error
        })
    },
    confirmUpdate() {
      this.$confirm('此操作将修改机构信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.onModify()
      })
    },
    onModify() {
      console.log('待更新的表单数据')
      console.log(this.institution)
      this.axios
        .put(`/institutions`, this.institution)
        .then(response => {
          console.log('更新完毕')
          this.$message({
            type: 'success',
            message: '更新成功!'
          })
          this.institution = response.data
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
      vm.fetchInstitution()
    })
  }
}
</script>

<style>

</style>
