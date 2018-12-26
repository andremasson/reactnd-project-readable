import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Posts from '../components/Posts'
import CssBaseline from '@material-ui/core/CssBaseline'
import AddButton from '../components/AddButton'
import 'typeface-roboto';
import TopBar from './TopBar'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  
  render() {
    return (
      <div className="App">
        <CssBaseline />
        
        <TopBar />
        
        <Posts />
        
        <AddButton />
      </div>
    )
  }
}

export default connect()(App);
