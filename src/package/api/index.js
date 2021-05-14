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
    responseType: 'arraybuffer',
    onDownloadProgress: onDownloadProgress
  })
}
