import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, ListItemText } from '@material-ui/core';

class CategoriesList extends Component {
  selectCategory(path) {
    alert(path)
  }
  render() {
    const { categories } = this.props
    return (
      <div>
        <List>
          {categories && categories.map(cat => 
            <ListItem button key={cat.path}>
              <ListItemText primary={cat.name} onClick={() => this.selectCategory(`${cat.path}`)}/>
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

export default connect(mapStateToProps)(CategoriesList)