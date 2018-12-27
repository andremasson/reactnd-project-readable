import { combineReducers } from 'redux'
import categories from './categories'
import posts from './posts'
import drawer from './drawer'

const rootReducer = combineReducers({
  categories,
  posts,
  drawer
})

export default rootReducer