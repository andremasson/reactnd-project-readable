import { handleGetSortingListings } from './sortingListings'
import { getAllCategories } from '../actions/categories'
import { fetchAllCategories } from '../utils/api'


export function handleInitialData (dispatch) {

  return (dispatch) => {
    fetchAllCategories()
      .then(( categories ) => {
          dispatch(getAllCategories(categories))
      })
    dispatch(handleGetSortingListings())
  }
}