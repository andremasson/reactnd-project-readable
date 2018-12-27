import React, { Component } from 'react'
import { connect } from 'react-redux'
import Posts from '../components/Posts'
import AddButton from '../components/AddButton'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Posts {...this.props} />
        <AddButton />
      </div>
    )
  }
}

export default connect()(Dashboard);