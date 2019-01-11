import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  IconButton,
  Divider,
  Grid,
  GridList,
  GridListTile,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@material-ui/core'
import ArrowBack from '@material-ui/icons/ArrowBack'
import CancelIcon from '@material-ui/icons/Cancel'
import ConfirmIcon from '@material-ui/icons/Send'
import { handleNewPost } from '../actions/posts'
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
    body: '',
    title: '',
    category: '',
    author: '',
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
  savePost = () => {
    this.props.handleNewPost({
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category
    })
    .then(({post}) => {
      this.setState({
        redirect: true,
        redirectURL: `/post/${post.id}`
      })
    })
  }
  handleCancelDialog = () => {
    this.setState({ dialogOpen: false })
  }
  handleOkDialog = () => {
    this.setState({ redirect: true })
    this.setState({ dialogOpen: false })
  }
  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    
    this.setState({
      hasChanged: true,
      [name]: value
    })
  }
  render() {
    const { body, title, category, author } = this.state
    const { categories } = this.props
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
        <AppBar className='app-bar'>
          <Toolbar>
            <IconButton aria-label="Close" color='inherit' onClick={this.cancel}>
              <ArrowBack />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className='container'>
          <form>
            <Grid container spacing={24} className='post-content' direction='column' justify='center'>
              <Grid item xs={12} sm={10} md={8}>
                
                <TextField
                  name='title'
                  label='Title'
                  value={title}
                  onChange={this.handleInputChange}
                />
                <FormControl className='form-control'>
                  <InputLabel htmlFor="category">Category</InputLabel>
                  <Select
                    id='category'
                    name='category'
                    value={category}
                    onChange={this.handleInputChange}
                  >
                    {categories && categories.map((cat) =>
                      <MenuItem key={cat.path} value={cat.path}>{cat.name}</MenuItem>
                    )}
                  </Select>
                </FormControl>
                
                <Divider />
                
                <TextField
                  name='body'
                  label='Body'
                  value={body}
                  onChange={this.handleInputChange}
                />
                
                <Divider />
                
                <TextField
                  name='author'
                  label='Your name'
                  value={author}
                  onChange={this.handleInputChange}
                />
                
                <GridList>
                  <GridListTile>
                    <Button color='primary' variant='contained' onClick={() => this.savePost()}>
                      <ConfirmIcon />Publish
                    </Button>
                  </GridListTile>
                  <GridListTile>
                    <Button color='secondary' variant='contained' onClick={() => this.cancel()}>
                      <CancelIcon />Cancel
                    </Button>
                  </GridListTile>
                </GridList>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({categories}) => {
  return {
    ...categories
  }
}

const mapDispatchToProps = dispatch => ({
  handleNewPost: post => dispatch(handleNewPost(post))
})

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(PostPage)))