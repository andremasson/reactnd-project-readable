import React from 'react'
import PropTypes from 'prop-types'
import {
  List,
  ListItem,
  IconButton,
  Typography,
} from '@material-ui/core'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'

const VoteScore = (props) => {
    const { voteScore } = props
    return (
      <List>
        <ListItem>
          <IconButton onClick={(e) => props.onUpVote(e)}>
            <ThumbUp />
          </IconButton>
          <Typography variant="caption" gutterBottom>
            Vote score: {voteScore}
          </Typography>
          <IconButton onClick={(e) => props.onDownVote(e)}>
            <ThumbDown />
          </IconButton>
        </ListItem>
      </List>
    )
}

VoteScore.propTypes = {
  voteScore: PropTypes.number.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired
}

export default VoteScore


