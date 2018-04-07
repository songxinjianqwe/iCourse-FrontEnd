<template>
  <div>
    <h1>支付账号绑定</h1>
    <div v-show="!isBound">
      <el-form v-loading="loading" :model="account" ref="account" label-width="100px">
        <el-form-item label="用户名" prop="alipayUsername">
          <el-input v-model="account.alipayUsername" size="tiny"></el-input>
        </el-form-item>
        <el-form-item label="支付密码" prop="paymentPassword">
          <el-input type="password" v-model="account.paymentPassword" auto-complete="off" size="tiny"></el-input>
        </el-form-item>
        <el-form-item class="item">
          <el-button type="primary" :disabled="account.alipayUsername == '' || account.paymentPassword == ''" @click="bind">绑定</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-show="isBound">
      您已经绑定了支付账号
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isBound: false,
      loading: false,
      account: {
        alipayUsername: '',
        paymentPassword: ''
      }
    }
  },
  methods: {
    bind() {
      this.loading = true
      this.axios
        .post('/account/bind', this.account)
        .then(response => {
          this.loading = false
          this.isBound = true
          this.$message({
            message: '恭喜你，支付账号绑定成功',
            type: 'success'
          })
          
        })
        .catch(error => {
          this.loading = false
          this.$message.error('绑定失败')
        })
    },
    fetchIsBound() {
      this.axios
        .get('/account/bind')
        .then(response => {
          this.isBound = response.data
        })
        .catch(error => {
          throw error
        })
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      console.log('beforeRouteEnter:跳转至', to.path)
      vm.fetchIsBound()
    })
  }
}
</script>

<style>

</style>
