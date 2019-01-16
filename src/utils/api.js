import uuidv1 from 'uuid/v1'
import { _getSortingListings } from './_DATA'

let auth_key = localStorage.auth_key || uuidv1()
localStorage.auth_key = auth_key
const api = 'http://localhost:3001'

const headers = {
  'Content-Type': 'application/json',
  'Authorization': auth_key
}

export const fetchAllCategories = () => {
  return fetch(`${api}/categories`, { headers })
    .then(response => response.json())
    .then(json => json.categories)
}

export const fetchAllPosts = () => {
  return fetch(`${api}/posts`, { headers })
    .then(response => response.json())
    .then(posts => posts)
}

export const fetchPostsByCategory = (category) => {
  return fetch(`${api}/${category}/posts`, { headers })
    .then(response => response.json())
    .then(posts => posts)
}

export const fetchPost = (id) => {
  return fetch(`${api}/posts/${id}`, { headers })
    .then(response => response.json())
    .then(post => post)
}

export const deletePost = (id) => {
  return fetch(`${api}/posts/${id}`,
  {
    method: 'DELETE',
    headers: headers
  })
  .then(response => response.json())
  .then(post => post)
}

export const saveNewPost = (post) => {
  return fetch(`${api}/posts`,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        ...post,
        id: uuidv1(),
        timestamp: Date.now()
      })
    }
  )
  .then(response => response.json())
  .then(post => post)
}

export const savePostEdit = (post) => {
  return fetch(`${api}/posts/${post.id}`,
    {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({
        ...post
      })
    }
  )
  .then(response => response.json())
  .then(post => post)
}

export const saveUpVote = (id) => {
  return fetch(`${api}/posts/${id}`,
  {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ option: 'upVote' })
  })
  .then(response => response.json())
  .then(post => post)
}

export const saveDownVote = (id) => {
  return fetch(`${api}/posts/${id}`,
  {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ option: 'downVote' })
  })
  .then(response => response.json())
  //.then(post => {console.log('API: ', post); return post})
}

export const fetchComments = (postId) => {
  return fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(response => response.json())
    .then(comments => comments)
}

export const deleteComment = (id) => {
  return fetch(`${api}/comments/${id}`,
  {
    method: 'DELETE',
    headers: headers
  })
  .then(response => response.json())
  .then(comment => comment)
}

export const saveUpVoteComment = (id) => {
  return fetch(`${api}/comments/${id}`,
  {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ option: 'upVote' })
  })
  .then(response => response.json())
  .then(comment => comment)
}

export const saveDownVoteComment = (id) => {
  return fetch(`${api}/comments/${id}`,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ option: 'downVote' })
    })
    .then(response => response.json())
    .then(comment => comment)
}

export const saveNewComment = (comment) => {
  return fetch(`${api}/comments`,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        id: uuidv1(),
        timestamp: Date.now(),
        ...comment
      })
    }
  )
  .then(response => response.json())
  .then(comment => comment)
}

export const saveComment = (comment) => {
  return fetch(`${api}/comments/${comment.id}`,
    {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({
        timestamp: Date.now(),
        ...comment
      })
    }
  )
  .then(response => response.json())
  .then(comment => comment)
}

export const getSortingListings = () => {
  return _getSortingListings()
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