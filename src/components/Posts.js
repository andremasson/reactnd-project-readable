import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostElement from './PostElement'
import Grid from '@material-ui/core/Grid'
import { withRouter } from 'react-router-dom'
import { handleGetPostsByCategory, handleGetAllPosts } from '../actions/posts'
import { setFilter } from '../actions/filter'

class Posts extends Component {
  state = {
    previousCategory: ''
  }
  componentDidMount() {
    this.props.handleGetAllPosts()
  }
  componentDidUpdate() {
    const { category, filterByCategory } = this.props
    if (category !== this.state.previousCategory) {
      this.setState({ previousCategory: category })
      if (filterByCategory === undefined || filterByCategory === false) {
        this.props.handleGetAllPosts()
      } else {
        this.props.handleGetPostsByCategory(category)
      }
      if (!category || category === undefined) {
        this.props.setFilter('')
      } else {
        this.props.setFilter(category)
      }
    }
  }
  render() {
    const { posts } = this.props
    return (
      <Grid container justify='center'>
        <Grid item xs={10} sm={8}>
          {posts && posts.map((post) => (
            <PostElement post={post} key={post.id}/>
          ))}
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({posts, sortingList, selectedSortingId}, props) => {
  const selectedSorting = sortingList.filter((item) => item.id === selectedSortingId)[0]
  return {
    posts: [...posts].sort((a,b) => b[selectedSorting.field] - a[selectedSorting.field]),
    category: props.match.params.category
  }
}

const mapDispatchToProps = dispatch => ({
  handleGetAllPosts: () => dispatch(handleGetAllPosts()),
  handleGetPostsByCategory: category => dispatch(handleGetPostsByCategory(category)),
  setFilter: filter => dispatch(setFilter(filter))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts))