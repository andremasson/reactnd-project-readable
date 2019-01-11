import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import '../App.css';


class AddButton extends Component {
  clicar = () => {
    this.props.history.push('/post/new')
  }
  render() {
    return (
      <div className='add-button'>
        <Fab color='primary' onClick={() => this.clicar()}>
          <AddIcon />
        </Fab>
      </div>
    )
  }
}

export default withRouter(AddButton)