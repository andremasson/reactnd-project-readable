import { 
  GET_ALL_POSTS, 
  SEARCH_POSTS,
  GET_BY_CATEGORY,
  GET_POST,
  UPVOTE_POST,
  DOWNVOTE_POST,
  DELETE_POST,
  NEW_POST
} from '../actions/posts'

export function posts (state = [], action) {
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
    case DOWNVOTE_POST:
    case UPVOTE_POST:
      const updatedPosts = Object.values(state).map((post) => {
        if (post.id === action.post.id) post.voteScore = action.post.voteScore
        return post
      })
      return {
        ...updatedPosts,
      }
    case DELETE_POST:
      const remainPosts = Object.values(state).filter((post) => post.id !== action.post.id)
      return {
        ...remainPosts
      }
    case NEW_POST:
      return {
        ...state,
        [action.post.id]: action.post
      }
    default:
      return state
  }
}

export function currentPost (state = [], action) {
  switch(action.type) {
    case GET_POST:
      return {
        ...action.post
      }
    case UPVOTE_POST:
      return {
        ...action.post
      }
    case DOWNVOTE_POST:
      return {
        ...action.post
      }
    case NEW_POST:
      return {
        ...action.post
      }
    default:
      return state
  }
}