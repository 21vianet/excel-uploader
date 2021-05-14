<template>
  <div class="step2-container">
    <span class="percentage">{{curPercentage}}%</span>
    <el-progress style="margin-top: 30px"
                 :show-text="false"
                 :stroke-width="26"
                 :percentage="curPercentage">
    </el-progress>
    <span class="tip" @click="next">
      正在导入数据，请勿关闭或刷新页面
    </span>
  </div>
</template>

<script>
  export default {
    name: 'step2',
    props: {
      uploadFile: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        curPercentage: 30
      }
    },
    methods: {
      next () {
        this.$emit('next')
      }
    },
    mounted () {
      if (!this.uploadFile) {
        this.$message.error('上传文件丢失')
      }
      this.$message.success(this.uploadFile.name)
    }
  }
</script>

<style scoped>
  div.step2-container {
    margin-top: 165px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  div.step2-container span.percentage {
    color: #2387c0;
    font-size: large;
  }

  div.step2-container span.tip {
    color: gray;
    font-size: small;
    margin-top: 30px;
    display: block;
  }
</style>
