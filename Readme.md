# Excel-Uploader

### Overview
 The Excel-Uploader is a component of VUE which provides such as
 download template excel file and upload excel file with backend, etc functions.
 It can helps developer coding quickly.
 
### Usage

 1,Installation
 
` npm install @21vianet/excel-uploader --save `

 2,Add the following to your main.js of your project and 
 make sure that it's position after the element-ui reference's.
 
 `import 'element-ui/lib/theme-chalk/index.css'`

 `import './package/css/uploader-custom.css'`
 
 3,Insert the Uploader HTML tag and its reference code into your VUE component.
 
 `import ExcelUploader from '@21vianet/excel-uploader'`
 
 `components: {
        ...
        ExcelUploader
        ...
 }`
 
 `<ExcelUploader :config="getConfig()" @backToMenu="backToMenu"></ExcelUploader>`
 
 In here, you can adjust its size via style attribute:
 
 `style="width: 560px;height: 560px;margin: 30px;"`
 
 > Node: Don't set the smaller number than 560px with its width and height. Which it can make sure that the UI looks like normally.
 
 4,Give a object for config ExcelUploader component. All the config params as below:
 
 ``` 
 {                
   DownLoadTemplateUrl: '',
   DownloadTemplateRequestBody: {},
   DownloadErrorMessageUrl: '',
   DownloadErrorMessageRequestBody: {},
   DownloadTemplateName: 'template.xlsx',
   MaxUploadFileSize: 5,
   UploadFileUrl: ''
 }
 
 ```
 
 5,You can subscript the @backToMenu event that be triggered when user click the 'Back' button in step 3. 
 
### Repository

  `https://github.com/21vianet/excel-uploader.git`

### Republic

If you are a developer who from @21vianet group, you can download the repository and republic the ExcelUploader.

1,git clone Repository

2,run `npm install`

3,change code in package folder.

4,run ` npm publish --access public ` under the package folder.

