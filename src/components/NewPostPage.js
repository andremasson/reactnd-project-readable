import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  IconButton,
  Grid
} from '@material-ui/core'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { handleNewPost } from '../actions/posts'
import { withStyles } from '@material-ui/core/styles'
import ConfirmationDialog from './ConfirmationDialog'
import PostForm from './PostForm'
import styled from 'styled-components'

const styles = {
  appBar: {
    position: 'fixed',
  },
  flex: {
    flex: 1,
  },
}

const PostAppBar = styled(AppBar)`
  position: fixed;
`

const PostContent = styled(Grid)`
  padding-top: 5em;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
`

class PostPage extends Component {
  state = {
    redirect: false,
    redirectURL: '/',
    hasChanged: false,
    dialogOpen: false
  }
  cancel = () => {
    if (this.state.hasChanged) {
      this.setState({ dialogOpen: true })
    } else {
      this.setState({ redirect: true })
    }
  }
  savePost = (post) => {
    this.props.handleNewPost(post)
    .then(({post}) => {
      this.setState({
        redirect: true,
        redirectURL: `/post/${post.id}`
      })
    })
  }
  formDidChange = () => {
    this.setState({ hasChanged: true })
  }
  handleCancelDialog = () => {
    this.setState({ dialogOpen: false })
  }
  handleOkDialog = () => {
    this.setState({ redirect: true })
    this.setState({ dialogOpen: false })
  }
  render() {
    if (this.state.redirect === true) {
      return <Redirect to={{
        pathname: this.state.redirectURL,
      }} exact />
    }
    return (
      <div>
        <ConfirmationDialog
          openState={this.state.dialogOpen}
          displayMessage='Your changes will be discarted. Confirm?'
          onCancel={() => this.handleCancelDialog()}
          onOk={() => this.handleOkDialog()}
        />
        <PostAppBar className='app-bar'>
          <Toolbar>
            <IconButton aria-label="Close" color='inherit' onClick={this.cancel}>
              <ArrowBack />
            </IconButton>
          </Toolbar>
        </PostAppBar>
        <PostContent container spacing={24} justify='center'>
          <Grid item xs={12} sm={10} md={8}>
            <PostForm
              action='add'
              handleSavePost={this.savePost}
              handleCancel={this.cancel}
              formDidChange={this.formDidChange}
            />
          </Grid>
        </PostContent>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  handleNewPost: post => dispatch(handleNewPost(post))
})

export default withStyles(styles)(withRouter(connect(null, mapDispatchToProps)(PostPage)))