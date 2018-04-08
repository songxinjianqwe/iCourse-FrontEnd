<template>
  <div>
    <el-table :data="institutions" stripe highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column v-if="purpose == 'approval'" type="selection" width="55">
      </el-table-column>
      <el-table-column prop="username" label="机构名" width="200">
      </el-table-column>
      <el-table-column prop="location" label="所在城市" width="100">
      </el-table-column>
      <el-table-column prop="description" label="机构介绍" width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
      </el-table-column>
    </el-table>
    <div v-if="purpose == 'approval'" style="margin-top: 20px">
      <el-button @click="approve">批量批准</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['institutions','purpose'],
  data() {
    return {
      ids: []
    }
  },
  methods: {
    approve() {
      this.axios
        .put('/institutions/approval', this.ids)
        .then(response => {
          this.$message({
            message: '批量批准成功',
            type: 'success'
          })
          this.$emit('approve-success')
        })
        .catch(error => {
          this.$message.error('批量批准失败')
          throw error
        })
    },
    handleSelectionChange(val) {
      this.ids = val.map(function(institution) {
        return institution.id
      })
      console.log('ids', this.ids)
    }
  }
}
</script>

<style>

</style>
