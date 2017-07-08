import {
  REQUEST_START,
  LOAD_GRID_DATA_SUCCESS,
  LOAD_GRID_DATA_FAILED,
  REMOVE_SUCCESS,
  REMOVE_FAILED,
  SET_CURRENT_PAGE,
  LOAD_MODULE_FILTERS_SUCCESS,
  LOAD_MODULE_FILTERS_FAILED
} from '../actions/eshop-client.action'

const initialEShopClientState = {
  loading: false,
  items: [],
  moduleFilters: [],
  pagination: {
    current: 0,
    total: 0,
    pageSize: 10
  }
}

export const eshopClient = (state = initialEShopClientState, action) => {
  switch (action.type) {
    case REQUEST_START:
      return {
        ...state,
        loading: true
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          current: action.payload
        }
      }
    case LOAD_GRID_DATA_SUCCESS:
    case LOAD_GRID_DATA_FAILED:
      return {
        ...state,
        loading: false,
        items: action.payload.items,
        pagination: {
          ...state.pagination,
          total: action.payload.total
        }
      }
    case REMOVE_SUCCESS:
    case REMOVE_FAILED:
      return {
        ...state,
        loading: false
      }
    case LOAD_MODULE_FILTERS_SUCCESS:
      return {
        ...state,
        moduleFilters: action.payload
      }
    case LOAD_MODULE_FILTERS_FAILED:
      return {
        ...state,
        moduleFilters: []
      }
    default:
      return state
  }
}

export const getItems = state => state.items
export const getLoading = state => state.loading
export const getPagination = state => state.pagination
export const getModuleFilters = state => state.moduleFilters
