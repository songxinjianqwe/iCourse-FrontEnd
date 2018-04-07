<template>
  <div>
    <h1>学员管理</h1>
    <el-button type="primary" @click="orderDialogVisible = true">添加线下学员</el-button>
    <el-dialog title="添加线下学员订单" :visible.sync="orderDialogVisible" width="30%" :before-close="handleClose">
      <order-place-form ref="orderPlaceForm"></order-place-form>
    </el-dialog>
  </div>
</template>

<script>
import OrderPlaceForm from '@/components/order/OrderPlaceForm'
export default {
  data() {
    return {
      orderDialogVisible: false
    }
  },
  methods: {
    handleClose() {
      this.$refs.orderPlaceForm.$emit('clearOrder')
      this.orderDialogVisible = false
    }
  },
  components: {
    OrderPlaceForm
  }
}
</script>

<style>

</style>
