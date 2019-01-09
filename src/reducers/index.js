import { combineReducers } from 'redux'
import categories from './categories'
import { posts, currentPost } from './posts'
import comments from './comments'
import drawer from './drawer'

const rootReducer = combineReducers({
  categories,
  posts,
  currentPost,
  comments,
  drawer
})

export default rootReducer