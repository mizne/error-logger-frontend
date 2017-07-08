import { combineReducers } from 'redux'
import { createSelector } from 'reselect'

import { mobileAdmin, getItems as getMAItems, getLoading as getMALoading, getPagination as getMAPagination, getModuleFilters as getMAModuleFilters } from './mobile-admin.reducer'
import { dealClient, getItems as getDCItems, getLoading as getDCLoading, getPagination as getDCPagination, getModuleFilters as getDCModuleFilters } from './deal-client.reducer'
import { eshopClient, getItems as getESItems, getLoading as getESLoading, getPagination as getESPagination, getModuleFilters as getESModuleFilters } from './eshop-client.reducer'

const rootReducer = combineReducers({
  mobileAdmin,
  dealClient,
  eshopClient
})

export default rootReducer

const getMobileAdminState = (state) => state.mobileAdmin
export const getMobileAdminItems = createSelector(getMobileAdminState, getMAItems)
export const getMobileAdminLoading = createSelector(getMobileAdminState, getMALoading)
export const getMobileAdminPagination = createSelector(getMobileAdminState, getMAPagination)
export const getMobileAdminModuleFilters = createSelector(getMobileAdminState, getMAModuleFilters)


const getDealClientState = state => state.dealClient
export const getDealClientItems = createSelector(getDealClientState, getDCItems)
export const getDealClientLoading = createSelector(getDealClientState, getDCLoading)
export const getDealClientPagination = createSelector(getDealClientState, getDCPagination)
export const getDealClientModuleFilters = createSelector(getDealClientState, getDCModuleFilters)


const getEShopClientState = state => state.eshopClient
export const getEShopClientItems = createSelector(getEShopClientState, getESItems)
export const getEShopClientLoading = createSelector(getEShopClientState, getESLoading)
export const getEShopClientPagination = createSelector(getEShopClientState, getESPagination)
export const getEShopClientModuleFilters = createSelector(getEShopClientState, getESModuleFilters)
