import React, { Component } from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.header`
  background: #222;
	color: #fafafa;
	position: fixed;
	top: 0;
	height: 50px;
	box-shadow: 0 0 5px rgba(0,0,0,0.5);
	width: 100%;
	z-index: 100;
`

class Header extends Component {
  render() {
    return (
      <HeaderWrapper />
    )
  }
}

export default Header