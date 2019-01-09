import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import CssBaseline from '@material-ui/core/CssBaseline'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './Dashboard'
import PostPage from './PostPage'

class App extends Component {
  componentDidMount() {
    console.log('Dados iniciais?')
    this.props.dispatch(handleInitialData())
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

export default connect()(App)
