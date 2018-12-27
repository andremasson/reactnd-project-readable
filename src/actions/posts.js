import { fetchAllPosts, fetchPostsByCategory } from "../utils/api";

export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const SEARCH_POSTS = 'SEARCH_POSTS'
export const GET_BY_CATEGORY = 'GET_BY_CATEGORY'

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