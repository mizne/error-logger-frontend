import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'

import MobileAdminList from './MobileAdminList'
import DealClientList from './DealClientList'
import EShopClientList from './EShopClientList'

const ContentWrapper = styled.div`
  flex: 1;
  margin-left: 20px;
  padding: 0 10px;
`

class Content extends Component {
  render() {
    return (
      <ContentWrapper>
        <Switch>
          <Route path="/mobile-admin" component={MobileAdminList} />
          <Route path="/deal-client" component={DealClientList} />
          <Route path="/eshop-client" component={EShopClientList} />
          <Redirect from="/" to="/mobile-admin" />
        </Switch>
      </ContentWrapper>
    )
  }
}

export default Content
