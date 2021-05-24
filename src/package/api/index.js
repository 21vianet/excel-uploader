import Axios from 'axios'

const request = Axios.create({
  baseURL: '',
  timeout: 60000,
  params: {timeStamp: Date.now()}
})

request.defaults.headers['Content-Type'] = 'application/json'

export function GetTemplate (url, body) {
  return request({
    url: url,
    method: 'post',
    data: body,
    responseType: 'blob'
  })
}

export function ExportErrorMessage (url, body) {
  return request({
    url: url,
    method: 'post',
    data: body,
    responseType: 'blob'
  })
}

export function UploadFile (url, formData) {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: url,
    method: 'post',
    data: formData
  })
}

export function GetUploadProgress (url) {
  return request({
    url: url,
    method: 'get'
  })
}
