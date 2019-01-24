import React from 'react'
import { connect } from 'react-redux'
import CommentElement from './CommentElement'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'

const CommentListWrapper = styled.div`
  width: 100%;
  margin: 0;
`
const CommentsDisplay = styled.ul`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding: 0 0 0 0;
`

const CommentList = ({ comments }) => {
  if (comments.length === 0) return <Typography variant='h6'>No comments</Typography>
  return (
    <CommentListWrapper>
      <Typography variant='h6'>
        {comments.length} comments
      </Typography>
      <CommentsDisplay>
        {comments.map((comment) => (
          <li key={comment.id}>
            <CommentElement id={comment.id} />
          </li>
        ))}
      </CommentsDisplay>
    </CommentListWrapper>
  )
}

const mapStateToProps = ({comments}) => {
  return {
    comments: comments.filter((comment) => (comment.deleted === false))
              .sort((a, b) => b.voteScore - a.voteScore || b.timestamp - a.timestamp)
  }
}

export default connect(mapStateToProps)(CommentList)