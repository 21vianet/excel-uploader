<template>
  <div class="step3-container">
    <img alt="" src="../images/complete.png">
    <span class="title">数据导入完成</span>
    <span class="tip">导入结果：</span>
    <div class="import-result-container">
      <span class="count">数据量条数：{{count}}</span>
      <div class="import-result-info">
        <div style="display: flex;justify-content: center">
          <span class="result">成功导入数据：<span style="color: green"><b>{{successCount}}</b></span></span>
          <span class="result">异常导入数据：<span style="color: red"><b>{{failedCount}}</b></span>
        </span>
        </div>
        <div class="error-title-container">
          <span class="error-title">异常情况详情</span>
          <el-button @click="exportErrorMessage"
                     class="export el-button--warning"
                     size="small"
                     icon="el-icon-top-right">
            导出异常
          </el-button>
        </div>
        <div class="error-message-container">
          <span class="error-message">{{errorMessage}}</span>
        </div>
      </div>
    </div>
    <div style="margin-top: 30px;">
      <el-button class="el-button--info" @click="reUpload">重新上传</el-button>
      <el-button class="el-button--primary" @click="backToMenu">返回</el-button>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'step3',
    data () {
      return {
        count: 1,
        successCount: 1,
        failedCount: 2,
        errorMessage: '这里是异常情况说明'
      }
    },
    props: {
      downloadErrorMessage: {
        type: String,
        default: ''
      }
    },
    methods: {
      reUpload () {
        this.$emit('reUpload')
      },
      backToMenu () {
        this.$emit('backToMenu')
      },
      exportErrorMessage () {
        if (this.downloadErrorMessage === '') {

        }
      }
    }
  }
</script>

<style scoped>
  div.step3-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  div.step3-container span.title {
    margin-top: 20px;
    font-size: large;
  }

  div.step3-container span.tip {
    color: gray;
    margin-top: 20px;
    font-size: small;
  }

  div.step3-container img {
    margin-top: 50px;
    width: 70px;
    height: 70px;
  }

  div.import-result-container {
    margin-top: 10px;
    padding: 10px;
    width: 500px;
    height: 218px;
    border-radius: 20px;
    border: 1px dotted darkgreen;
    display: flex;
    flex-direction: column;
  }

  div.import-result-container span.count {
    color: gray;
    font-size: small;
    margin-right: auto;
    margin-left: 10px;
  }

  div.import-result-info {
    padding: 15px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  div.import-result-info span.result {
    font-size: large;
  }

  div.error-title-container {
    display: flex;
    align-items: center;
  }

  div.error-title-container span.error-title {
    text-align: left;
    font-size: small;
  }

  div.error-title-container .export {
    margin-left: auto;
  }

  div.error-message-container {
    background-color: #f2b6be;
    margin-top: 10px;
    border-radius: 10px;
    flex-basis: 100%;
    display: flex;
    padding: 5px;
  }

  div.error-message-container span.error-message {
    font-size: small;
  }

</style>
