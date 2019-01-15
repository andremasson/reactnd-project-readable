import { GET_FILTER, SET_FILTER } from '../actions/filter'

export default function drawer (state = '', action) {
  switch(action.type) {
    case GET_FILTER:
      return action.filter
    case SET_FILTER:
      return action.filter
    default:
      return state
  }
}