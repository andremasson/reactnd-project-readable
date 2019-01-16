import React from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

const AddButton = ({props}) => {
  const handleClick = () => {
    props.history.push('/post/new')
  }
  return (
    <div className='add-button'>
      <Fab color='primary' onClick={handleClick}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default AddButton