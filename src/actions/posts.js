export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const SEARCH_POSTS = 'SEARCH_POSTS'

export const getAllPosts = posts => ({ type: GET_ALL_POSTS, posts })
export const searchPosts = (posts, query) => ({ type: SEARCH_POSTS, posts, query })