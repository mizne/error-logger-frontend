import axios from 'axios'

const http = axios.create({
  baseURL: 'http://logger.xiaovbao.cn/api/v1',
  timeout: 10000,
})

//https://github.com/mzabriskie/axios#interceptor
http.interceptors.request.use(
  function (config) {
    return config
  }, function (error) {
    console.error(error)
    return Promise.reject(error)
  })
http.interceptors.response.use(
  function (resp) {
    if (resp.data.resCode === 0) {
      return resp.data.result
    } else {
      return Promise.reject(new Error(resp.data.resMsg))
    }
  }, function (error) {
    return Promise.reject(new Error(error))
  })

export {
  http,
}