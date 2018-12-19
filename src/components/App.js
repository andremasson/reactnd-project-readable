import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Categories from '../components/Categories'
import Posts from '../components/Posts'
import '../App.css'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <div className="App">
        <Categories />
        <Posts />
      </div>
    );
  }
}

export default connect()(App);
