import { 
  GET_ALL_POSTS, 
  SEARCH_POSTS,
  GET_BY_CATEGORY
} from '../actions/posts'

export default function posts (state = [], action) {
  switch(action.type) {
    case GET_ALL_POSTS:
      return {
        ...action.posts
      }
    case SEARCH_POSTS:
      const { posts } = action
      Object.values(posts).map((post) => (
        post.hideInSearch = !post.title.toLowerCase().includes(action.query.toLowerCase())
      ))
      return {
        ...posts,
      }
    case GET_BY_CATEGORY:
      return {
        ...action.posts
      }
    default:
      return state
  }
}