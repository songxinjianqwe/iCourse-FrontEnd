<template>
  <div>
    <h1>课程管理</h1>
    <el-button type="primary" @click="newCourseDialogVisible = true">新增课程</el-button>
    <el-dialog title="新增课程" :visible.sync="newCourseDialogVisible" width="50%" :before-close="handleClose">
      <course-new ref="courseNew" @course-new-success="onCourseNewSuccess"></course-new>
    </el-dialog>
    
    <course v-for="course in courses" :key="course.id" :course="course"></course>
    <el-pagination style="text-align:center; margin-top:10px;" layout="prev, pager, next" :page-count="totalPages" @current-change="handlePageChanged" :current-page.sync="coursePage">
    </el-pagination>
  </div>
</template>

<script>
import CourseNew from '@/components/course/CourseNew'
import Course from '@/components/course/Course'

export default {
  data() {
    return {
      coursePage: 1,
      courses: [],
      totalPages: 1,
      loading: false,
      newCourseDialogVisible: false
    }
  },
  methods: {
    handleClose() {
      this.$refs.courseNew.$emit('clearCourse')
      this.newCourseDialogVisible = false
    },
    handlePageChanged(newPageNum) {
      this.coursePage = newPageNum
      this.fetchCourses()
    },
    onCourseNewSuccess() {
      this.newCourseDialogVisible = false
      this.coursePage = 1
      this.fetchCourses()
    },
    fetchCourses() {
      let params = {
        pageNum: this.coursePage,
        pageSize: this.DEFAULT_PAGE_SIZE
      }
      this.axios
        .get(`/courses/institutions/${this._id()}`, { params: params })
        .then(response => {
          this.totalPages = response.data.pages
          this.courses = response.data.list
        })
        .catch(error => {
          throw error
        })
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      console.log('beforeRouteEnter:跳转至', to.path)
      vm.fetchCourses()
    })
  },
  components: {
    CourseNew,
    Course
  }
}
</script>

<style>

</style>
