import React, { Component } from 'react'
import { InputBase } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { connect } from 'react-redux'
import { searchPosts } from '../actions/posts'

const searchBarStyle = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class Search extends Component {
  onChange = (query) => {
    const { searchPosts, posts } = this.props
    if (query.trim().length === 0) {
    }
    searchPosts(posts, query)
  }
  render() {
    const { classes } = this.props
    return (
      <div className='align-right'>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search for title…"
            onChange={(e) => this.onChange(e.target.value)}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({posts}) => {
  return {
    posts,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchPosts: (posts, query) => dispatch(searchPosts(posts, query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(searchBarStyle)(Search))