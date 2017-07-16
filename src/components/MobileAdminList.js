import React, { Component } from 'react'
import fecha from 'fecha'
import { connect } from 'react-redux'
import { Table, Button, Select } from 'antd'

import { fetchAll, fetchFilters, remove } from '../actions/mobile-admin.action'
import {
  getMobileAdminItems,
  getMobileAdminLoading,
  getMobileAdminPagination,
  getMobileAdminModuleFilters
} from '../reducers'
import { isEmptyObj, filterObj } from '../utils'

const { Column } = Table
const { Option } = Select
const timePipe = str => fecha.format(new Date(str), 'YYYY-MM-DD HH:mm:ss')

class MobileAdminList extends Component {
  state = {
    rowKey: '_id',
    selectedRowKeys: [],
    filter: {
      module: '',
      method: '',
      level: '',
      loginName: ''
    }
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props
    const { filter: selectFilters } = this.state
    let option = {
      skip: pagination.current - 1,
      limit: pagination.pageSize
    }

    if (!isEmptyObj(sorter)) {
      Object.assign(option, {
        sortField: sorter.field,
        sortOrder: sorter.order
      })
    }
    Object.assign(filters, selectFilters)
    dispatch(fetchAll(filters, option))
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  handleModuleSelectChange = value => {
    console.log(`selected ${value}`)
    this.setState(prevState => {
      const nextState = {
        ...prevState,
        filter: {
          ...prevState.filter,
          module: value
        }
      }

      this.initData(filterObj(nextState.filter, e => e))
      return nextState
    })
  }

  handleLevelSelectChange = value => {
    console.log(`selected ${value}`)
    this.setState(prevState => {
      const nextState = {
        ...prevState,
        filter: {
          ...prevState.filter,
          level: value
        }
      }

      this.initData(filterObj(nextState.filter, e => e))
      return nextState
    })
  }

  deleteSelectedRow = () => {
    const { dispatch } = this.props
    const { selectedRowKeys, rowKey } = this.state

    dispatch(
      remove({
        [rowKey]: selectedRowKeys
      })
    ).then(_ => {
      this.setState({
        selectedRowKeys: []
      })
      return this.initData()
    })
  }

  deleteAll = () => {
    const { dispatch } = this.props

    dispatch(remove({})).then(_ => {
      this.setState({
        selectedRowKeys: []
      })
      return this.initData()
    })
  }

  initData = condition => {
    condition = condition || filterObj(this.state.filter, e => e)
    const { dispatch } = this.props
    return dispatch(
      fetchAll(condition, {
        skip: 0,
        limit: 10
      })
    )
  }

  initFilters = () => {
    const { dispatch } = this.props
    return dispatch(fetchFilters('module'))
  }

  render() {
    const { items, loading, pagination, moduleFilters } = this.props
    const { selectedRowKeys, rowKey } = this.state
    const rowSelection = {
      selectedRowKeys: selectedRowKeys,
      onChange: this.onSelectChange
    }
    const hasSelected = selectedRowKeys.length > 0
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={this.deleteSelectedRow}
            disabled={!hasSelected}
            loading={loading}
          >
            删除
          </Button>

          <Button
            style={{ marginLeft: 16 }}
            type="primary"
            onClick={() => this.initData()}
            loading={loading}
          >
            刷新
          </Button>

          <label style={{ marginLeft: 10 }}>模块: </label>
          <Select
            style={{ width: 120, marginLeft: 10 }}
            onChange={this.handleModuleSelectChange}
            allowClear={true}
          >
            {moduleFilters.map(e =>
              <Option value={e.name} key={e.name}>
                {e.name}
              </Option>
            )}
          </Select>

          <label style={{ marginLeft: 10 }}>级别: </label>
          <Select
            style={{ width: 120, marginLeft: 10 }}
            onChange={this.handleLevelSelectChange}
            allowClear={true}
          >
            <Option value="INFO">INFO</Option>
            <Option value="ERROR">ERROR</Option>
          </Select>

          <Button
            type="primary"
            style={{ marginLeft: 16 }}
            onClick={this.deleteAll}
            loading={loading}
          >
            删除全部
          </Button>
        </div>
        <Table
          rowSelection={rowSelection}
          dataSource={items}
          loading={loading}
          pagination={pagination}
          onChange={this.handleTableChange}
          rowKey={record => record[rowKey]}
          bordered
        >
          <Column title="模块" dataIndex="module" key="module" />
          <Column title="方法" dataIndex="method" key="method" />
          <Column title="描述" dataIndex="description" key="description" />
          <Column title="级别" dataIndex="level" key="level" />
          <Column title="用户名" dataIndex="loginName" key="loginName" />
          <Column title="租户" dataIndex="tenantId" key="tenantId" />
          <Column
            title="设备平台"
            dataIndex="devicePlatform"
            key="devicePlatform"
          />
          <Column title="设备版本" dataIndex="deviceVersion" key="deviceVersion" />
          <Column title="设备uuid" dataIndex="deviceUUID" key="deviceUUID" />
          <Column
            title="创建时间"
            dataIndex="createdAt"
            key="createdAt"
            render={text =>
              <span>
                {timePipe(text)}
              </span>}
          />
        </Table>
      </div>
    )
  }

  componentDidMount() {
    this.initData()
    this.initFilters()
  }
}

const mapStateToProps = state => ({
  items: getMobileAdminItems(state),
  loading: getMobileAdminLoading(state),
  pagination: getMobileAdminPagination(state),
  moduleFilters: getMobileAdminModuleFilters(state)
})

export default connect(mapStateToProps)(MobileAdminList)
