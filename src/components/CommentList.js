import React from 'react'
import { connect } from 'react-redux'
import CommentElement from './CommentElement'
import { Typography } from '@material-ui/core'

const CommentList = ({ comments }) => {
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

const mapStateToProps = ({comments}) => {
  const commentsArray = Object.values(comments)
  return {
    comments: !commentsArray
              ?[]
              : commentsArray.filter((comment) => (comment.deleted === false))
                .sort((a, b) => b.voteScore - a.voteScore || b.timestamp - a.timestamp)
  }
}

export default connect(mapStateToProps)(CommentList)