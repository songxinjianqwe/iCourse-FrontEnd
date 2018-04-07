<template>
  <div class="classDO">
    <h3>{{classDO.name}}</h3>
    <h3>{{classDO.price}}元</h3>
    <h3>限额:{{classDO.threshold}}</h3>
    <h3>已选:{{classDO.currentCount}}</h3>
    <el-button :disabled="classDO.currentCount == classDO.threshold" @click="choose">选课</el-button>
  </div>
</template>

<script>
export default {
  props: ['classDO'],
  data() {
    return {
     
    }
  },
  methods: {
    choose() {
      console.log('Class#classChosen')
      this.$emit('classChosen',this.classDO)
    }
  }
}
</script>

<style>
.classDO {
  border-style: solid;
  border-width: 1px;
}
</style>
