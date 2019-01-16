import React from 'react'
import {
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import { formatDate } from '../utils/helpers'

const AuthorDisplay = ({name, timestamp}) => {
  const date = formatDate(timestamp)
  return (
    <List>
      <ListItem>
        <ListItemText primary={`By ${name}`} secondary={date} />
      </ListItem>
    </List>
  )
}

export default AuthorDisplay