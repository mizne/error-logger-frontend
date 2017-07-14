import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Menu, Icon } from 'antd'
const SubMenu = Menu.SubMenu

const SidebarWrapper = styled.div`
  width: 240px;
  background: #404040;
`

class Sidebar extends Component {
  handleClick = e => {
    // console.log('click ', e)
  }
  render() {
    return (
      <SidebarWrapper>
        <Menu
          theme="dark"
          onClick={this.handleClick}
          style={{ width: 240 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>Navigation One</span>
              </span>
            }
          >
            <Menu.Item key="1">
              <Link to="/mobile-admin" />
              MobileAdmin
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="appstore" />
                <span>Navigation Two</span>
              </span>
            }
          >
            <Menu.Item key="2">
              <Link to="/deal-client" />
              DealClient
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="setting" />
                <span>Navigation Three</span>
              </span>
            }
          >
            <Menu.Item key="3">
              <Link to="/eshop-client" />
              EShopClient
            </Menu.Item>
          </SubMenu>
        </Menu>
      </SidebarWrapper>
    )
  }
}

export default Sidebar
