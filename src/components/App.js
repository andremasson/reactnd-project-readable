import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import '../App.css'
import CssBaseline from '@material-ui/core/CssBaseline'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './Dashboard'
import PostPage from './PostPage'
import NewPostPage from './NewPostPage'

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData()
  }
  render() {
    return (
      <Router>
        <Fragment>
          <CssBaseline />
          <div className="App">
            <Switch>
              <Route
                path='/' exact
                render={(props) => <Dashboard {...props} filterByCategory={false} />}
              />
              <Route
                path='/:category' exact
                render={(props) => <Dashboard {...props} filterByCategory={true} />}
              />
              <Route
                path='/post/new' exact
                render={(props) => <NewPostPage />}
              />
              <Route
                path='/post/:id' exact
                render={(props) => <PostPage />}
              />
            </Switch>
          </div>
        </Fragment>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  handleInitialData: () => dispatch(handleInitialData())
})

export default connect(null, mapDispatchToProps)(App)
