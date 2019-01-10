import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  TextField,
  Button
} from '@material-ui/core'
import CommentIcon from '@material-ui/icons/Comment'
import { handleNewComment } from '../actions/comments'

class NewComment extends Component {
  state = {
    formOpen: false,
    commentBody: '',
    commentAuthor: ''
  }
  openForm = () => {
    this.setState({ formOpen: true })
  }
  cancel = () => {
    this.setState({ formOpen: false })
  }
  saveComment = () => {
    this.props.dispatch(handleNewComment(
      this.props.dispatch,
      this.state.commentBody,
      this.state.commentAuthor,
      this.props.postId
    ))
    this.setState({
      commentBody: '',
      commentAuthor: '',
      formOpen: false
    })
  }
  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    
    this.setState({
      [name]: value
    })
  }
  render() {
    const { commentBody, commentAuthor } = this.state
    
    return (
      <div>
        {!this.state.formOpen && 
          <Button color='primary' onClick={() => this.openForm()}>
            Write a new comment
            <CommentIcon />
          </Button>
        }
        {this.state.formOpen &&
          <div>
            <form>
              <TextField
                name='commentBody'
                label='Comment'
                value={commentBody}
                onChange={this.handleInputChange}
              />
              <TextField
                name='commentAuthor'
                label='Your name'
                value={commentAuthor}
                onChange={this.handleInputChange}
              />
            </form>
            <Button color='primary' onClick={() => this.saveComment()}>
              Publish
            </Button>
            <Button color='secondary' onClick={() => this.cancel()}>
              Cancel
            </Button>
          </div>
        }
      </div>
    )
  }
}

export default connect()(NewComment)