import {
  GET_SORTING_LISTINGS,
  GET_SELECTED_SORTING,
  SET_SELECTED_SORTING
} from '../actions/sortingListings'

export function sortingList (state = [], action) {
  switch(action.type) {
    case GET_SORTING_LISTINGS:
      return {
        ...action.sortingListings
      }
    default:
      return state
  }
}

export function selectedSortingId (state = 0, action) {
  switch(action.type) {
    case GET_SELECTED_SORTING:
    case SET_SELECTED_SORTING:
      return action.id
    default:
      return state
  }
}