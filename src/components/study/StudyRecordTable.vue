<template>
  <div>
    <el-table :data="studyRecords" stripe highlight-current-row>
      <el-table-column v-if="_isStudent()" prop="classDO.course.name" label="课程名" width="200">
      </el-table-column>
      <el-table-column v-if="_isStudent()" prop="classDO.name" label="班级名" width="100">
      </el-table-column>
      <el-table-column v-if="_isStudent()" prop="order.institution.username" label="开设机构" width="100">
      </el-table-column>
      <el-table-column v-if="_isInstitution()" prop="order.student.username" label="学员名" width="100">
      </el-table-column>
      <el-table-column v-if="_isInstitution()" prop="order.student.email" label="学员邮箱" width="250">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
      </el-table-column>
      <el-table-column prop="normalScore" label="平时分" width="100">
      </el-table-column>
      <el-table-column prop="totalScore" label="总评" width="100">
      </el-table-column>
      <el-table-column prop="order.id" label="订单号" width="100">
      </el-table-column>
      <el-table-column v-if="_isInstitution()" label="操作" width="100">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.status != '已选课'" @click="update(scope.row)">修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改选课信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form v-loading="loading" label-width="100px">
        <el-form-item label="平时分">
          <el-input v-model="newNormalScore"></el-input>
        </el-form-item>
        <el-form-item label="总评">
          <el-input v-model="newTotalScore"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submit">确 定</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['studyRecords'],
  data() {
    return {
      chosenStudyRecord: {},
      dialogVisible: false,
      loading: false,
      newNormalScore:0,
      newTotalScore:0
    }
  },
  methods: {
    update(studyRecord) {
      console.log('updating...')
      this.chosenStudyRecord = studyRecord
      this.newNormalScore = this.chosenStudyRecord.normalScore
      this.newTotalScore = this.chosenStudyRecord.totalScore
      this.dialogVisible = true
    },
    handleClose() {
      this.chosenStudyRecord = {}
      this.dialogVisible = false
    },
    submit() {
      this.loading = true
      this.chosenStudyRecord.normalScore = this.newNormalScore
      this.chosenStudyRecord.totalScore = this.newTotalScore
      this.axios
        .put('/study', this.chosenStudyRecord)
        .then(response => {
          this.chosenStudyRecord = {}
          this.loading = false
          this.dialogVisible = false
          this.$message({
            message: '更新选课信息成功',
            type: 'success'
          })
          this.$emit('study-record-update', response.data)
        })
        .catch(error => {
          this.chosenStudyRecord = {}
          this.dialogVisible = false
          this.loading = false
          this.$message.error('更新失败')
        })
    }
  }
}
</script>

<style>

</style>
