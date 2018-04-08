<template>
  <div>
    <h1>学员概览</h1>
    <student-table :students="students"></student-table>
    <el-pagination style="text-align:center; margin-top:10px;" layout="prev, pager, next" :page-count="totalPages" @current-change="handlePageChanged" :current-page.sync="institutionPage">
    </el-pagination>
  </div>
</template>

<script>
import StudentTable from '@/components/student/StudentTable'
export default {
  data() {
    return {
      students: [],
      studentPage: 1,
      totalPages: 1
    }
  },
  methods:{
     fetchStudents() {
      let params = {
        pageNum: this.studentPage,
        pageSize: this.DEFAULT_PAGE_SIZE
      }
      this.axios
        .get('/students', { params: params })
        .then(response => {
          this.students = response.data.list
          this.totalPages = response.data.pages
        })
        .catch(error => {
          throw error
        })
    },
    handlePageChanged(newPageNum) {
      this.studentPage = newPageNum
      this.fetchStudents()
    }
  },
  components:{
    StudentTable
  },
  created() {
    this.fetchStudents()
  }
}
</script>

<style>

</style>
