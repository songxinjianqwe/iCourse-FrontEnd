<template>
    <div class="container">
        <div class="left-block">
            <h2>{{this._username()}}</h2>
            <el-menu :default-active="$route.path" :router="true" background-color="#F3F3F3">
                <el-menu-item :index="`/endpoint/managers/${this._id()}/approval`">
                    <i class="el-icon-document"></i>
                    <span slot="title">机构审批</span>
                </el-menu-item>
                <el-menu-item :index="`/endpoint/managers/${this._id()}/orders`">
                    <i class="el-icon-tickets"></i>
                    <span slot="title">订单管理</span>
                </el-menu-item>
                 <el-menu-item :index="`/endpoint/managers/${this._id()}/settlement`">
                    <i class="el-icon-menu"></i>
                    <span slot="title">结算管理</span>
                </el-menu-item>
                <el-menu-item :index="`/endpoint/managers/${this._id()}/institutions`">
                    <i class="el-icon-goods"></i>
                    <span slot="title">机构概览</span>
                </el-menu-item>
                <el-menu-item :index="`/endpoint/managers/${this._id()}/students`">
                    <i class="el-icon-picture"></i>
                    <span slot="title">学员概览</span>
                </el-menu-item>
                <el-menu-item :index="`/endpoint/managers/${this._id()}/account`">
                    <i class="el-icon-setting"></i>
                    <span slot="title">支付管理</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="right-block">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style>
.container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
}
.left-block {
  width: 150px;
  text-align: left;
}
.left-block > h2 {
  text-align: center;
}
.right-block {
  padding: 20px;
  border-radius: 10px;
  margin-left: 50px;
  background: white;
  width: 100%;
}
</style>
