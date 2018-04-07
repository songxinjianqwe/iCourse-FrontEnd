<template>
  <div>
    <el-form v-loading="loading" :model="course" ref="course" label-width="100px">
      <el-form-item label="名称">
        <el-input v-model="course.name" size="tiny"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="course.type" placeholder="请选择课程类型">
          <el-option v-for="item in courseTypes" :key="item.value" :label="item.value" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="介绍">
        <el-input type="textarea" autosize placeholder="请输入课程介绍" v-model="course.description">
        </el-input>
      </el-form-item>
      <el-form-item label="开课时间">
        <el-date-picker :value-format="this.DEFAULT_DATE_TIME_FORMAT" v-model="course.startTime" type="datetime" placeholder="选择开课时间">
        </el-date-picker>
      </el-form-item>

      <div v-for="cls in course.classes" :key="cls.name">
        <div>新增班级</div>
        <el-form class="classNew" :model="cls" ref="cls" label-width="100px">
          <el-form-item label="名称">
            <el-input v-model="cls.name" size="tiny"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="cls.price" size="tiny"></el-input>
          </el-form-item>
          <el-form-item label="班级规模">
            <el-input v-model="cls.threshold" size="tiny"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-button size="tiny" @click="addClass">添加一个班级</el-button>
      <el-form-item>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="confirm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      course: {
        name: '',
        type: '',
        description: '',
        startTime: '',
        classes: [{}]
      },
      loading: false,
      courseTypes: [
        { value: '后端开发' },
        { value: '前端开发' },
        { value: '数据分析' },
        { value: '机器学习' }
      ]
    }
  },
  methods: {
    resetForm() {
      this.course = {
        name: '',
        type: '',
        description: '',
        startTime: '',
        classes: [{}]
      }
    },
    addClass() {
      this.course.classes.push({})
    },
    confirm() {
      console.log('待提交的表单',this.course)
      this.loading = true
      this.axios
        .post('/courses', this.course)
        .then(response => {
          this.loading = false
          this.$message({
            message: '新增课程成功',
            type: 'success'
          })
          this.$emit('course-new-success')
          this.resetForm()
        })
        .catch(error => {
          this.loading = false
          this.$message.error('新增课程失败')
        })
    }
  },
  created() {
    this.$nextTick(() => {
      this.$on('clearCourse', this.resetForm)
    })
  }
}
</script>

<style>
.classNew {
  border-style: solid;
  border-width: 1px;
}
</style>
