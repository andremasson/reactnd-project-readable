import { fetchAllCategories, fetchAllPosts } from '../utils/api'
import { getAllCategories } from '../actions/categories'
import { getAllPosts } from '../actions/posts'


export function handleInitialData (dispatch) {
  return (dispatch) => {
    fetchAllCategories()
      .then(( categories ) => {
          dispatch(getAllCategories(categories))
      })
    fetchAllPosts()
      .then(( posts ) => {
        dispatch(getAllPosts(posts))
      })
  }
}
