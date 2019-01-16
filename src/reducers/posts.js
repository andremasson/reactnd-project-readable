import { 
  GET_ALL_POSTS, 
  SEARCH_POSTS,
  GET_BY_CATEGORY,
  GET_POST,
  UPVOTE_POST,
  DOWNVOTE_POST,
  DELETE_POST,
  NEW_POST,
  UPDATE_POST,
} from '../actions/posts'

export function posts (state = [], action) {
  switch(action.type) {
    case GET_ALL_POSTS:
      return action.posts
    case SEARCH_POSTS:
      const { posts, query } = action
      return posts.map(post => {
        return {
          ...post,
          hideInSearch: !post.title.toLowerCase().includes(query.toLowerCase())
        }
      })
    case GET_BY_CATEGORY:
      return action.posts
    case DOWNVOTE_POST:
    case UPVOTE_POST:
      return state.map((post) => {
        if (post.id === action.post.id) {
          return {
            ...post,
            voteScore: action.post.voteScore
          }
        }
        return post
      })
    case DELETE_POST:
      return state.filter((post) => post.id !== action.post.id)
    case NEW_POST:
      return [
        ...state,
        action.post
      ]
    case UPDATE_POST:
      return state.map(post =>
        (post.id === action.post.id) ? action.post : post
      )
    default:
      return state
  }
}

export function currentPost (state = [], action) {
  switch(action.type) {
    case UPDATE_POST:
    case GET_POST:
      return action.post
    case UPVOTE_POST:
      return action.post
    case DOWNVOTE_POST:
      return action.post
    case NEW_POST:
      return action.post
    default:
      return state
  }
}