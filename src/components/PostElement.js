import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import Paper from '@material-ui/core/Paper'
import { Grid, Chip, Button, Badge } from '@material-ui/core'
import 'typeface-roboto'
import { Link, withRouter } from 'react-router-dom'
import VoteScore from './VoteScore'
import { handleUpVotePost, handleDownVotePost, handleDeletePost } from '../actions/posts'
import DeleteIcon from '@material-ui/icons/Delete'
import CommentIcon from '@material-ui/icons/Comment'
import ConfirmationDialog from './ConfirmationDialog'

class PostElement extends Component {
  state = {
    dialogOpen: false
  }
  onUpVote = (e) => {
    e.preventDefault()
    this.props.handleUpVotePost(this.props.post.id)
  }
  onDownVote = (e) => 
  {
    e.preventDefault()
    this.props.handleDownVotePost(this.props.post.id)
  }
  deletePost = (e) => {
    e.preventDefault()
    this.setState({ dialogOpen: true })
  }
  handleCancelDialog = () => {
    this.setState({ dialogOpen: false })
  }
  handleOkDialog = () => {
    this.setState({ dialogOpen: false })
    this.props.handleDeletePost(this.props.post.id)
  }
  render() {
    const { post } = this.props
    return (
      (post !== null &&
        <div>
          <ConfirmationDialog 
            openState={this.state.dialogOpen}
            displayMessage='Delete this post?'
            onCancel={() => this.handleCancelDialog()}
            onOk={() => this.handleOkDialog()}
          />
          <Link to={`/post/${post.id}`} className='post-element'>
            <Paper>
              <Grid container className='post-item'>
                <Grid item xs={12}>
                  <h3>{post.title}</h3>
                </Grid>
                <Grid item xs={6}>
                  <p>By <b>{post.author}</b> at {formatDate(post.timestamp)}</p>
                </Grid>
                <Grid item xs={6} className='align-right'>
                  <Chip label={post.category} className='align-right' />
                </Grid>
                <Grid item>
                  <VoteScore voteScore={post.voteScore} onUpVote={this.onUpVote} onDownVote={this.onDownVote} />
                </Grid>
                <Grid item>
                  <Button variant='contained' color='secondary' onClick={(e) => this.deletePost(e)}>
                    <DeleteIcon />
                  </Button>
                </Grid>
                {post.commentCount > 0 &&
                <Grid>
                  <Badge badgeContent={post.commentCount} color="secondary">
                    <CommentIcon />
                  </Badge>
                </Grid>
                }
              </Grid>
            </Paper>
          </Link>
        </div>
      )
    )
  }
}

const mapDispatchToProps = dispatch => ({
  handleUpVotePost: comment => dispatch(handleUpVotePost(comment)),
  handleDownVotePost: id => dispatch(handleDownVotePost(id)),
  handleDeletePost: id => dispatch(handleDeletePost(id))
})

export default withRouter(connect(null, mapDispatchToProps)(PostElement))