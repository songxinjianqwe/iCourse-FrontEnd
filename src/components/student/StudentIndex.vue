<template>
    <div>
        <div class="left-block">
            <h2>{{this._username()}}</h2>
            <el-menu :default-active="$route.path" :router="true" background-color="#F3F3F3">
                <el-menu-item :index="`/endpoint/students/${this._id()}/info`">
                    <i class="el-icon-document"></i>
                    <span slot="title">个人信息</span>
                </el-menu-item>
                <el-menu-item :index="`/endpoint/students/${this._id()}/course_market`">
                    <i class="el-icon-menu"></i>
                    <span slot="title">课程广场</span>
                </el-menu-item>
                <el-menu-item :index="`/endpoint/students/${this._id()}/orders`">
                    <i class="el-icon-tickets"></i>
                    <span slot="title">订单管理</span>
                </el-menu-item>
                <el-menu-item :index="`/endpoint/students/${this._id()}/courses`">
                    <i class="el-icon-goods"></i>
                    <span slot="title">我的课程</span>
                </el-menu-item>
                <el-menu-item :index="`/endpoint/students/${this._id()}/account`">
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
.left-block {
  float: left;
  width: 150px;
  text-align: left;
}
.right-block {
  float: left;
  margin-left: 50px;
}
</style>
