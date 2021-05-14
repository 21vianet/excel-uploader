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
          DownloadRequestBody: {
            't': {
              'unifiedDatacenterCode': 'S001'
            }
          },
          UploadFileUrl: '/dcomsp-installation/dcOperateDevice/importForOperateConfigurationDevice'
        }
      },
      backToMenu () {
        console.log('backToMenu')
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
