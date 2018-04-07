<template>
  <div>
    <el-form v-loading="placeOrderLoading" ref="order" :model="order" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-autocomplete v-model="order.student.username" :fetch-suggestions="querySearchAsync" placeholder="请输入用户名"></el-autocomplete>
      </el-form-item>
      <el-form-item label="课程" prop="">
        <el-cascader expand-trigger="hover" :options="options" v-model="selectedOptions2" @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="placeOrder">下单</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      placeOrderLoading: false,
      order: {
        classDO: { id: '' },
        student: { id: '', username: '' },
        discount: 1,
        price: 0,
        payType: '线下支付'
      },
      students: []
    }
  },
  methods: {
    querySearchAsync(queryString, cb) {
      if (queryString == '') {
        return
      }
      this.axios.get(`/students/query/fuzzy/${queryString}`).then(response => {
        console.log('模糊查询结果', response.data)
        this.students = response.data
        let result = response.data.map(function(student) {
          return {
            value: student.username
          }
        })
        console.log('result', result)
        cb(result)
      })
    },
    placeOrder() {
      console.log('username', this.order.student.username)
      this.students.forEach(s => {
        if (s.username === this.order.student.username) {
          this.order.student.id = s.id
          this.order.discount = s.discount
        }
      })
      console.log('待提交的表单', this.order)
      // this.placeOrderLoading = true
      // this.axios
      //   .post('/orders', this.order)
      //   .then(response => {
      //     this.placeOrderLoading = false
      //     this.$message('下单成功')
      //     this.$router.push(`/endpoint/institutions/${this._id()}/orders`)
      //   })
      //   .catch(error => {
      //     this.placeOrderLoading = false
      //     if (error.response.status == 400) {
      //       this.$message.error('该学员已经选过该班级，不可重复选择')
      //     } else {
      //       this.$message.error('下单失败')
      //     }
      //   })
    },
    resetForm() {
      console.log('reset form...')
      this.order = {
        classDO: { id: '' },
        student: { id: '', username: '' },
        discount: 1,
        price: 0,
        payType: '线下支付'
      }
      this.students = []
    }
  },
  created() {
    this.$nextTick(() => {
      this.$on('clearOrder', this.resetForm)
    })
  }
}
</script>

<style>

</style>
