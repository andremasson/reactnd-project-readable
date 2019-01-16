import {
  GET_COMMENTS,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  DELETE_COMMENT,
  NEW_COMMENT,
  UPDATE_COMMENT
} from '../actions/comments'

export default function comments (state = [], action) {
  switch(action.type) {
    case GET_COMMENTS:
    return action.comments
    case DOWNVOTE_COMMENT:
    case UPVOTE_COMMENT:
      return state.map((comment) => {
      if (comment.id === action.comment.id) comment.voteScore = action.comment.voteScore
        return comment
      })
    case DELETE_COMMENT:
      return state.filter((comment) => comment.id !== action.comment.id)
    case NEW_COMMENT:
      return [
        ...state,
        action.comment
      ]
    case UPDATE_COMMENT:
      return state.map((comment) => {
      if (comment.id === action.comment.id) comment.body = action.comment.body
        return comment
      })
    default:
      return state
  }
}