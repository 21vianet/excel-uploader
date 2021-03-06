<template>
  <div class="step1-container">
    <div class="panel-container">
      <div class="img-container">
        <img alt="" src="../images/cloud-download.png">
      </div>
      <div class="info-container">
        <span class="title"><b>填写导入数据的信息</b></span>
        <span class="tip">
          请按照数据模板的格式准备导入数据，模板中的表头名称不可修改，颜色标注的为必须输入项，表头行不能删除。单次导入数据不得超过1000条。
        </span>
        <el-link type="primary" style="margin-top: 5px;"
                 :disabled="downloading"
                 v-loading="downloading"
                 @click="downloadTemplate">
          下载模版
        </el-link>
      </div>
    </div>
    <div class="panel-container">
      <div class="img-container">
        <img alt="" src="../images/cloud-upload.png">
      </div>
      <div class="info-container">
        <span class="title"><b>上传填好的数据信息</b></span>
        <span class="tip">
          文件后缀必须为.xls 或 .xlsx （即EXCEL格式），文件大小不得大于<b>{{MaxUploadFileSize}}</b>M。
        </span>
        <el-upload ref="upload"
                   class="upload-container"
                   action=""
                   accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                   :auto-upload="false"
                   :multiple="false"
                   :disabled="downloading"
                   :limit="1"
                   :on-change="onFileChange"
                   :on-remove="handleRemove"
                   :show-file-list="true"
                   :file-list="fileList">
          <el-link v-if="currentFile === null"
                   :disabled="downloading"
                   type="primary"
                   style="margin-top: 5px;">
            上传文件
          </el-link>
        </el-upload>
      </div>
    </div>
    <el-button class="el-button--primary"
               style="margin-top: 30px"
               size="small"
               @click="next"
               :disabled="currentFile === null || downloading">
      下一步
    </el-button>
  </div>
</template>

<script>
  import {GetTemplate} from '../api'

  export default {
    name: 'step1',
    data () {
      return {
        currentFile: null,
        downloading: false,
        fileList: []
      }
    },
    props: {
      MaxUploadFileSize: {
        type: Number,
        default: 10
      },
      DownloadTemplateUrl: {
        type: String,
        default: ''
      },
      DownloadTemplateRequestBody: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    methods: {
      onFileChange (file) {
        const isExcel = ['application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].indexOf(file.raw.type) > -1
        const isValidSize = file.size / 1024 / 1024 < this.MaxUploadFileSize
        if (!isExcel) {
          this.$message.error('上传文件只能Excel文件(.xls或.xlsx)')
          this.fileList = []
          return false
        }
        if (!isValidSize) {
          this.$message.error('上传文件大小不能超过 10MB!')
          this.fileList = []
          return false
        }
        this.currentFile = file
      },
      next () {
        this.$emit('uploadFile', this.currentFile)
        this.$emit('next')
      },
      handleRemove (file, fileList) {
        this.currentFile = null
      },
      downloadTemplate () {
        if (!this.DownloadTemplateUrl) {
          this.$message.warning('请提供有效的下载模版URL！')
        } else if (!this.DownloadTemplateRequestBody) {
          this.$message.warning('请提供有效的下载模版请求的Body！')
        } else {
          this.downloading = true
          GetTemplate(this.DownloadTemplateUrl, this.DownloadTemplateRequestBody).then((res) => {
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
          }).catch(() => {
            this.$message.error('网络连接错误')
          }).finally(() => {
            this.downloading = false
          })
        }
      }
    },
    mounted () {
      this.currentFile = null
    }
  }
</script>

<style scoped>
  .upload-container {
    display: flex;
  }

  div.step1-container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  div.panel-container {
    height: 120px;
    width: 450px;
    border: 1px solid #efefef;
    margin-top: 10px;
    display: flex;
  }

  div.img-container {
    background-color: #efefef;
    color: gray;
    min-width: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  div.img-container img {
    width: 50px;
  }

  div.info-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 5px;
  }

  div.info-container span.title {
    font-size: large
  }

  div.info-container span.tip {
    text-align: left;
    color: gray;
    font-size: small;
    margin-top: 5px;
  }
</style>
