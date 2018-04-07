<template>
  <div>
    <h1>我的订单</h1>
    <order-table :orders="orders" v-on:orderChanged="onOrderChanged"></order-table>
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
        studentId: this._id(),
        pageNum: this.orderPage,
        pageSize: this.DEFAULT_PAGE_SIZE
      }
      this.axios
        .post(`/orders/condition`, condition)
        .then(response => {
          this.loading = false
          this.orders = response.data.list
          this.orderPage = response.data.pages
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
      console.log('订单状态变化',newOrder)
      for (let i = 0; i < this.orders.length; ++i) {
        if (this.orders[i].id === newOrder.id) {
          console.log('修改...')
          this.$set(this.orders, i, newOrder)
          break
        }
      }
    }
  },
  created() {
    this.fetchOrders()
  },
  components: {
    OrderTable
  }
}
</script>

<style>

</style>
