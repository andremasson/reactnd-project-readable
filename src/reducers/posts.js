import { GET_ALL_POSTS, SEARCH_POSTS } from '../actions/posts'

export default function posts (state = [], action) {
  switch(action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
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
    default:
      return state
  }
}