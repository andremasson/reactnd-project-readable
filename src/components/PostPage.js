import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  IconButton,
  Divider,
  Grid,
  Typography,
  GridList,
  GridListTile,
  Chip,
  Button,
  InputBase
} from '@material-ui/core'
import ArrowBack from '@material-ui/icons/ArrowBack'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import {
  handleGetPost,
  handleDeletePost,
  handleUpVotePost,
  handleDownVotePost,
  handleUpdatePost
} from '../actions/posts'
import { handleGetComments } from '../actions/comments'
import CommentList from './CommentList'
import AuthorDisplay from './AuthorDisplay'
import VoteScore from './VoteScore'
import { withStyles } from '@material-ui/core/styles'
import ConfirmationDialog from './ConfirmationDialog'
import NewComment from './NewComment'
import PostForm from './PostForm'

const styles = {
  appBar: {
    position: 'fixed',
  },
  flex: {
    flex: 1,
  },
}

class PostPage extends Component {
  state = {
    redirect: false,
    redirectURL: '/',
    dialogOpen: false,
    isEditing: false
  }
  componentDidMount() {
    this.props.handleGetPost(this.props.id)
    this.props.handleGetComments(this.props.id)
  }
  handleClickBack = () => {
    this.setState({ redirect: true })
  }
  onUpVote = () => {
    this.props.handleUpVotePost(this.props.id)
  }
  onDownVote = () => {
    this.props.handleDownVotePost(this.props.id)
  }
  deletePost = () => {
    this.setState({ dialogOpen: true })
  }
  editPost = () => {
    this.setState({ isEditing: true })
  }
  savePost = (post) => {
    this.props.handleUpdatePost({
      ...post,
      id: this.props.post.id,
      author: this.props.post.author
    })
    this.setState({ isEditing: false })
  }
  cancelEditPost = () => {
    this.setState({ isEditing: false })
  }
  handleCancelDialog = () => {
    this.setState({ dialogOpen: false })
  }
  handleOkDialog = () => {
    this.setState({ dialogOpen: false })
    this.setState({redirect: true})
    this.props.handleDeletePost(this.props.id)
  }
  render() {
    const { post } = this.props
    if (this.state.redirect === true) {
      return <Redirect to={{
        pathname: this.state.redirectURL,
      }} exact />
    }
    if (!post || post.length === 0) {
      return <h6>Carregando...</h6>
    }
    if (!post.id) {
      return <h6>This post doesn't exist. Sorry...</h6>
    }
    return (
      <div>
        <ConfirmationDialog 
          openState={this.state.dialogOpen}
          displayMessage='Delete this post?'
          onCancel={() => this.handleCancelDialog()}
          onOk={() => this.handleOkDialog()}
        />
        <AppBar className='app-bar'>
          <Toolbar>
            <IconButton aria-label="Close" color='inherit' onClick={this.handleClickBack}>
              <ArrowBack />
            </IconButton>
            <div className='align-right'>
              {!this.state.isEditing &&
                <Button color='inherit' onClick={() => this.editPost()}>
                  <EditIcon /> Edit post
                </Button>
              }
            </div>
          </Toolbar>
        </AppBar>
        
        <Grid container spacing={24} className='post-content' justify='center'>
          <Grid item xs={12} sm={10} md={8}>
            {this.state.isEditing &&
              <PostForm
                action='edit'
                handleSavePost={this.savePost}
                handleCancel={this.cancelEditPost}
                post={post}
              />
            }
            {!this.state.isEditing &&
              <div>
                <Typography variant="h4" gutterBottom className='post-title'>
                  {post.title}
                  <Chip label={post.category} variant="outlined" className='category-chip' />
                </Typography>
                <Divider />
                <InputBase
                  value={post.body}
                  fullWidth
                  multiline
                  readOnly
                />
                <Divider />
                <GridList>
                  <GridListTile>
                    <AuthorDisplay name={post.author} timestamp={post.timestamp} />
                  </GridListTile>
                  <GridListTile>
                    <VoteScore voteScore={post.voteScore} onUpVote={this.onUpVote} onDownVote={this.onDownVote}/>
                  </GridListTile>
                </GridList>
              </div>
            }
          </Grid>
          <Grid item xs={12} sm={10} md={6} className='align-center'>
            <NewComment postId={post.id} />
          </Grid>
          <Grid item xs={12} sm={10} md={8}>
            <CommentList />
          </Grid>
          <Grid item xs={12} sm={10} md={8} className='align-center'>
            <Button variant='contained' color='secondary' onClick={() => this.deletePost()} >
              Delete this post
              <DeleteIcon />
            </Button>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = ({currentPost}, props) => {  
  const { id } = props.match.params
  return {
    post: currentPost,
    id
  }
}

const mapDispatchToProps = dispatch => ({
  handleGetPost: comment => dispatch(handleGetPost(comment)),
  handleGetComments: id => dispatch(handleGetComments(id)),
  handleUpVotePost: id => dispatch(handleUpVotePost(id)),
  handleDownVotePost: id => dispatch(handleDownVotePost(id)),
  handleDeletePost: id => dispatch(handleDeletePost(id)),
  handleUpdatePost: post => dispatch(handleUpdatePost(post))
})

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(PostPage)))