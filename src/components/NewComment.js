import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  TextField,
  Button,
  Grid,
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
    if (this.state.commentBody.length === 0 ||this.state.commentAuthor.length === 0)
      return
    this.props.handleNewComment({
      body: this.state.commentBody,
      author: this.state.commentAuthor,
      parentId: this.props.postId
    })
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
        {this.state.formOpen && 
          <div>
            <Grid container direction='column'>
              <Grid item>
                <TextField
                  name='commentBody'
                  label='Comment'
                  value={commentBody}
                  fullWidth
                  multiline
                  rows={4}
                  onChange={this.handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  name='commentAuthor'
                  label='Your name'
                  value={commentAuthor}
                  onChange={this.handleInputChange}
                />
              </Grid>
              <Grid item>
                <Button color='primary' onClick={() => this.saveComment()}>
                  Publish
                </Button>
                <Button color='secondary' onClick={() => this.cancel()}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
            
          </div>
        }
        {!this.state.formOpen &&
          <Button color='primary' onClick={() => this.openForm()}>
            Write a new comment
            <CommentIcon />
          </Button>
        }
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  handleNewComment: comment => dispatch(handleNewComment(comment))
})

export default connect(null, mapDispatchToProps)(NewComment)