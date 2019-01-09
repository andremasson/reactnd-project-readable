import React, { Component } from 'react'
import {
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import { formatDate } from '../utils/helpers'

class AuthorDisplay extends Component {
  render() {
    const { name, timestamp } = this.props
    const date = formatDate(timestamp)
    return (
      <List>
        <ListItem>
          <ListItemText primary={`By ${name}`} secondary={date} />
        </ListItem>
      </List>
    )
  }
}

export default AuthorDisplay