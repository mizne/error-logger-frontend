import React, { Component } from 'react'
import styled from 'styled-components'

const CopyrightWrapper = styled.section`
	color: rgba(255,255,255,0.4);
	text-align: center;
`

class Copyright extends Component {
  render() {
    return (
      <CopyrightWrapper>
        Copyright © 2017 Tenswin Inc.
      </CopyrightWrapper>
    )
  }
}

export default Copyright