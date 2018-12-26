import React from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import '../App.css';

const clicar = () => {
  alert('clicou')
}

const AddButton = () => {
  return (
    <div className='add-button'>
      <Fab color='primary'>
        <AddIcon onClick={() => clicar()}/>
      </Fab>
    </div>
  )
}

export default AddButton