import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import Paper from '@material-ui/core/Paper'
import { Grid, Chip } from '@material-ui/core';
import 'typeface-roboto';

class Post extends Component {
  render() {
    const { post, date } = this.props
    return (
      (post !== null &&
      <Paper>
        <Grid container className='post-item'>
          <Grid item xs={12}>
            <h3>{post.title}</h3>
          </Grid>
          <Grid item xs={6}>
            <p>By {post.author} at {date}</p>
          </Grid>
          <Grid item xs={6} className='align-right'>
            <Chip label={post.category} className='align-right' />
          </Grid>
        </Grid>
      </Paper>
      )
    )
  }
}

const mapStateToProps = ({posts}, {id}) => {
  return {
    post: (posts[id].hideInSearch === true) ? null : posts[id],
    date: formatDate(posts[id].timestamp)
  }
}

export default connect(mapStateToProps)(Post)