import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, ListItemText } from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import { closeDrawer } from '../actions/drawer'

class CategoriesList extends Component {
  selectCategory(path) {
    this.props.closeDrawer()
    this.props.history.push(`/${path}`)
  }
  render() {
    const { categories } = this.props
    return (
      <div>
        <List>
          <ListItem button>
            <ListItemText primary='ALL' onClick={() => this.selectCategory('')} />
          </ListItem>
          {categories && categories.map(cat => 
            <ListItem button key={cat.path}>
              <ListItemText primary={cat.name} onClick={() => this.selectCategory(`${cat.path}`)} />
            </ListItem>
          )}
        </List>
      </div>
    )
  }
}

const mapStateToProps = ({categories}) => {
  return {
    ...categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoriesList))