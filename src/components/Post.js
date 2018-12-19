import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'

class Post extends Component {
  render() {
    const { post, date } = this.props
    console.log (post)
    return (
      <div>
        <h4>{post.title}</h4>
        <h5>{post.category}</h5>
        <h6>By {post.author} at {date}</h6>
      </div>
    )
  }
}

const mapStateToProps = ({posts}, {id}) => {
  return {
    post: posts[id],
    date: formatDate(posts[id].timestamp)
  }
}

export default connect(mapStateToProps)(Post)