export const GET_FILTER = 'GET_FILTER'
export const SET_FILTER = 'SET_FILTER'

export const getFilter = (filter) => ({ type: GET_FILTER, filter })
export const setFilter = (filter) => ({ type: SET_FILTER, filter })