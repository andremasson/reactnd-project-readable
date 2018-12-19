import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'

class Posts extends Component {
  render() {
    return (
      <div>
        <h3>Posts</h3>
        <ul>
          {this.props.postsIds.map((id) => (
            <li key={id}>
              <Post id={id} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({posts}) => {
  return {
    postsIds: Object.keys(posts)
  }
}

export default connect(mapStateToProps)(Posts)