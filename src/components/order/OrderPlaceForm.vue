<template>
  <div>
    <el-form v-loading="placeOrderLoading" ref="order" :model="order" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-autocomplete v-model="order.student.username" :fetch-suggestions="querySearchAsync" placeholder="请输入用户名"></el-autocomplete>
      </el-form-item>
      <el-form-item label="课程" prop="classDO.id">
        <el-cascader expand-trigger="hover" :options="courseOptions" v-model="courseClassIds">
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
      courseClassIds: [],
      order: {
        classDO: { id: '' },
        student: { id: '', username: '' },
        discount: 1,
        price: 0,
        payType: '线下支付'
      },
      students: [],
      courseOptions: []
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
      this.order.classDO.id = this.courseClassIds[1]
      this.courseOptions.forEach(course => {
        course.children.forEach(classDO => {
          this.order.price = classDO.price * this.order.discount
        })
      })
      console.log('待提交的表单', this.order)
      this.$confirm(
        `该学员享受的折扣为${this.order.discount},折扣后价格为${
          this.order.price
        },是否确认提交订单?`,
        '确认提交',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.doSubmit()
        })
        .catch(() => {
          this.resetForm()
        })
    },
    doSubmit() {
      this.placeOrderLoading = true
      this.axios
        .post('/orders', this.order)
        .then(response => {
          this.placeOrderLoading = false
          this.$message('下单成功')
          this.resetForm()
          this.$emit('order-place-success')
        })
        .catch(error => {
          this.placeOrderLoading = false
          if (error.response.status == 400) {
            this.$message.error('该学员已经选过该班级，不可重复选择')
          } else {
            this.$message.error('下单失败')
          }
        })
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
      this.courseClassIds = []
    },
    fetchCourseOptions() {
      this.axios
        .get(`/courses/institutions/${this._id()}/cascade_selector`)
        .then(response => {
          this.courseOptions = response.data
        })
        .catch(error => {
          throw error
        })
    }
  },
  created() {
    this.fetchCourseOptions()
    this.$nextTick(() => {
      this.$on('clearOrder', this.resetForm)
    })
  }
}
</script>

<style>

</style>
