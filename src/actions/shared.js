import { fetchAllCategories } from '../utils/api'
import { getAllCategories } from '../actions/categories'


export function handleInitialData (dispatch) {

  return (dispatch) => {
    fetchAllCategories()
      .then(( categories ) => {
          dispatch(getAllCategories(categories))
      })
  }
}