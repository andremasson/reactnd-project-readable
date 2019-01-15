import { combineReducers } from 'redux'
import categories from './categories'
import { posts, currentPost } from './posts'
import comments from './comments'
import drawer from './drawer'
import filter from './filter'
import { sortingList, selectedSortingId } from './sortingListings'

const rootReducer = combineReducers({
  categories,
  posts,
  currentPost,
  comments,
  drawer,
  filter,
  sortingList,
  selectedSortingId
})

export default rootReducer