import { 
  fetchComments,
  saveDownVoteComment,
  saveUpVoteComment,
  deleteComment,
  saveNewComment,
  saveComment
} from '../utils/api'

export const GET_COMMENTS = 'GET_COMMENTS'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const NEW_COMMENT = 'NEW_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'

const getComments = comments => ({ type: GET_COMMENTS, comments })
export function handleGetComments(postId) {
  return (dispatch) => {
    fetchComments(postId)
      .then((comments) => {
        dispatch(getComments(comments))
      })
  }
}

const upVote = (comment) => ({ type: UPVOTE_COMMENT, comment })
export function handleUpVoteComment (id) {
  return (dispatch) => {
    saveUpVoteComment(id)
      .then((comment) => {
        dispatch(upVote(comment))
      })
  }
}

const downVote = (comment) => ({ type: DOWNVOTE_COMMENT, comment })
export function handleDownVoteComment (id) {
  return (dispatch) => {
    saveDownVoteComment(id)
      .then((comment) => {
        dispatch(downVote(comment))
      })
  }
}

const deleteCommentAction = (comment) => ({ type: DELETE_COMMENT, comment })
export function handleDeleteComment (id) {
  return (dispatch) => {
    deleteComment(id)
      .then((comment) => {
        dispatch(deleteCommentAction(comment))
      })
  }
}

const newComment = (comment) => ({ type: NEW_COMMENT, comment })
export function handleNewComment (comment) {
  return (dispatch) => {
    saveNewComment(comment)
      .then((comment) =>{
        dispatch(newComment(comment))
      })
  }
}

const updateComment = (comment) => ({ type: UPDATE_COMMENT, comment })
export function handleUpdateComment (comment) {
  return (dispatch) => {
    saveComment(comment)
      .then((comment) =>{
        dispatch(updateComment(comment))
      })
  }
}