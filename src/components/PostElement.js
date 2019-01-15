import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import Paper from '@material-ui/core/Paper'
import { Grid, Chip, Button, Avatar } from '@material-ui/core'
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
      (post !== null && post.hideInSearch !== true &&
        <div>
          <ConfirmationDialog 
            openState={this.state.dialogOpen}
            displayMessage='Delete this post?'
            onCancel={() => this.handleCancelDialog()}
            onOk={() => this.handleOkDialog()}
          />
          <Link to={`/post/${post.id}`} className='post-element'>
            <Paper className='post-element'>
              <Grid container spacing={32} className='post-item'>
                <Grid item xs={8}>
                  <Grid container direction='column'>
                    <Grid item>
                      <h3>{post.title}</h3>
                    </Grid>
                    <Grid item>
                      <p>By <b>{post.author}</b> at {formatDate(post.timestamp)}</p>
                    </Grid>
                    <Grid item>
                      <VoteScore voteScore={post.voteScore} onUpVote={this.onUpVote} onDownVote={this.onDownVote} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container direction='column'>
                    <Grid item className='post-item-right'>
                      <Chip label={post.category}/>
                    </Grid>
                    <Grid item className='post-item-right'>
                      {post.commentCount > 0 &&
                        <Chip 
                          avatar={
                            <Avatar>
                              <CommentIcon />
                            </Avatar>
                          }
                          label={post.commentCount}
                        />
                      }
                    </Grid>
                    <Grid item className='post-item-right'>
                      <Button variant='contained' color='secondary' onClick={(e) => this.deletePost(e)}>
                        <DeleteIcon />
                      </Button>
                    </Grid>
                  </Grid> 
                </Grid>
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