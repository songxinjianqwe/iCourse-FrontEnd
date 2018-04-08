<template>
  <div>
    <h1>订单管理</h1>
    <el-button type="primary" @click="orderDialogVisible = true">添加线下学员</el-button>
    <el-dialog title="添加线下学员订单" :visible.sync="orderDialogVisible" width="30%" :before-close="handleClose">
      <order-place-form @order-place-success="onOrderPlaceSuccess" ref="orderPlaceForm"></order-place-form>
    </el-dialog>
    <order-table v-loading="loading" :orders="orders" ></order-table>
    <el-pagination style="text-align:center; margin-top:10px;" layout="prev, pager, next" :page-count="totalPages" @current-change="handlePageChanged" :current-page.sync="orderPage">
    </el-pagination>
  </div>
</template>

<script>
import OrderPlaceForm from '@/components/order/OrderPlaceForm'
import OrderTable from '@/components/order/OrderTable'
export default {
  data() {
    return {
      orderPage: 1,
      orders: [],
      loading: true,
      totalPages: 1,
      orderDialogVisible: false,
    }
  },
  methods: {
    fetchOrders() {
      this.loading = true
      let condition = {
        institutionId: this._id(),
        pageNum: this.orderPage,
        pageSize: this.DEFAULT_PAGE_SIZE
      }
      this.axios
        .post(`/orders/condition`, condition)
        .then(response => {
          this.loading = false
          this.orders = response.data.list
          this.totalPages = response.data.pages
        })
        .catch(error => {
          this.loading = false
          throw error
        })
    },
    handleClose() {
      this.$refs.orderPlaceForm.$emit('clearOrder')
      this.orderDialogVisible = false
    },
    onOrderPlaceSuccess(){
      this.orderDialogVisible = false
      this.fetchOrders()
    },
    handlePageChanged(newPageNum) {
      this.orderPage = newPageNum
      this.fetchOrders()
    },
    onOrderChanged(newOrder) {
      console.log('订单状态变化', newOrder)
      for (let i = 0; i < this.orders.length; ++i) {
        if (this.orders[i].id === newOrder.id) {
          console.log('修改...')
          this.orders.splice(i, 1, newOrder)
          break
        }
      }
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      console.log('beforeRouteEnter:跳转至', to.path)
      vm.fetchOrders()
    })
  },
  components: {
    OrderTable,
    OrderPlaceForm
  }
}
</script>

<style>

</style>
