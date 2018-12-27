import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import CssBaseline from '@material-ui/core/CssBaseline'
import 'typeface-roboto';
import TopBar from './TopBar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './Dashboard'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <CssBaseline />
          <div className="App">
            <TopBar />
            <Switch>
              <Route
                path='/' exact
                render={(props) => <Dashboard {...props} filterByCategory={false} />}
              />
              <Route
                path='/:category'
                render={(props) => <Dashboard {...props} filterByCategory={true} />}
              />
            </Switch>
          </div>
        </Fragment>
      </Router>
    )
  }
}

export default connect()(App);
