<template>
  <el-card :body-style="{ padding: '0px' }">
    <img :src="course.imageUrl" class="image">
    <div style="padding: 14px;">
      <span>{{course.name}}</span>
      <el-tag style="margin-left: 12px;">{{course.type}}</el-tag>
      <br>
      <time class="time">开课时间: {{course.startTime}}</time>
      <div class="info">
        <div class="description">{{course.description}}</div>
        <div class="class-container">
          <class @classChosen="onClassChosen" v-for="classDO in course.classes"  :key="classDO.id" :classDO="classDO"></class>
        </div>
      </div>  
    </div>
  </el-card>
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
      this.$emit('classChosen', classDO)
    }
  },
  components:{
    Class
  }
}
</script>

<style>
.description {
  color: #a29a9a;
}
.image {
  width: 100%;
  display: block;
}
.info > * {
  margin: 8px 0 -8px 0;
  padding: 10px;
  border-top: 1px solid #e1e1e1;
}
.class-container {
  display: flex;
  flex-flow: row wrap;
  padding: 0;
}
.class-container > * {
  width: 50%;
}
.class-container > *:nth-child(odd) {
  border-right: 1px solid #e1e1e1;
}
</style>
