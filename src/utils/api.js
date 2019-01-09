let auth_key = localStorage.auth_key || Math.random().toString(36).substr(-8)
localStorage.auth_key = auth_key
const api = 'http://localhost:3001'

const headers = {
  'Content-Type': 'application/json',
  'Authorization': auth_key
}

export const fetchAllCategories = dispatch => {
  return fetch(`${api}/categories`, { headers })
    .then(response => response.json())
    .then(json => json.categories)
}

export const fetchAllPosts = dispatch => {
  return fetch(`${api}/posts`, { headers })
    .then(response => response.json())
    .then(posts => posts)
}

export const fetchPostsByCategory = (dispatch, category) => {
  return fetch(`${api}/${category}/posts`, { headers })
    .then(response => response.json())
    .then(posts => posts)
}

export const fetchPost = (dispatch, id) => {
  return fetch(`${api}/posts/${id}`, { headers })
    .then(response => response.json())
    .then(post => post)
}

export const deletePost = (dispatch, id) => {
  return fetch(`${api}/posts/${id}`,
  {
    method: 'DELETE',
    headers: headers
  })
  .then(response => response.json())
  .then(post => post)
}

export const saveUpVote = (dispatch, id) => {
  return fetch(`${api}/posts/${id}`,
  {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ option: 'upVote' })
  })
  .then(response => response.json())
  .then(post => post)
}

export const saveDownVote = (dispatch, id) => {
  return fetch(`${api}/posts/${id}`,
  {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ option: 'downVote' })
  })
  .then(response => response.json())
  .then(post => post)
}

export const fetchComments = (dispatch, postId) => {
  return fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(response => response.json())
    .then(comments => comments)
}

export const deleteComment = (dispatch, id) => {
  return fetch(`${api}/comments/${id}`,
  {
    method: 'DELETE',
    headers: headers
  })
  .then(response => response.json())
  .then(post => post)
}

export const saveUpVoteComment = (dispatch, id) => {
  return fetch(`${api}/comments/${id}`,
  {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ option: 'upVote' })
  })
  .then(response => response.json())
  .then(post => post)
}

export const saveDownVoteComment = (dispatch, id) => {
  return fetch(`${api}/comments/${id}`,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ option: 'downVote' })
    })
    .then(response => response.json())
    .then(post => post)
}


/*
let auth_key = localStorage.auth_key || Math.random().toString(36).substr(-8)
let api = 'http://localhost:3001'
let id = "8xf0y6ziyjabvozdd253nd"

let headers = {
  'Content-Type': 'application/json',
  'Authorization': auth_key
}

fetch(`${api}/posts/${id}`,
{
  method: 'POST',
  headers: headers,
  body: JSON.stringify({ option: 'upVote' })
})
.then(response => response.json())

fetch(`${api}/posts/${id}`, { headers })
    .then(response => response.json())
*/