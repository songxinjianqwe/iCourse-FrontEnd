<template>
  <div>
    <h1>课程广场</h1>
    <course class="course" @classChosen="onClassChosen" v-for="course in courses" :key="course.id" :course="course"></course>
    <el-pagination style="text-align:center; margin-top:10px;" layout="prev, pager, next" :page-count="totalPages" @current-change="handlePageChanged" :current-page.sync="coursePage">
    </el-pagination>

    <el-dialog v-loading="placeOrderLoading" title="确认订单" :visible.sync="orderConfirmDialogVisible" width="30%">
      <span>您享受的折扣为{{discount}},本笔订单的金额为{{discount * classDO.price}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="orderConfirmDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="placeOrder">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Course from '@/components/course/Course'
export default {
  data() {
    return {
      courses: [],
      coursePage: 1,
      totalPages: 1,
      loading: true,
      orderConfirmDialogVisible: false,
      discount: 1,
      classDO: {},
      placeOrderLoading: false
    }
  },
  methods: {
    fetchCourse() {
      this.loading = true
      let params = {
        pageNum: this.coursePage,
        pageSize: this.DEFAULT_PAGE_SIZE
      }
      this.axios
        .get(`/courses`, {
          params: params
        })
        .then(response => {
          this.courses = response.data.list
          this.totalPages = response.data.pages
          this.loading = false
        })
        .catch(error => {
          this.loading = false
          throw error
        })
    },
    handlePageChanged(newPageNum) {
      this.coursePage = newPageNum
      this.fetchCourse()
    },
    onClassChosen(classDO) {
      console.log('显示下单dialog')
      this.orderConfirmDialogVisible = true
      this.classDO = classDO
    },
    placeOrder() {
      this.orderConfirmDialogVisible = false
      this.placeOrderLoading = true
      let order = {
        classDO: { id: this.classDO.id },
        student: { id: this._id() },
        discount: this.discount,
        price: this.discount * this.classDO.price,
        payType: '线上支付'
      }
      this.axios
        .post('/orders', order)
        .then(response => {
          this.placeOrderLoading = false
          this.$message('下单成功')
          this.$router.push(`/endpoint/students/${this._id()}/orders`)
        })
        .catch(error => {
          this.placeOrderLoading = false
          if (error.response.status == 400) {
            this.$message.error('您已经选过该班级，不可重复选择')
          } else {
            this.$message.error('下单失败')
          }
        })
    },
    fetchDiscount() {
      this.axios
        .get('/vip/discount')
        .then(response => {
          console.log('折扣加载完毕', response.data)
          this.discount = response.data
        })
        .catch(error => {
          throw error
        })
    }
  },
  components: {
    Course
  },
  created() {
    this.fetchDiscount()
    this.fetchCourse()
  }
}
</script>

<style>
.course{
  margin-bottom: 20px;
}
</style>
