<template>
  <div>
    <h1>机构审批</h1>
    <institution-table purpose='approval' :institutions="approvingInstitutions" @approve-success="onApproveSuccess"></institution-table>
    <el-pagination style="text-align:center; margin-top:10px;" layout="prev, pager, next" :page-count="totalPages" @current-change="handlePageChanged" :current-page.sync="institutionPage">
    </el-pagination>
  </div>
</template>

<script>
import InstitutionTable from '@/components/institution/InstitutionTable'

export default {
  data() {
    return {
      approvingInstitutions: [],
      institutionPage: 1,
      totalPages: 1
    }
  },
  methods: {
    fetchApprovingInstitutions() {
      let params = {
        status: 'NOT_APPROVED',
        pageNum: this.institutionPage,
        pageSize: this.DEFAULT_PAGE_SIZE
      }
      this.axios
        .get('/institutions/status', { params: params })
        .then(response => {
          this.approvingInstitutions = response.data.list
          this.totalPages = response.data.pages
        })
        .catch(error => {
          throw error
        })
    },
    onApproveSuccess() {
      this.institutionPage = 1
      this.fetchApprovingInstitutions()
    },
    handlePageChanged(newPageNum) {
      this.institutionPage = newPageNum
      this.fetchApprovingInstitutions()
    }
  },
  components: {
    InstitutionTable
  },
  created() {
    this.fetchApprovingInstitutions()
  }
}
</script>

<style>

</style>
