<template>
  <div>
    <h3>
      {{course.name}} 
      <el-tag>{{course.type}}</el-tag> 
      开课时间: {{course.startTime}}
    </h3>
    <div>{{course.description}}</div>
    <class v-on:classChosen="onClassChosen" v-for="classDO in course.classes"  :key="classDO.id" :classDO="classDO"></class>
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
