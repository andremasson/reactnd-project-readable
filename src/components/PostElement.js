import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import Paper from '@material-ui/core/Paper'
import { Grid, Chip, Button } from '@material-ui/core'
import 'typeface-roboto'
import { Link, withRouter } from 'react-router-dom'
import VoteScore from './VoteScore'
import { handleUpVotePost, handleDownVotePost, handleDeletePost } from '../actions/posts'
import DeleteIcon from '@material-ui/icons/Delete'
import ConfirmationDialog from './ConfirmationDialog'

class PostElement extends Component {
  state = {
    dialogOpen: false
  }
  onUpVote = (e) => {
    e.preventDefault()
    this.props.dispatch(handleUpVotePost(this.props.dispatch, this.props.post.id))
  }
  onDownVote = (e) => 
  {
    e.preventDefault()
    this.props.dispatch(handleDownVotePost(this.props.dispatch, this.props.post.id))
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
    this.props.dispatch(handleDeletePost(this.props.dispatch, this.props.post.id))
  }
  render() {
    const { post, date } = this.props
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
                  <p>By <b>{post.author}</b> at {date}</p>
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
              </Grid>
            </Paper>
          </Link>
        </div>
      )
    )
  }
}

const mapStateToProps = ({posts}, {id}) => {
  return {
    post: (posts[id].hideInSearch === true || posts[id].deleted) ? null : posts[id],
    date: formatDate(posts[id].timestamp)
  }
}

export default withRouter(connect(mapStateToProps)(PostElement))