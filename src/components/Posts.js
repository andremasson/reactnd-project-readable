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
    return (
      <Grid container justify='center'>
        <Grid item xs={10} sm={8}>
          {this.props.postsIds.map((id) => (
            <PostElement id={id} key={id}/>
          ))}
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({posts}, props) => {
  const postsArray = Object.values(posts)
  return {
    postsIds: Object.keys(postsArray.sort((a,b) => b.voteScore - a.voteScore)),
    category: props.match.params.category
  }
}

const mapDispatchToProps = dispatch => ({
  handleGetAllPosts: () => dispatch(handleGetAllPosts()),
  handleGetPostsByCategory: category => dispatch(handleGetPostsByCategory(category))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts))