import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Grid,
  Paper,
  Button,
  TextField,
  InputBase
} from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import VoteScore from './VoteScore'
import AuthorDisplay from './AuthorDisplay'
import {
  handleUpVoteComment,
  handleDownVoteComment,
  handleDeleteComment,
  handleUpdateComment
} from '../actions/comments'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import ConfirmationDialog from './ConfirmationDialog'
import CancelIcon from '@material-ui/icons/Cancel'
import ConfirmIcon from '@material-ui/icons/Send'

class CommentEdit extends Component {
  state = {
    body: ''
  }
  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    
    this.setState({
      [name]: value
    })
  }
  componentDidMount() {
    this.setState({ body: this.props.comment.body })
  }
  saveComment = (commentBody) => {
    this.props.handleUpdateComment({
      id: this.props.comment.id,
      body: this.state.body
    })
    this.props.cancelEdit()
  }
  render() {
    return (
      <Grid container direction='column'>
        <Grid item>
          <TextField
            name='body'
            label='Comment body'
            value={this.state.body}
            onChange={this.handleInputChange}
          />
        </Grid>
        <Grid item>
          <Button color='primary' onClick={() => this.saveComment()}>
            <ConfirmIcon /> Save changes
          </Button>
          <Button color='secondary' onClick={() => this.props.cancelEdit()}>
            <CancelIcon />Discart changes
          </Button>
        </Grid>
      </Grid>
    )
  }
}

class CommentElement extends Component {
  state = {
    dialogOpen: false,
    isEditing: false,
    commentBody: ''
  }
  onUpVote = () => {
    this.props.handleUpVoteComment(this.props.comment.id)
  }
  onDownVote = () => {
    this.props.handleDownVoteComment(this.props.comment.id)
  }
  deleteComment = () => {
    this.setState({ dialogOpen: true })
  }
  handleCancelDialog = () => {
    this.setState({ dialogOpen: false })
  }
  handleOkDialog = () => {
    this.setState({ dialogOpen: false })
    this.props.handleDeleteComment(this.props.comment.id)
  }
  editComment = () => {
    this.setState({ isEditing: true })
    this.setState({ commentBody: this.props.comment.body })
  }
  cancelEdit = () => {
    this.setState({ isEditing: false })
    this.setState({ commentBody: '' })
  }
  render() {
    const { comment } = this.props
    if (!comment || comment.deleted) {
      return null
    }
    return (
      <div>
        <ConfirmationDialog 
          openState={this.state.dialogOpen}
          displayMessage='Delete this comment?'
          onCancel={() => this.handleCancelDialog()}
          onOk={() => this.handleOkDialog()}
        />
        <Paper className='comment-display'>
          <Grid container>
            <Grid item xs={8}>
              <Grid container direction='column'>
                <Grid item xs={4} sm={12}>
                  <AuthorDisplay name={comment.author} timestamp={comment.timestamp} />
                </Grid>
                <Grid item xs='auto'>
                  {!this.state.isEditing &&
                    <InputBase
                      value={comment.body}
                      fullWidth
                      multiline
                      readOnly
                      className='disabled-text'
                    />
                  }
                  {this.state.isEditing &&
                    <CommentEdit
                      comment={comment}
                      handleUpdateComment={this.props.handleUpdateComment}
                      cancelEdit={() => this.cancelEdit()}
                    />
                  }
                </Grid>
                <Grid item xs={4} sm={12}>              
                  <VoteScore voteScore={comment.voteScore} onUpVote={this.onUpVote} onDownVote={this.onDownVote} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction='column'>
                <Grid item xs={4} sm={12}>
                  {!this.state.isEditing &&
                    <div className='align-right'>
                      <Button onClick={() => this.editComment()}>
                        <EditIcon /> Edit comment
                      </Button>
                      <Button variant='contained' color='secondary' onClick={() => this.deleteComment()}>
                        <DeleteIcon />
                      </Button>
                    </div>
                  }
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}


const mapStateToProps = ({comments}, props) => {
  const comment = Object.values(comments).find((comment) => comment.id === props.id)
  return {
    comment
  }
}

const mapDispatchToProps = dispatch => ({
  handleUpdateComment: comment => dispatch(handleUpdateComment(comment)),
  handleUpVoteComment: id => dispatch(handleUpVoteComment(id)),
  handleDownVoteComment: id => dispatch(handleDownVoteComment(id)),
  handleDeleteComment: id => dispatch(handleDeleteComment(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentElement))