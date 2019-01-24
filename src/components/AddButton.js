import React from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import styled from 'styled-components'

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 2em;
  right: 1em;
`

const AddButton = ({props}) => {
  const handleClick = () => {
    props.history.push('/post/new')
  }
  return (
    <ButtonWrapper>
      <Fab color='primary' onClick={handleClick}>
        <AddIcon />
      </Fab>
    </ButtonWrapper>
  )
}

export default AddButton