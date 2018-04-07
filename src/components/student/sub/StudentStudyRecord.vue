<template>
  <div>
    <h1>我的课程</h1>
    <study-record-table v-loading="loading" :studyRecords="studyRecords"></study-record-table>
    <el-pagination style="text-align:center; margin-top:10px;" layout="prev, pager, next" :page-count="totalPages" @current-change="handlePageChanged" :current-page.sync="recordPage">
    </el-pagination>
  </div>
</template>

<script>
import StudyRecordTable from '@/components/study/StudyRecordTable'

export default {
  data() {
    return {
      recordPage: 1,
      studyRecords: [],
      totalPages: 1,
      loading: true
    }
  },
  methods: {
    fetchStudyRecords() {
      this.loading = true
      let params = {
        pageNum: this.recordPage,
        pageSize: this.DEFAULT_PAGE_SIZE
      }
      this.axios
        .get(`/study/students/${this._id()}`, { params: params })
        .then(response => {
          this.loading = false
          this.studyRecords = response.data.list
          this.totalPages = response.data.pages
        })
        .catch(error => {
          this.loading = false
          throw error
        })
    },
    handlePageChanged(newPageNum) {
      this.recordPage = newPageNum
      this.fetchStudyRecords()
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      console.log('beforeRouteEnter:跳转至', to.path)
      vm.fetchStudyRecords()
    })
  },
  components: {
    StudyRecordTable
  }
}
</script>

<style>

</style>
