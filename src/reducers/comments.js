import { GET_COMMENTS, UPVOTE_COMMENT, DOWNVOTE_COMMENT, DELETE_COMMENT, NEW_COMMENT } from '../actions/comments'

export default function comments (state = [], action) {
  switch(action.type) {
    case GET_COMMENTS:
    return {
        ...action.comments
      }
    case DOWNVOTE_COMMENT:
    case UPVOTE_COMMENT:
      const updatedComments = Object.values(state).map((comment) => {
      if (comment.id === action.comment.id) comment.voteScore = action.comment.voteScore
        return comment
      })
      return {
        ...updatedComments
      }
    case DELETE_COMMENT:
      const remainComments = Object.values(state).filter((comment) => comment.id !== action.comment.id)
      return {
        ...remainComments
      }
    case NEW_COMMENT:
      return {
        ...state,
        [action.comment.id]: action.comment
      }
    default:
      return state
  }
}