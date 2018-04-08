<template>
  <div>
    <el-table :data="students" stripe highlight-current-row>
      <el-table-column prop="username" label="用户名" width="100">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="100">
      </el-table-column>
      <el-table-column prop="regTime" label="注册时间" width="200">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="200">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
      </el-table-column>
      <el-table-column prop="consumptions" label="消费金额" width="100">
      </el-table-column>
      <el-table-column prop="vipLevel" label="会员等级" width="100">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ['students'],
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
