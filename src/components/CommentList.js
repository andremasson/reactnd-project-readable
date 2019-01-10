import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CommentElement from './CommentElement'
import { Typography } from '@material-ui/core'

class CommentList extends Component {
  render() {
    const { comments } = this.props
    if (comments.length === 0) return <Typography variant='h6'>No comments</Typography>
    return (
      <div className='comment-list'>
        <Typography variant='h6'>
          {comments.length} comments
        </Typography>
        <ul className='comments'>
          {comments.map((comment) => (
            <li key={comment.id}>
              <CommentElement id={comment.id} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({comments}) => {
  const commentsArray = Object.values(comments)
  return {
    comments: !commentsArray
              ?[]
              : commentsArray.filter((comment) => (comment.deleted === false))
                .sort((a, b) => b.voteScore - a.voteScore)
  }
}

export default withRouter(connect(mapStateToProps)(CommentList))