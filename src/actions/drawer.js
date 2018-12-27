export const OPEN_DRAWER = 'OPEN_DRAWER'
export const CLOSE_DRAWER = 'CLOSE_DRAWER'

export const openDrawer = (drawerOpen) => ({ type: OPEN_DRAWER, drawerOpen })
export const closeDrawer = (drawerOpen) => ({ type: CLOSE_DRAWER, drawerOpen })