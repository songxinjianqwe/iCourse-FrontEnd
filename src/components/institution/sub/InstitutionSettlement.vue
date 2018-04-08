<template>
  <div>
    <h1>结算管理</h1>
    <h3 v-if="totalSettlementValue != -1">您总计结算金额为 {{totalSettlementValue}} 元</h3>
    <settlement-table :settlements="settlements"></settlement-table>
    <el-pagination style="text-align:center; margin-top:10px;" layout="prev, pager, next" :page-count="totalPages" @current-change="handlePageChanged" :current-page.sync="settlementPage">
    </el-pagination>
  </div>
</template>
<script>
import SettlementTable from '@/components/settlement/SettlementTable'
export default {
  data() {
    return {
      settlements: [],
      settlementPage: 1,
      totalPages: 1,
      loading: true,
      totalSettlementValue: -1
    }
  },
  methods: {
    fetchSettlements() {
      this.loading = true
      let params = {
        pageNum: this.settlementPage,
        pageSize: this.DEFAULT_PAGE_SIZE
      }
      this.axios
        .get(`/settlement/institutions/${this._id()}`, { params: params })
        .then(response => {
          this.loading = false
          this.settlements = response.data.list
          this.totalPages = response.data.pages
        })
        .catch(error => {
          this.loading = false
          throw error
        })
    },
     handlePageChanged(newPageNum) {
      this.settlementPage = newPageNum
      this.fetchSettlements()
    },
    fetchStatistics() {
      this.axios
        .get(`/settlement/institutions/${this._id()}/statistics`)
        .then(response => {
          this.totalSettlementValue = response.data.income
        })
        .catch(error => {
          throw error
        })
    }
  },
  components: {
    SettlementTable
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      console.log('beforeRouteEnter:跳转至', to.path)
      vm.fetchSettlements()
      vm.fetchStatistics()
    })
  }
}
</script>

<style>

</style>
