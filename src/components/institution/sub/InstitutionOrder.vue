<template>
  <div>
    <h1>订单管理</h1>
    <order-table v-loading="loading" :orders="orders" ></order-table>
    <el-pagination style="text-align:center; margin-top:10px;" layout="prev, pager, next" :page-count="totalPages" @current-change="handlePageChanged" :current-page.sync="orderPage">
    </el-pagination>
  </div>
</template>

<script>
import OrderTable from '@/components/order/OrderTable'
export default {
  data() {
    return {
      orderPage: 1,
      orders: [],
      loading: true,
      totalPages: 1
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
    OrderTable
  }
}
</script>

<style>

</style>
