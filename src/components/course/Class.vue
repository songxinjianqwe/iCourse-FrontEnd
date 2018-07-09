<template>
  <div class="classDO">
    <div class="class-text">
      <el-tag type="info">{{classDO.name}}</el-tag>
      <h3>{{classDO.price}}元</h3>
      <p style="font-size:12px;">限额:{{classDO.threshold}} 已选:{{classDO.currentCount}}</p>
      <el-button type="primary" v-if="_isStudent()" :disabled="classDO.currentCount == classDO.threshold" @click="choose">选课</el-button>
      <el-button v-if="_isInstitution()" @click="studyRecordDialogVisible = true">学员管理</el-button>
    </div>
    <el-dialog title="学员管理" :visible.sync="studyRecordDialogVisible" width="80%">
      <study-record-table @study-record-update="onStudyRecordUpdate" v-loading="loading" :studyRecords="studyRecords"></study-record-table>
      <el-pagination style="text-align:center; margin-top:10px;" layout="prev, pager, next" :page-count="totalPages" @current-change="handlePageChanged" :current-page.sync="recordPage">
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import StudyRecordTable from '@/components/study/StudyRecordTable'

export default {
  props: ['classDO'],
  data() {
    return {
      studyRecordDialogVisible: false,
      recordPage: 1,
      studyRecords: [],
      totalPages: 1,
      loading: true
    }
  },
  methods: {
    choose() {
      console.log('Class#classChosen')
      this.$emit('classChosen', this.classDO)
    },
    fetchStudyRecords() {
      this.loading = true
      let params = {
        pageNum: this.recordPage,
        pageSize: this.DEFAULT_PAGE_SIZE
      }
      this.axios
        .get(`/study/classes/${this.classDO.id}`, { params: params })
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
    },
    onStudyRecordUpdate(newStudyRecord) {
      console.log('订单状态变化', newStudyRecord)
      for (let i = 0; i < this.studyRecords.length; ++i) {
        if (this.studyRecords[i].id === newStudyRecord.id) {
          console.log('修改...')
          this.studyRecords.splice(i, 1, newStudyRecord)
          break
        }
      }
    }
  },
  components: {
    StudyRecordTable
  },
  created() {
    this.fetchStudyRecords()
  }
}
</script>

<style>
.classDO {
  padding: 10px;
}
.class-text{
  text-align: center;
}
.class-text > *:not(:first-child) {
  margin: 8px 0 0 0;
}
</style>
