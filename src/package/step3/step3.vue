<template>
  <div class="step3-container">
    <img v-if="completeUpload" alt="" src="../images/complete.png">
    <el-icon v-else class="el-icon-error error-icon"></el-icon>
    <span class="title">数据导入完成</span>
    <span v-if="completeUpload" class="tip">导入结果：</span>
    <div v-if="completeUpload" class="import-result-container">
      <span class="count">数据量条数：{{allCount}}</span>
      <div class="import-result-info">
        <div style="display: flex;justify-content: center">
          <span class="result">成功导入数据：<span style="color: green"><b>{{successCount}}</b>，</span></span>
          <span class="result">异常导入数据：<span style="color: red"><b>{{failedCount}}</b></span>
        </span>
        </div>
        <div class="error-title-container">
          <span class="error-title">异常情况详情</span>
          <el-button @click="exportErrorMessage"
                     class="export el-button--warning"
                     size="small"
                     icon="el-icon-top-right"
                     :loading="downloading"
                     :disabled="failedCount === 0 || downloading">
            导出异常
          </el-button>
        </div>
        <div class="error-message-container">
          <span class="error-message">{{errorMessage}}</span>
        </div>
      </div>
    </div>
    <el-alert v-else center
              effect="dark"
              type="error"
              :closable="false"
              :title="errorResultMessage"
              style="margin: 50px;width: auto">
    </el-alert>
    <div style="margin-top: 30px;">
      <el-button class="el-button--info" @click="reUpload">重新上传</el-button>
      <el-button class="el-button--primary" @click="backToMenu">返回</el-button>
    </div>
  </div>
</template>

<script>
  import {ExportErrorMessage} from '../api'

  export default {
    name: 'step3',
    computed: {
      allCount: function () {
        return this.successCount + this.failedCount
      }
    },
    data () {
      return {
        successCount: 0,
        failedCount: 0,
        completeUpload: true,
        errorMessage: '',
        errorResultMessage: '',
        downloadErrorParams: {},
        downloading: false
      }
    },
    props: {
      DownloadErrorMessageUrl: {
        type: String,
        default: ''
      },
      DownloadErrorMessageRequestBody: {
        type: Object,
        default: function () {
          return {}
        }
      },
      uploadResult: {
        type: Object,
        default: null
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
        if (!this.DownloadErrorMessageUrl) {
          this.completeUpload = true
          this.errorMessage = '请提供有效的导出异常信息的API'
        } else if (!this.DownloadErrorMessageRequestBody) {
          this.completeUpload = true
          this.errorMessage = '请提供有效的导出异常信息请求的Body'
        } else {
          this.downloading = true
          ExportErrorMessage(this.DownloadErrorMessageUrl, this.downloadErrorParams).then((res) => {
            const link = document.createElement('a')
            let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
            link.style.display = 'none'
            link.href = URL.createObjectURL(blob)
            link.download = decodeURIComponent(res.headers['content-disposition'].split('=')[1])
            document.body.appendChild(link)
            link.click()
            URL.revokeObjectURL(link.href)
            document.body.removeChild(link)
            this.$message.success('下载模版成功!')
          }).catch((err) => {
            this.errorMessage = err.message
            this.$message.error('网络连接错误')
          }).finally(() => {
            this.downloading = false
          })
        }
      }
    },
    mounted () {
      if (!this.uploadResult) {
        this.$message.error('结果数据丢失！')
        this.completeUpload = false
        this.errorResultMessage = '结果数据丢失！'
      } else if (this.uploadResult.success) {
        this.completeUpload = true
        this.successCount = this.uploadResult.successCount
        this.failedCount = this.uploadResult.failedCount
        this.downloadErrorParams = this.uploadResult.params
        this.errorMessage = this.uploadResult.message
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

  div.step3-container .error-icon {
    color: red;
    font-size: 70px;
    margin-top: 50px;
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
    text-align: left;
  }

</style>
