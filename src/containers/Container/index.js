import React, { Component } from "react"
import styled from "styled-components"

import Sidebar from '../../components/Sidebar'
import Content from '../../components/Content'

const ContainerWrapper = styled.section`
  padding-top: 20px;
  padding-bottom: 80px;
  min-height: 100vh;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
`

class Container extends Component {
  render() {
    return <ContainerWrapper>
      <Sidebar />
      <Content />
    </ContainerWrapper>
  }
}

export default Container
