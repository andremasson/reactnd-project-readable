import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import Paper from '@material-ui/core/Paper'
import { Grid, Chip } from '@material-ui/core'
import 'typeface-roboto'
import { Link, withRouter } from 'react-router-dom'
import VoteScore from './VoteScore'
import { handleUpVotePost, handleDownVotePost } from '../actions/posts'

class PostElement extends Component {
  onUpVote = (e) => {
    e.preventDefault()
    this.props.dispatch(handleUpVotePost(this.props.dispatch, this.props.post.id))
  }
  onDownVote = (e) => 
  {
    e.preventDefault()
    this.props.dispatch(handleDownVotePost(this.props.dispatch, this.props.post.id))
  }
  render() {
    const { post, date } = this.props
    return (
      (post !== null &&
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
            </Grid>
          </Paper>
        </Link>
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