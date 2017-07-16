import { http } from './interceptors'
import { queryFrom } from '../utils/index'

const fetchAll = (condition, option) => {
  const conditionStr = queryFrom(condition)
  const optionStr = queryFrom(option)

  const query = `${conditionStr}${conditionStr ? '&' + optionStr : optionStr}`

  return http.get(`/mobile-admin/error-message?${query}`)
  .catch(err => {
    console.error(err)
    return Promise.reject(err)
  })
}

const fetchFilters = (fieldName) => {
  return http.get(`/${fieldName}?appName=mobileAdmin`)
  .then(data => {
    data.sort((a, b) => a.name.localeCompare(b.name))
    return data
  })
  .catch(err => {
    console.error(err)
    return Promise.reject(err)
  })
}

const remove = (condition) => {
  const query = Object.keys(condition)
  .map(key => condition[key].map(e => `${key}=${e}`).join('&'))
  .join('&')

  return http.delete(`/mobile-admin/error-message?${query}`)
  .catch(err => {
    console.error(err)
    return Promise.reject(err)
  })
}

export {
  fetchAll,
  fetchFilters,
  remove
}