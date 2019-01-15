import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostElement from './PostElement'
import Grid from '@material-ui/core/Grid'
import { withRouter } from 'react-router-dom'
import { handleGetPostsByCategory, handleGetAllPosts } from '../actions/posts'

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
      if (filterByCategory === true) {
        this.props.handleGetPostsByCategory(category)
      } else if (filterByCategory === false) {
        this.props.handleGetAllPosts()
      }
    }
  }
  render() {
    const { posts } = this.props
    console.log('RENDER POSTS: ', posts)
    return (
      <Grid container justify='center'>
        <Grid item xs={10} sm={8}>
          {posts.map((post) => (
            <PostElement post={post} key={post.id}/>
          ))}
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({posts, sortingList, selectedSortingId}, props) => {
  const postsArray = Object.values(posts)
  const sortingListArray = Object.values(sortingList)
  const selectedSorting = sortingListArray.filter((item) => item.id === selectedSortingId)[0]
  const orderedPosts = postsArray.sort((a,b) => b[selectedSorting.field] - a[selectedSorting.field])
  
  return {
    posts: orderedPosts,
    category: props.match.params.category
  }
}

const mapDispatchToProps = dispatch => ({
  handleGetAllPosts: () => dispatch(handleGetAllPosts()),
  handleGetPostsByCategory: category => dispatch(handleGetPostsByCategory(category))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts))