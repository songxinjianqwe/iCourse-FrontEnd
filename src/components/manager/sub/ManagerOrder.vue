<template>
  <div>
    <h1>订单管理</h1>
    <el-radio-group v-model="type" @change="onTypeChanged">
      <el-radio label="未结算">未结算</el-radio>
      <el-radio label="不限">不限</el-radio>
    </el-radio-group>
    <p>  </p>
    <order-table :purpose="type" v-loading="loading" :orders="orders" @order-changed="onOrderChanged"></order-table>
    <el-pagination style="text-align:center; margin-top:10px;" layout="prev, pager, next" :page-count="totalPages" @current-change="handlePageChanged" :current-page.sync="orderPage">
    </el-pagination>
  </div>
</template>

<script>
import OrderTable from '@/components/order/OrderTable'
export default {
  data() {
    return {
      type: '不限',
      orderPage: 1,
      orders: [],
      loading: true,
      totalPages: 1
    }
  },
  methods: {
    onTypeChanged(){
      this.orderPage = 1
      this.fetchOrders()
    },
    fetchOrders() {
      if (this.type == '不限') {
        this.fetchAllOrders()
      } else if (this.type == '未结算') {
        this.fetchUnSettledOrders()
      }
    },
    fetchUnSettledOrders() {
      this.loading = true
      let params = {
        pageNum: this.orderPage,
        pageSize: this.DEFAULT_PAGE_SIZE
      }
      this.axios
        .get('/settlement/unsettled_orders', { params: params })
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
    fetchAllOrders() {
      this.loading = true
      let params = {
        pageNum: this.orderPage,
        pageSize: this.DEFAULT_PAGE_SIZE
      }
      this.axios
        .get(`/orders`, { params: params })
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
    onOrderChanged() {
      this.orderPage = 1
      this.fetchOrders()
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
