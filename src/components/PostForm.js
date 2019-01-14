import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
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
import CancelIcon from '@material-ui/icons/Cancel'
import ConfirmIcon from '@material-ui/icons/Send'

class PostForm extends Component {
  state = {
    body: '',
    title: '',
    category: '',
    author: '',
  }
  componentDidMount() {
    if (this.props.action === 'edit') {
      this.setState({
        body: this.props.post.body,
        title: this.props.post.title,
        category: this.props.post.category
      })
    }
  }
  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name

    if (this.props.formDidChange) this.props.formDidChange()

    this.setState({
      [name]: value
    })
  }
  savePost = () => {
    this.props.handleSavePost({
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category
    })
  }
  cancel = () => {
    this.props.handleCancel()
  }
  render() {
    const { body, title, category, author } = this.state
    const { categories, action } = this.props
    return (
      <Grid container spacing={24} direction='column' justify='center'>
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
          {action === 'add' &&
            <TextField
              name='author'
              label='Your name'
              value={author}
              onChange={this.handleInputChange}
            />
          }
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
    )
  }
}

const mapStateToProps = ({categories}) => {
  return {
    ...categories
  }
}

export default connect(mapStateToProps)(PostForm)