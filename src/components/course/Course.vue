<template>
  <div>
    <div>
      <h3 style="display:inline-block">{{course.name}}</h3>
      <el-tag>{{course.type}}</el-tag>
      <time class="time">开课时间: {{course.startTime}}</time>
    </div>
    <img height="200" width="400" :src="course.imageUrl"/>
    <div>{{course.description}}</div>
    <class @classChosen="onClassChosen" v-for="classDO in course.classes"  :key="classDO.id" :classDO="classDO"></class>
  </div>
</template>

<script>
import Class from '@/components/course/Class'
export default {
  props: ['course'],
  data() {
    return {
    }
  },
  methods:{
    onClassChosen(classDO){
      console.log('Course#classChosen')
      this.$emit('classChosen',classDO)
    }
  },
  components:{
    Class
  }
}
</script>

<style>
.course {
  width: 600px;
  overflow: hidden;
}
</style>
