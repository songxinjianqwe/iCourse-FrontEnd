<template>
  <div>
    <el-table :data="orders" stripe highlight-current-row>
      <el-table-column prop="id" label="订单号" width="100">
      </el-table-column>
      <el-table-column prop="classDO.course.name" label="课程名" width="100">
      </el-table-column>
      <el-table-column prop="classDO.name" label="班级名" width="100">
      </el-table-column>
      <el-table-column v-if="_isStudent()" prop="institution.username" label="开设机构" width="100">
      </el-table-column>
      <el-table-column v-if="_isInstitution()" prop="student.username" label="学员名" width="100">
      </el-table-column>
      <el-table-column prop="placeTime" label="下单时间" width="100">
      </el-table-column>
      <el-table-column prop="payType" label="支付类型" width="100">
      </el-table-column>
      <el-table-column prop="discount" label="折扣" width="50">
      </el-table-column>
      <el-table-column prop="price" label="金额" width="50">
      </el-table-column>
      <el-table-column prop="status" label="订单状态" width="100">
      </el-table-column>
      <el-table-column v-if="_isStudent()" label="操作" width="100">
        <template slot-scope="scope">
          <el-button v-show="scope.row.status == '未付款'" @click="pay(scope.row)">支付</el-button>
        </template>
      </el-table-column>
      <el-table-column v-if="_isStudent()" label="操作" width="100">
        <template slot-scope="scope">
          <el-button v-show="scope.row.status == '未付款' || scope.row.status == '已付款'" @click="cancelOrder(scope.row)">取消</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="支付" :visible.sync="payDialogVisible" width="30%">
      <span>请输入支付账号和密码</span>
      <el-form v-loading="loading" :model="account" ref="account" label-width="100px">
        <el-form-item label="用户名" prop="alipayUsername">
          <el-input v-model="account.alipayUsername" size="tiny"></el-input>
        </el-form-item>
        <el-form-item label="支付密码" prop="paymentPassword">
          <el-input type="password" v-model="account.paymentPassword" auto-complete="off" size="tiny"></el-input>
        </el-form-item>
        <el-form-item class="item">
          <el-button @click="cancelPay">取 消</el-button>
          <el-button type="primary" :disabled="account.alipayUsername == '' || account.paymentPassword == ''" @click="confirmPay">支付</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['orders'],
  data() {
    return {
      order: {},
      payDialogVisible: false,
      loading: false,
      account: {
        alipayUsername: '',
        paymentPassword: ''
      }
    }
  },
  methods: {
    pay(order) {
      this.order = order
      this.payDialogVisible = true
    },
    confirmPay() {
      this.loading = true
      this.axios
        .post(`/account/pay/${this.order.id}`, this.account)
        .then(response => {
          this.payDialogVisible = false
          this.loading = false
          this.$message({
            message: '支付成功',
            type: 'success'
          })
          console.log('支付结果', response.data)
          this.$emit('orderChanged', response.data)
        })
        .catch(error => {
          this.payDialogVisible = false
          this.loading = false
          this.$message.error('支付失败')
        })
    },
    cancelPay() {
      this.payDialogVisible = false
      this.account = {
        alipayUsername: '',
        paymentPassword: ''
      }
    },
    cancelOrder(order) {
      if (order.status == '未付款') {
        this.doCancelOrder(order)
        return
      }
      let waringingString = ''
      if (
        Date.parse(new Date(order.classDO.course.startTime)) <=
        Date.parse(new Date())
      ) {
        waringingString =
          '注意，该订单对应课程已经开课，如果取消，您将无法得到任何退款'
      } else {
        waringingString =
          '注意，该订单对应课程尚未开课，如果取消，您只能得到一半退款'
      }
      this.$confirm(waringingString, '取消订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doCancelOrder(order)
      })
    },
    doCancelOrder(order) {
      this.axios
        .put(`/orders/cancel/${order.id}`)
        .then(response => {
          this.$emit('orderChanged', response.data)
        })
        .catch(error => {})
    }
  }
}
</script>

<style>

</style>
