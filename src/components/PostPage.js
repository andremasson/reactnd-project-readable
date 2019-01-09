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
  Button
} from '@material-ui/core'
import ArrowBack from '@material-ui/icons/ArrowBack'
import DeleteIcon from '@material-ui/icons/Delete'
import { handleGetPost, handleDeletePost, handleUpVotePost, handleDownVotePost } from '../actions/posts'
import { handleGetComments } from '../actions/comments'
import CommentList from './CommentList'
import AuthorDisplay from './AuthorDisplay'
import VoteScore from './VoteScore'
import { withStyles } from '@material-ui/core/styles'
import ConfirmationDialog from './ConfirmationDialog'

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
    dialogOpen: false
  }
  componentDidMount() {
    this.props.dispatch(handleGetPost(this.props.dispatch, this.props.id))
    this.props.dispatch(handleGetComments(this.props.dispatch, this.props.id))
  }
  handleClickBack = () => {
    this.setState({ redirect: true })
  }
  onUpVote = () => {
    this.props.dispatch(handleUpVotePost(this.props.dispatch, this.props.id))
  }
  onDownVote = () => {
    this.props.dispatch(handleDownVotePost(this.props.dispatch, this.props.id))
  }
  deletePost = () => {
    this.setState({ dialogOpen: true })
  }
  handleCancelDialog = () => {
    this.setState({ dialogOpen: false })
  }
  handleOkDialog = () => {
    this.setState({ dialogOpen: false })
    this.setState({redirect: true})
    this.props.dispatch(handleDeletePost(this.props.dispatch, this.props.id))
  }
  render() {
    const { post } = this.props
    console.log('POST AQUI: ', post)
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
          </Toolbar>
        </AppBar>
        <div className='container'>

        <Grid container spacing={24} className='post-content' direction='column' justify='center'>
          <Grid item xs={12} sm={10} md={8}>
            <Typography variant="h4" gutterBottom className='post-title'>
              {post.title}
              <Chip label={post.category} variant="outlined" className='category-chip' />
            </Typography>
            <Divider />
            <Typography variant="body1" gutterBottom className='post-body'>
              {post.body}
            </Typography>
            <Divider />
            <GridList>
              <GridListTile>
                <AuthorDisplay name={post.author} timestamp={post.timestamp} />
              </GridListTile>
              <GridListTile>
                <VoteScore voteScore={post.voteScore} onUpVote={this.onUpVote} onDownVote={this.onDownVote} />
              </GridListTile>
            </GridList>
          </Grid>
          <Grid item xs={12} sm={10} md={8}>
            <CommentList />
          </Grid>
          <Grid item xs={12} sm={10} md={8}>
            <Button variant='contained' color='secondary' onClick={() => this.deletePost()}>
              Delete this post
              <DeleteIcon />
            </Button>
          </Grid>
        </Grid>
        </div>
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

export default withStyles(styles)(withRouter(connect(mapStateToProps)(PostPage)))