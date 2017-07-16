import { notification } from 'antd'

import { EShopClientService } from '../http'

export const REQUEST_START = '[EShopClient] RequestStart'
export const LOAD_GRID_DATA_SUCCESS = '[EShopClient] LoadGridDataSuccess'
export const LOAD_GRID_DATA_FAILED = '[EShopClient] LoadGridDataFailed'
export const REMOVE_SUCCESS = '[EShopClient] RemoveSuccess'
export const REMOVE_FAILED = '[EShopClient] RemoveFailed'
export const SET_CURRENT_PAGE = '[EShopClient] SetCurrentPage'
export const LOAD_MODULE_FILTERS_SUCCESS =
  '[EShopClient] LoadModuleFiltersSuccess'
export const LOAD_MODULE_FILTERS_FAILED =
  '[EShopClient] LoadModuleFiltersFailed'

export const requestStart = () => ({
  type: REQUEST_START
})
export const loadGridDataSuccess = items => ({
  type: LOAD_GRID_DATA_SUCCESS,
  payload: items
})
export const loadGridDataFailed = payload => ({
  type: LOAD_GRID_DATA_FAILED,
  payload
})
export const removeSuccess = () => ({
  type: REMOVE_SUCCESS
})
export const removeFailed = () => ({
  type: REMOVE_FAILED
})
export const setCurrentPage = currentPage => ({
  type: SET_CURRENT_PAGE,
  payload: currentPage
})
export const loadModuleFiltersSuccess = filters => ({
  type: LOAD_MODULE_FILTERS_SUCCESS,
  payload: filters
})
export const loadModuleFiltersFailed = () => ({
  type: LOAD_MODULE_FILTERS_FAILED
})

export const fetchAll = (condition, { skip, limit }) => dispatch => {
  dispatch(requestStart())
  dispatch(setCurrentPage(skip + 1))

  return EShopClientService.fetchAll(condition, { skip: skip * limit, limit })
    .then(data => {
      dispatch(loadGridDataSuccess(data))
      notification.success({
        message: '获取成功',
        description: `恭喜, 获取 EShopClient 第 ${skip + 1} 页数据成功!`
      })
      return data
    })
    .catch(err => {
      dispatch(
        loadGridDataFailed({
          total: 0,
          items: []
        })
      )

      notification.error({
        message: '获取失败',
        description: `啊哦, 获取 EShopClient 第 ${skip + 1} 页数据失败!`
      })
      return Promise.reject(err)
    })
}

export const fetchFilters = fieldName => dispatch => {
  dispatch(requestStart())

  return EShopClientService.fetchFilters(fieldName)
    .then(data => {
      dispatch(loadModuleFiltersSuccess(data))
      return data
    })
    .catch(err => {
      dispatch(loadModuleFiltersFailed())
      return Promise.reject(err)
    })
}

export const remove = condition => dispatch => {
  dispatch(requestStart())

  return EShopClientService.remove(condition)
    .then(_ => {
      dispatch(removeSuccess())

      notification.success({
        message: '删除成功',
        description: '恭喜, 删除 EShopClient 数据成功!'
      })

      return _
    })
    .catch(err => {
      dispatch(removeFailed())

      notification.error({
        message: '删除失败',
        description: '啊哦, 删除 EShopClient 数据失败!'
      })

      return Promise.reject(err)
    })
}
