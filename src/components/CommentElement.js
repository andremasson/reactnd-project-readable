import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Grid,
  Typography,
  Paper,
  Button
} from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import VoteScore from './VoteScore'
import AuthorDisplay from './AuthorDisplay'
import { handleUpVoteComment, handleDownVoteComment, handleDeleteComment } from '../actions/comments'
import DeleteIcon from '@material-ui/icons/Delete'
import ConfirmationDialog from './ConfirmationDialog'

class CommentElement extends Component {
  state = {
    dialogOpen: false
  }
  onUpVote = () => {
    this.props.dispatch(handleUpVoteComment(this.props.dispatch, this.props.comment.id))
  }
  onDownVote = () => {
    this.props.dispatch(handleDownVoteComment(this.props.dispatch, this.props.comment.id))
  }
  deleteComment = () => {
    this.setState({ dialogOpen: true })
  }
  handleCancelDialog = () => {
    this.setState({ dialogOpen: false })
  }
  handleOkDialog = () => {
    this.setState({ dialogOpen: false })
    this.props.dispatch(handleDeleteComment(this.props.dispatch, this.props.comment.id))
  }
  render() {
    const { comment } = this.props
    if (!comment || comment.deleted) {
      return null
    }
    return (
      <div>
        <ConfirmationDialog 
          openState={this.state.dialogOpen}
          displayMessage='Delete this comment?'
          onCancel={() => this.handleCancelDialog()}
          onOk={() => this.handleOkDialog()}
        />
        <Paper className='comment-display'>
          <Grid container spacing={8} direction='column'>
            <Grid item xs={4} sm={12}>
              <AuthorDisplay name={comment.author} timestamp={comment.timestamp} />
            </Grid>
            <Grid item xs='auto'>
              <Typography component='p'>
                {comment.body}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={12}>              
              <VoteScore voteScore={comment.voteScore} onUpVote={this.onUpVote} onDownVote={this.onDownVote} />
            </Grid>
            <Grid item xs={4} sm={12}>              
              <Button variant='contained' color='secondary' onClick={() => this.deleteComment()}>
                <DeleteIcon />
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({comments}, props) => {
  const comment = Object.values(comments).find((comment) => comment.id === props.id)
  return {
    comment
  }
}

export default withRouter(connect(mapStateToProps)(CommentElement))