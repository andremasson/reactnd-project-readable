import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import Grid from '@material-ui/core/Grid'

class Posts extends Component {
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

const mapStateToProps = ({posts}) => {
  return {
    postsIds: Object.keys(posts)
  }
}

export default connect(mapStateToProps)(Posts)