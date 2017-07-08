import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Header from './containers/Header'
import Container from './containers/Container'
import Footer from './containers/Footer'

const AppWrapper = styled.div`
  padding-top: 50px;
  width: 100%;
`

class App extends Component {
  render() {
    return (
      <Router>
        <AppWrapper>
          <Header />
          <Container />
          <Footer />
        </AppWrapper>
      </Router>
    )
  }
}

export default connect(state => state)(App)
