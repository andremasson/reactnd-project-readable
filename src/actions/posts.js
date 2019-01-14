import { 
  fetchAllPosts,
  fetchPostsByCategory,
  fetchPost,
  deletePost,
  saveUpVote,
  saveDownVote,
  saveNewPost,
  savePostEdit
} from "../utils/api"

export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const SEARCH_POSTS = 'SEARCH_POSTS'
export const GET_BY_CATEGORY = 'GET_BY_CATEGORY'
export const GET_POST = 'GET_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const DELETE_POST = 'DELETE_POST'
export const NEW_POST = 'NEW_POST'
export const UPDATE_POST = 'UPDATE_POST'

const getAllPosts = posts => ({ type: GET_ALL_POSTS, posts })
export function handleGetAllPosts() {
  return (dispatch) => {
    fetchAllPosts()
      .then((posts) => {
        dispatch(getAllPosts(posts))
      })
  }
}

export const searchPosts = (posts, query) => ({ type: SEARCH_POSTS, posts, query })

const getPostsByCategory = (posts) => ({ type: GET_BY_CATEGORY, posts })
export function handleGetPostsByCategory (category) {
  return (dispatch) => {
    fetchPostsByCategory(category)
      .then((posts) => {
        dispatch(getPostsByCategory(posts))
      })
  }
}

const getPost = (post) => ({ type: GET_POST, post })
export function handleGetPost (id) {
  return (dispatch) => {
    fetchPost(id)
      .then((post) => {
        dispatch(getPost(post))
      })
  }
}

const deletePostAction = (post) => ({ type: DELETE_POST, post })
export function handleDeletePost (id) {
  return (dispatch) => {
    deletePost(id)
      .then((post) => {
        dispatch(deletePostAction(post))
      })
  }
}

const upVote = (post) => ({ type: UPVOTE_POST, post })
export function handleUpVotePost (id) {
  return (dispatch) => {
    saveUpVote(id)
      .then((post) => {
        dispatch(upVote(post))
      })
  }
}

const downVote = (post) => ({ type: DOWNVOTE_POST, post })
export function handleDownVotePost (id) {
  return (dispatch) => {
    saveDownVote(id)
      .then((post) => {
        dispatch(downVote(post))
      })
  }
}

const newPost = (post) => ({ type: NEW_POST, post })
export function handleNewPost (post) {
  return (dispatch) =>
    saveNewPost(post)
      .then((post) => {
        return dispatch(newPost(post))
      })
}

const updatePostAction = (post) => ({ type: UPDATE_POST, post })
export function handleUpdatePost (post) {
  return (dispatch) => {
    savePostEdit(post)
      .then((post) =>{
        dispatch(updatePostAction(post))
      })
  }
}