<template>
  <div id="app">
    <ExcelUploader :config="getConfig()" @backToMenu="backToMenu"></ExcelUploader>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld'
  import ExcelUploader from './package'
  // import ExcelUploader from '@21vianet/excel-uploader'

  export default {
    name: 'App',
    components: {
      HelloWorld,
      ExcelUploader
    },
    methods: {
      getConfig () {
        return {
          MaxUploadFileSize: 3,
          DownloadTemplateName: 'template.xls',
          DownLoadTemplateUrl: '/dcomsp-installation/dcOperateDevice/exportForEquipmentTemplate',
          DownloadTemplateRequestBody: {
            't': {
              'unifiedDatacenterCode': 'S001'
            }
          },
          DownloadErrorMessageUrl: '',
          DownloadErrorMessageRequestBody: {},
          UploadFileUrl: '/dcomsp-installation/dcOperateDevice/importForOperateConfigurationDevice'
        }
      },
      backToMenu () {
        // insert your code to response the back event.
      }
    }
  }
</script>

<style>

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
