let auth_key = localStorage.auth_key || Math.random().toString(36).substr(-8)
const api = 'http://localhost:3001'

const headers = {
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