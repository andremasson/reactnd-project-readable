import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  List,
  ListItem,
  IconButton,
  Typography,
} from '@material-ui/core'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'

class VoteScore extends Component {
  static propTypes = {
    voteScore: PropTypes.number.isRequired,
    onUpVote: PropTypes.func.isRequired,
    onDownVote: PropTypes.func.isRequired
  }
  render() {
    const { voteScore } = this.props
    return (
      <List>
        <ListItem>
          <IconButton onClick={(e) => this.props.onUpVote(e)}>
            <ThumbUp />
          </IconButton>
          <Typography variant="caption" gutterBottom>
            Vote score: {voteScore}
          </Typography>
          <IconButton onClick={(e) => this.props.onDownVote(e)}>
            <ThumbDown />
          </IconButton>
        </ListItem>
      </List>
    )
  }
}

export default VoteScore


