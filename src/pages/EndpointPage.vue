<template>
  <div>
    <!-- 主要内容 -->
    <div class="index-wrap">
      <keep-alive>
        <router-view>
        </router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
<style scoped>
.index-wrap {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
</style>