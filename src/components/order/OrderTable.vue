<template>
  <div>
    <el-table :data="orders" stripe highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column :key="Math.random()" v-if="purpose === '未结算'" type="selection" width="55">
      </el-table-column>
      <el-table-column :key="Math.random()" prop="id" label="订单号" width="100">
      </el-table-column>
      <el-table-column :key="Math.random()" prop="classDO.course.name" label="课程名" width="100">
      </el-table-column>
      <el-table-column :key="Math.random()" prop="classDO.name" label="班级名" width="100">
      </el-table-column>
      <el-table-column :key="Math.random()" v-if="_isStudent() || _isManager()" prop="institution.username" label="开设机构" width="100">
      </el-table-column>
      <el-table-column :key="Math.random()" v-if="_isInstitution() || _isManager()" prop="student.username" label="学员名" width="100">
      </el-table-column>
      <el-table-column :key="Math.random()" prop="placeTime" label="下单时间" width="100">
      </el-table-column>
      <el-table-column :key="Math.random()" prop="payType" label="支付类型" width="100">
      </el-table-column>
      <el-table-column :key="Math.random()" prop="discount" label="折扣" width="50">
      </el-table-column>
      <el-table-column :key="Math.random()" prop="price" label="金额" width="50">
      </el-table-column>
      <el-table-column :key="Math.random()" v-if="(_isInstitution() || _isManager()) && purpose !== '未结算' " label="结算状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.isSettled">已结算</span>
          <span v-else>未结算</span>
        </template>
      </el-table-column>
      <el-table-column :key="Math.random()" prop="status" label="订单状态" width="100">
      </el-table-column>
      <el-table-column :key="Math.random()" v-if="_isStudent()" label="操作" width="100">
        <template slot-scope="scope">
          <el-button v-show="scope.row.status == '未付款'" @click="pay(scope.row)">支付</el-button>
        </template>
      </el-table-column>
      <el-table-column :key="Math.random()" v-if="_isStudent()" label="操作" width="100">
        <template slot-scope="scope">
          <el-button v-show="scope.row.status == '未付款' || scope.row.status == '已付款'" @click="cancelOrder(scope.row)">取消</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="purpose === '未结算'">
      <el-button @click="settle">批量结算</el-button>
    </div>

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
  props: ['orders', 'purpose'],
  data() {
    return {
      order: {},
      payDialogVisible: false,
      loading: false,
      account: {
        alipayUsername: '',
        paymentPassword: ''
      },
      settlements: []
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
          console.log('error',error.response)
          this.payDialogVisible = false
          this.loading = false
           this.$message.error(`支付失败,${error.response.data.fieldErrors[0].message}`)
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
    },
    handleSelectionChange(val) {
      console.log('val', val)
      this.settlements = val.map(function(inputOrder) {
        return {
          order: { id: inputOrder.id },
          institution: { id: inputOrder.institution.id },
          percent: 0
        }
      })
      console.log('settlements', this.settlements)
    },
    settle() {
      this.$prompt('请输入给予机构的分成', '分成', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.settlements.forEach(settlement => {
          settlement.percent = value
        })
        console.log('settlements',this.settlements)
        this.axios
          .post('/settlement', this.settlements)
          .then(response => {
            this.$emit('order-changed')
            this.$message({
              message: '结算成功',
              type: 'success'
            })
          })
          .catch(error => {
            this.$message.error('结算失败')
            throw error
          })
      })
    }
  }
}
</script>

<style>

</style>
