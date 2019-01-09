import { fetchComments, saveDownVoteComment, saveUpVoteComment, deleteComment } from '../utils/api'

export const GET_COMMENTS = 'GET_COMMENTS'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'

const getComments = comments => ({ type: GET_COMMENTS, comments })
export function handleGetComments(dispatch, postId) {
  return (dispatch) => {
    fetchComments(dispatch, postId)
      .then((comments) => {
        dispatch(getComments(comments))
      })
  }
}

const upVote = (comment) => ({ type: UPVOTE_COMMENT, comment })
export function handleUpVoteComment (dispatch, id) {
  return (dispatch) => {
    saveUpVoteComment(dispatch, id)
      .then((comment) => {
        dispatch(upVote(comment))
      })
  }
}

const downVote = (comment) => ({ type: DOWNVOTE_COMMENT, comment })
export function handleDownVoteComment (dispatch, id) {
  return (dispatch) => {
    saveDownVoteComment(dispatch, id)
      .then((comment) => {
        dispatch(downVote(comment))
      })
  }
}

const deleteCommentAction = (comment) => ({ type: DELETE_COMMENT, comment })
export function handleDeleteComment (dispatch, id) {
  return (dispatch) => {
    deleteComment(dispatch, id)
      .then((comment) => {
        dispatch(deleteCommentAction(comment))
      })
  }
}