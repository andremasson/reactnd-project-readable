import React from 'react'
import CategoriesList from '../components/Categories'
import { withStyles } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { AppBar, Toolbar, IconButton, Typography, Drawer, Divider } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import classNames from 'classnames'
import Search from './Search'
import { connect } from 'react-redux'
import { openDrawer, closeDrawer } from '../actions/drawer'
import OrderSelector from './OrderSelector'

const drawerWidth = 240

const topBarStyles = theme => ({
  paper: {
    color: theme.palette.text.secondary
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
})

const TopBar = (props) => {
  const handleDrawerOpen = () => {
    props.openDrawer()
  }
  const handleDrawerClose = () => {
    props.closeDrawer()
  }
    const { classes, drawerOpen } = props
    return (
      <div>
        <AppBar
          position='fixed'
          className={classNames(classes.appBar, {
            [classes.appBarShift]: drawerOpen,
          })}
        >
          <Toolbar disableGutters={!drawerOpen}>
            <IconButton
              color='inherit'
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, drawerOpen && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
              Readable
            </Typography>
            <OrderSelector />
            <Search />
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant='temporary'
          anchor='left'
          open={drawerOpen}
          classes={{paper: classes.drawerPaper}}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />

          <CategoriesList />
        </Drawer>
        <div className={classes.drawerHeader} />
      </div>
    )
}

function mapStateToProps ({drawer}) {
  const { drawerOpen } = drawer
  return {
    drawerOpen
  }
}

function mapDispatchToProps (dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    closeDrawer: () => dispatch(closeDrawer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(topBarStyles)(TopBar))