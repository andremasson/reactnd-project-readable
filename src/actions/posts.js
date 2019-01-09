import { 
  fetchAllPosts,
  fetchPostsByCategory,
  fetchPost,
  deletePost,
  saveUpVote,
  saveDownVote
} from "../utils/api"

export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const SEARCH_POSTS = 'SEARCH_POSTS'
export const GET_BY_CATEGORY = 'GET_BY_CATEGORY'
export const GET_POST = 'GET_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const DELETE_POST = 'DELETE_POST'

const getAllPosts = posts => ({ type: GET_ALL_POSTS, posts })
export function handleGetAllPosts(dispatch) {
  return (dispatch) => {
    fetchAllPosts()
      .then((posts) => {
        dispatch(getAllPosts(posts))
      })
  }
}

export const searchPosts = (posts, query) => ({ type: SEARCH_POSTS, posts, query })

const getPostsByCategory = (posts) => ({ type: GET_BY_CATEGORY, posts })
export function handleGetPostsByCategory (dispatch, category) {
  return (dispatch) => {
    fetchPostsByCategory(dispatch, category)
      .then((posts) => {
        dispatch(getPostsByCategory(posts))
      })
  }
}

const getPost = (post) => ({ type: GET_POST, post })
export function handleGetPost (dispatch, id) {
  return (dispatch) => {
    fetchPost(dispatch, id)
      .then((post) => {
        dispatch(getPost(post))
      })
  }
}

const deletePostAction = (post) => ({ type: DELETE_POST, post })
export function handleDeletePost (dispatch, id) {
  return (dispatch) => {
    deletePost(dispatch, id)
      .then((post) => {
        dispatch(deletePostAction(post))
      })
  }
}

const upVote = (post) => ({ type: UPVOTE_POST, post })
export function handleUpVotePost (dispatch, id) {
  return (dispatch) => {
    saveUpVote(dispatch, id)
      .then((post) => {
        dispatch(upVote(post))
      })
  }
}

const downVote = (post) => ({ type: DOWNVOTE_POST, post })
export function handleDownVotePost (dispatch, id) {
  return (dispatch) => {
    saveDownVote(dispatch, id)
      .then((post) => {
        dispatch(downVote(post))
      })
  }
}