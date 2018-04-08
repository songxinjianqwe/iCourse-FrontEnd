<template>
  <div>
    <el-table :data="settlements" stripe highlight-current-row>
      <el-table-column prop="id" label="流水号" width="100">
      </el-table-column>
      <el-table-column prop="createTime" label="结算时间" width="200">
      </el-table-column>
      <el-table-column v-if="_isManager()" prop="institution.username" label="机构" width="100">
      </el-table-column>
      <el-table-column prop="percent" label="分成" width="100">
      </el-table-column>
      <el-table-column prop="order.price" label="订单金额" width="100">
      </el-table-column>
      <el-table-column prop="order.id" label="相关订单号" width="100">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ['settlements'],
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
