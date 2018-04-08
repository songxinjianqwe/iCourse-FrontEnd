<template>
  <div>
    <h1>机构概览</h1>
    <institution-table purpose='view' :institutions="institutions"></institution-table>
    <el-pagination style="text-align:center; margin-top:10px;" layout="prev, pager, next" :page-count="totalPages" @current-change="handlePageChanged" :current-page.sync="institutionPage">
    </el-pagination>
  </div>
</template>

<script>
import InstitutionTable from '@/components/institution/InstitutionTable'

export default {
  data() {
    return {
      institutions: [],
      institutionPage: 1,
      totalPages: 1
    }
  },
  methods: {
    fetchInstitutions() {
      let params = {
        pageNum: this.institutionPage,
        pageSize: this.DEFAULT_PAGE_SIZE
      }
      this.axios
        .get('/institutions', { params: params })
        .then(response => {
          this.institutions = response.data.list
          this.totalPages = response.data.pages
        })
        .catch(error => {
          throw error
        })
    },
    handlePageChanged(newPageNum) {
      this.institutionPage = newPageNum
      this.fetchInstitutions()
    }
  },
  components: {
    InstitutionTable
  },
  created() {
    this.fetchInstitutions()
  }
}
</script>

<style>

</style>
