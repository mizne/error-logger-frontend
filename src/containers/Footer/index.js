import React, { Component } from 'react'
import styled from 'styled-components'

import Copyright from './Copyright'

const FooterWrapper = styled.footer`
	box-sizing: border-box;
	border: none;
	font-weight: 300;
	color: #202020;
	font-size: 15px;
	line-height: 24px;
	background: #2D2D2D;
	box-shadow: inset 0 10px 10px -5px #0d1116;
	padding-top: 2em;
	padding-bottom: 2em;
	-webkit-font-smoothing: antialiased;
`

class Footer extends Component {
  render() {
    return (
      <FooterWrapper>
        <Copyright />
      </FooterWrapper>
    )
  }
}

export default Footer