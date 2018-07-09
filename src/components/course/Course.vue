<template>
  <el-card :body-style="{ padding: '0px' }" class="card">
    <img :src="course.imageUrl" class="image">
    <div class="content">
      <div class="first-line">
        <span class="title">{{course.name}}</span>
        <el-tag style="margin-left: 12px;">{{course.type}}</el-tag>
      </div>
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
.card {
  border-radius: 10px;
}
.content {
  padding: 14px;
}
.title {
  font-style: italic;
  font-weight: bolder;
}
.first-line {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}
.description {
  color: #a29a9a;
  height: 200px;
  overflow: auto;
}
.image {
  width: 100%;
  display: block;
}
.info {
  display: flex;
  flex-flow: column nowrap;
}
.info > * {
  margin: 8px 0 -8px 0;
  padding: 10px;
  border-top: 1px solid #e1e1e1;
}
.class-container {
  flex-grow: 2;
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
