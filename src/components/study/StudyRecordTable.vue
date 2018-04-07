<template>
  <div>
    <el-table :data="studyRecords" stripe highlight-current-row>
      <el-table-column prop="classDO.course.name" label="课程名" width="200">
      </el-table-column>
      <el-table-column prop="classDO.name" label="班级名" width="100">
      </el-table-column>
      <el-table-column prop="order.institution.username" label="开设机构" width="100">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
      </el-table-column>
      <el-table-column prop="normalScore" label="平时分" width="100">
      </el-table-column>
      <el-table-column prop="totalScore" label="总评" width="100">
      </el-table-column>
      <el-table-column prop="order.id" label="相关订单号" width="100">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ['studyRecords'],
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
