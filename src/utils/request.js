import axios from 'axios'
import {Message} from 'element-ui'
import { getToken, getTs, removeToken, removeTs } from './auth'
import { getExportFilename } from './index'

const request = axios.create()

let tag = false
request.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['accessToken'] = getToken()
    }
    config.headers['ts'] = getTs()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    const res = response.data

    if (response?.config?.responseType?.toLocaleLowerCase() === 'arraybuffer') {
      const disposition = response.headers['content-disposition']
      const filename = getExportFilename(disposition)

      return {
        data: res,
        filename
      }
    }

    if (response.status === 204 && !res) {
      Message({
        message: '删除成功!',
        type: 'success',
        duration: 5 * 1000
      })
      return
    }

    if (res.code !== 20000 && res.status !== 200 && !(res.code + '').startsWith('20')) {
      Message({
        message: res.message || '服务器开小差啦',
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    const res = error.response || {}
    const isLogin = location.href.match('/login')
    // token 超时的错误码40102，没有权限，也会返回401status
    if (res.status && res.status === 401 && !isLogin && res.data.code === 40102) {
      if (tag) return

      tag = true
      removeToken()
      removeTs()
      if(request.exit){
        request.exit()
      }else{
        location.reload()
      }
    } else {
      Message({
        message: error.response?.data?.message || error.message || '服务器开小差啦',
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default request

let cache = {}

/**
 * 缓存请求的数据
 * @param {} config
 */
export function cacheRequest(config) {
  // 只缓存get请求
  if (config.method.toLowerCase() !== 'get') {
    return request(config)
  }
  // 缓存key
  const cacheKey = config.url + JSON.stringify(config.data || config.params || {})
  if (cache[cacheKey]) {
    return new Promise((reslove) => { reslove(Object.assign({}, cache[cacheKey])) })
  } else {
    return request(config).then(res => {
      cache[cacheKey] = res
      return res
    })
  }
}

export const removeCacheData = (cacheKey) => {
  if (cacheKey) {
    delete cache[cacheKey]
  } else {
    cache = {}
  }
}
