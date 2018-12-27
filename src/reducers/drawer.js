import { OPEN_DRAWER, CLOSE_DRAWER } from '../actions/drawer'

export default function drawer (state = {}, action) {
  switch(action.type) {
    case OPEN_DRAWER:
      return {
        drawerOpen: true,
      }
    case CLOSE_DRAWER:
      return {
        drawerOpen: false,
      }
    default:
      return state
  }
}