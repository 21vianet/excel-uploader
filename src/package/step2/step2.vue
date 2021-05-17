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
  import {UploadFile} from '../api'

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
      }
    },
    data () {
      return {
        curPercentage: 0
      }
    },
    methods: {
      next () {
        this.$emit('next')
      }
    },
    onUploadFileProgress (progress) {
      this.$nextTick(() => {
        // this.curPercentage = Math.round(progress.total)
        console.log(progress)
      })
    },
    mounted () {
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
        UploadFile(this.UploadFileUrl, formData, this.onUploadFileProgress).then((res) => {
          if (Reflect.has(res.data, 'success') && res.data.success === false) {
            this.$emit('uploadResult', {
              success: false,
              message: res.data.message
            })
          } else {
            this.$emit('uploadResult', {
              success: true,
              successCount: 100,
              failedCount: 20
            })
            this.$message.success('上传文件完成')
          }
          this.$emit('next')
        }).catch(() => {
          this.$emit('uploadResult', {
            success: false,
            message: '网络连接错误'
          })
          this.$emit('next')
        })
      }
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
