<template>
  <div class="step2-container">
    <span class="percentage">{{curPercentage}}%({{successCount}}/{{allCount}})</span>
    <el-progress style="margin-top: 30px"
                 :show-text="false"
                 :stroke-width="26"
                 :percentage="curPercentage">
    </el-progress>
    <span class="tip">正在导入数据，请勿关闭或刷新页面</span>
  </div>
</template>

<script>
  import {UploadFile, GetUploadProgress} from '../api'

  export default {
    name: 'step2',
    props: {
      uploadFile: {
        type: Object,
        default: null
      },
      UploadFileUrl: {
        type: String,
        default: ''
      },
      UploadProcessPercentUrl: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        curPercentage: 0,
        successCount: 0,
        allCount: 0,
        needToUpdateProgress: false
      }
    },
    methods: {
      updateProgressMethod () {
        if (this.UploadProcessPercentUrl) {
          GetUploadProgress(this.UploadProcessPercentUrl).then((res) => {
            if (this.needToUpdateProgress) {
              this.successCount = res.data.number
              this.allCount = res.data.allNumber
              this.curPercentage = Math.round(this.successCount * 10000 / this.allCount) / 100 || 0
              setTimeout(this.updateProgressMethod, 300)
            }
          })
        }
      }
    },
    mounted () {
      this.curPercentage = 0
      this.successCount = 0
      this.allCount = 0
      this.needToUpdateProgress = false
      if (!this.uploadFile) {
        this.$emit('uploadResult', {
          success: false,
          message: '上传文件丢失'
        })
        this.$emit('next')
      } else if (this.UploadFileUrl === '') {
        this.$emit('uploadResult', {
          success: false,
          message: '请提供有效的上传文件API'
        })
        this.$emit('next')
      } else {
        const formData = new FormData()
        formData.append('file', this.uploadFile.raw, this.uploadFile.name)
        this.updateProgressMethod()
        UploadFile(this.UploadFileUrl, formData).then((res) => {
          if (Reflect.has(res.data, 'success') && res.data.success === false) {
            this.$emit('uploadResult', {
              success: false,
              message: res.data.message
            })
          } else {
            this.$emit('uploadResult', {
              success: true,
              successCount: res.data.data.successSums,
              failedCount: res.data.data.failueSums,
              message: res.data.data.content,
              params: res.data.data.param
            })
            this.$message.success('上传文件完成')
          }
          this.$emit('next')
        }).catch((err) => {
          this.$emit('uploadResult', {
            success: false,
            message: err.message
          })
          this.$emit('next')
        }).finally(() => {
          this.needToUpdateProgress = false
        })
        this.needToUpdateProgress = true
      }
    }
  }
</script>

<style scoped>
  div.step2-container {
    margin-top: 20px;
    margin-bottom: 50px;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  div.step2-container span.percentage {
    color: #2387c0;
    font-size: large;
    text-align: center;
  }

  div.step2-container span.tip {
    color: gray;
    font-size: small;
    text-align: center;
    margin-top: 30px;
    display: block;
  }
</style>
