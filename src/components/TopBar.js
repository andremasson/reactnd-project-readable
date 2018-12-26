import React, { Component } from 'react'
import CategoriesList from '../components/Categories'
import { withStyles } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { AppBar, Toolbar, IconButton, Typography, Drawer, Divider } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import classNames from 'classnames'
import Search from './Search'

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

class TopBar extends Component {
  state = {
    open: false
  }
  handleDrawerOpen = () => {
    this.setState({ open: true })
  }
  handleDrawerClose = () => {
    this.setState({ open: false })
  }
  render() {
    const { classes } = this.props
    const { open } = this.state
    return (
      <div>
        <AppBar
          position='fixed'
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color='inherit'
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
              Readable
            </Typography>
            <Search />
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant='temporary'
          anchor='left'
          open={open}
          classes={{paper: classes.drawerPaper}}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
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
}

export default withStyles(topBarStyles)(TopBar)