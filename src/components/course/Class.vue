<template>
  <div class="classDO">
    <div class="classText">
      <h2 class="left">{{classDO.name}}</h2>
      <h3>{{classDO.price}}元</h3>
      <h3>限额:{{classDO.threshold}}</h3>
      <h3>已选:{{classDO.currentCount}}</h3>
      <el-progress :text-inside="true" :stroke-width="18" :percentage="Math.round(100 * classDO.currentCount / classDO.threshold)"></el-progress>
      <div class="choose-btn">
        <el-button type="primary" v-if="_isStudent()" :disabled="classDO.currentCount == classDO.threshold" @click="choose">选课</el-button>
      </div>
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
  border-style: solid;
  border-width: 1px;
  width:400px;
}
.classText{
  text-align:center;
}
.left{
  text-align:left;
}
.choose-btn{
  margin-top: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  text-align:right;
}
</style>
