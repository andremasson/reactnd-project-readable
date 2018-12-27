import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import Grid from '@material-ui/core/Grid'
import { withRouter } from 'react-router-dom'
import { handleGetPostsByCategory, handleGetAllPosts } from '../actions/posts'

class Posts extends Component {
  state = {
    previousCategory: ''
  }
  componentDidUpdate() {
    const { category, filterByCategory } = this.props
    if (this.props.category !== this.state.previousCategory) {
      this.setState({ previousCategory: this.props.category })
      if (filterByCategory) {
        this.props.dispatch(handleGetPostsByCategory(this.props.dispatch, category))
      } else {
        this.props.dispatch(handleGetAllPosts())
      }
    }
  }
  render() {
    return (
      <Grid container justify='center'>
        <Grid item xs={10} sm={8}>
          {this.props.postsIds.map((id) => (
            <Post id={id} key={id}/>
          ))}
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({posts}, props) => {
  return {
    postsIds: Object.keys(posts),
    category: props.match.params.category
  }
}

export default withRouter(connect(mapStateToProps)(Posts))