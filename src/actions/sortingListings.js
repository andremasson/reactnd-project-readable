import { getSortingListings } from '../utils/api'

export const GET_SORTING_LISTINGS = 'GET_SORTING_LISTINGS'
export const SET_SELECTED_SORTING = 'SET_SELECTED_SORTING'
export const GET_SELECTED_SORTING = 'GET_SELECTED_SORTING'

const getSortingListingsAction = (sortingListings) => ({ type: GET_SORTING_LISTINGS, sortingListings })
export function handleGetSortingListings() {
  
  return (dispatch) => {
    getSortingListings()
      .then((listings) => {
        dispatch(getSortingListingsAction(listings))
      })
  }
}

export const setSortingFieldId = (id) => ({ type: SET_SELECTED_SORTING, id })