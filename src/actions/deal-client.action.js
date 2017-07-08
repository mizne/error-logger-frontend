import { notification } from 'antd'

import { DealClientService } from '../http'

export const REQUEST_START = '[DealClient] RequestStart' 
export const LOAD_GRID_DATA_SUCCESS = '[DealClient] LoadGridDataSuccess'
export const LOAD_GRID_DATA_FAILED = '[DealClient] LoadGridDataFailed'
export const REMOVE_SUCCESS = '[DealClient] RemoveSuccess'
export const REMOVE_FAILED = '[DealClient] RemoveFailed'
export const SET_CURRENT_PAGE = '[DealClient] SetCurrentPage' 
export const LOAD_MODULE_FILTERS_SUCCESS = '[DealClient] LoadModuleFiltersSuccess'
export const LOAD_MODULE_FILTERS_FAILED = '[DealClient] LoadModuleFiltersFailed'

export const requestStart = () => ({
  type: REQUEST_START
})
export const loadGridDataSuccess = (items) => ({
  type: LOAD_GRID_DATA_SUCCESS,
  payload: items
})
export const loadGridDataFailed = (payload) => ({
  type: LOAD_GRID_DATA_FAILED,
  payload
})
export const removeSuccess = () => ({
  type: REMOVE_SUCCESS
})
export const removeFailed = () => ({
  type: REMOVE_FAILED
})
export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  payload: currentPage
})
export const loadModuleFiltersSuccess = (filters) => ({
  type: LOAD_MODULE_FILTERS_SUCCESS,
  payload: filters
})
export const loadModuleFiltersFailed = () => ({
  type: LOAD_MODULE_FILTERS_FAILED,
})

export const fetchAll = (condition, option, sortOpt) => dispatch => {
  dispatch(requestStart())
  dispatch(setCurrentPage(option.skip + 1))

  return DealClientService.fetchAll(condition, option, sortOpt)
  .then(data => {
    dispatch(loadGridDataSuccess(data))
    notification.success({
      message: '获取成功',
      description: `恭喜, 获取第 ${option.skip + 1} 页数据成功!`
    })
    return data
  })
  .catch(err => {
    dispatch(loadGridDataFailed({
      total: 0,
      items: []
    }))

    notification.error({
      message: '获取失败',
      description: `啊哦, 获取第 ${option.skip + 1} 页数据失败!`
    })
    return Promise.reject(err)
  })
}

export const fetchFilters = (fieldName) => dispatch => {
  dispatch(requestStart())

  return DealClientService.fetchFilters(fieldName)
  .then(data => {
    dispatch(loadModuleFiltersSuccess(data))
    return data
  })
  .catch(err => {
    dispatch(loadModuleFiltersFailed())
    return Promise.reject(err)
  })
}

export const remove = (condition) => dispatch => {
  dispatch(requestStart())

  return DealClientService.remove(condition)
  .then(_ => {
    dispatch(removeSuccess())

    notification.success({
      message: '删除成功',
      description: '恭喜, 删除数据成功!'
    })

    return _
  })
  .catch(err => {
    dispatch(removeFailed())

    notification.error({
      message: '删除失败',
      description: '啊哦, 删除数据失败!'
    })

    return Promise.reject(err)
  })
}