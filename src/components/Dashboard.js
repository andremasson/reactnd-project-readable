import React, { Component } from 'react'
import { connect } from 'react-redux'
import Posts from '../components/Posts'
import AddButton from '../components/AddButton'
import { withRouter } from 'react-router-dom'
import TopBar from './TopBar';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <Posts {...this.props} />
        <AddButton />
      </div>
    )
  }
}

export default withRouter(connect()(Dashboard))