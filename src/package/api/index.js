import Axios from 'axios'

const request = Axios.create({
  baseURL: '',
  timeout: 30000
})

request.defaults.headers['Content-Type'] = 'application/json'

export function GetTemplate (url, body, onDownloadProgress) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: body,
    responseType: 'blob',
    onDownloadProgress: onDownloadProgress
  })
}

export function ExportErrorMessage (url, body, onDownloadProgress) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: body,
    responseType: 'blob',
    onDownloadProgress: onDownloadProgress
  })
}

export function UploadFile (url, formData, onUploadProgress) {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: url,
    method: 'post',
    data: formData,
    onUploadProgress: onUploadProgress
  })
}
