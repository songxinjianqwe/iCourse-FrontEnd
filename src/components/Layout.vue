<template>
  <div>
    <!-- Header -->
    <div class="app-header" @keyup.enter="search">
      <div class="app-header-inner">
        <!-- LOGO -->
        <router-link to="/" class="logo">
          <h1>iCourse</h1>
        </router-link>
        <!-- 导航栏 -->
        <div class="header-nav">
          <!-- 导航条 -->
          <el-menu class="nav-menu" :default-active="$route.path" :router="true" mode="horizontal" background-color="#24292c" text-color="#999" active-text-color="#ffffff">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item v-if="_isStudent()" :index="`/endpoint/students/${this._id()}`">学生入口</el-menu-item>
            <el-menu-item v-if="_isInstitution()" :index="`/endpoint/institutions/${this._id()}`">机构入口</el-menu-item>
            <el-menu-item v-if="_isManager()" :index="`/endpoint/managers/${this._id()}`">经理入口</el-menu-item>
            <el-menu-item v-if="_isLogin()" index="" @click="logout">退出登录</el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
    <!-- Content -->
    <div class="app-content">
      <!-- 缓存 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logoutDialogVisible: false,
      keyword: '',
      searchLoading: false
    }
  },
  methods: {
    /**当退出登录时，会提示信息，并删除本地的localStorage，本地的内存数据，以及服务器的token */
    logout() {
      if (!this._isLogin()) {
        return
      }
      const h = this.$createElement
      this.$notify({
        title: '退出成功',
        message: h(
          'i',
          {
            style: 'color: teal'
          },
          '再见，' + this._username()
        )
      })
      localStorage.clear('loginResult')
      console.log('删除服务器的token')
      this.axios
        .delete('/tokens')
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          throw error
        })
      //回到首页
      setTimeout(() => {
        this.$router.push('/')
        window.location.reload()
      }, 2000)
    }
  }
}
</script>

<style>
body {
  font-size: 14px;
  min-height: 100%;
  margin: 0;
  padding: 0;
  background-color: #ededef;
}

/* header */

.app-header {
  height: 82px;
  width: 100%;
  background-color: #24292c;
}
.app-header-inner {
  width: 1200px;
  margin: 0 auto;
}
.app-header-inner h1 {
  color: #ffffff;
}
.logo {
  position: relative;
  float: left;
  width: 220px;
  height: 44px;
}
.header-nav {
  float: left;
  margin: 35px 0 0;
}
.nav-menu {
  float: left;
  position: relative;
  z-index: 65;
  width: 670px;
  height: 48px;
  padding: 22px 5px 0 0;
  margin: -36px 0 0;
  text-align: left;
  border: 0px;
}
.nav-search {
  float: right;
  position: relative;
  top: -1px;
  left: 0px;
  width: 300px;
  height: 26px;
  margin: -36px 0 0;
  padding: 2px 10px 2px 32px;
  background-position: 0 -41px;
  z-index: 65;
}
.select {
  width: 80px;
}
/* 不可删除 */
a {
  color: inherit;
  text-decoration: none;
}
</style>
