<template>
  <div>
    <el-steps :active="currentStep" align-center>
      <el-step title="上传文件" description="根据模版修改后上传"></el-step>
      <el-step title="执行导入" description="数据倒入至服务器"></el-step>
      <el-step title="导入完成" description="完成数据批量导入"></el-step>
    </el-steps>
    <step1 @next="next"
           @uploadFile="setUploadFile"
           v-if="currentStep === 1"
           :max-upload-file-size="config.MaxUploadFileSize"
           :download-template-url="config.DownloadTemplateUrl"
           :download-template-request-body="config.DownloadTemplateRequestBody">
    </step1>
    <step2 v-if="currentStep === 2"
           @uploadResult="uploadResult"
           :upload-process-percent-url="config.UploadProcessPercentUrl"
           :upload-file="currentUploadFile"
           :upload-file-url="config.UploadFileUrl"></step2>
    <step3 v-if="currentStep === 3"
           :download-error-message-url="config.DownloadErrorMessageUrl"
           :upload-result="result"
           @backToMenu="backToMenu"
           @reUpload="reUpload">
    </step3>
  </div>
</template>

<script>
  import Step1 from '../step1/step1'
  import Step2 from '../step2/step2'
  import Step3 from '../step3/step3'

  export default {
    name: 'Excel-Uploader',
    components: {Step3, Step2, Step1},
    props: {
      config: {
        type: Object,
        default: function () {
          return {
            DownloadTemplateUrl: '',
            DownloadTemplateRequestBody: {},
            DownloadErrorMessageUrl: '',
            MaxUploadFileSize: 5,
            UploadProcessPercentUrl: '',
            UploadFileUrl: ''
          }
        }
      }
    },
    data () {
      return {
        currentStep: 1,
        result: null,
        currentUploadFile: null
      }
    },
    methods: {
      next () {
        this.currentStep++
      },
      reUpload () {
        this.currentStep = 1
      },
      setUploadFile (file) {
        this.currentUploadFile = file
      },
      uploadResult (result) {
        this.result = result
        this.next()
      },
      backToMenu () {
        this.$emit('backToMenu')
      }
    }
  }
</script>

<style scoped>

</style>
