import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'

class ConfirmationDialog extends Component {
  static propTypes = {
    openState: PropTypes.bool.isRequired,
    title: PropTypes.string,
    displayMessage: PropTypes.string,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
  }
  render() {
    const { openState, onOk, onCancel, displayMessage, title} = this.props
    return (
      <Dialog open={openState} onClose={onCancel} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
        {(title === undefined) ? '' : title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          {(displayMessage === undefined) ? 'Are you sure?' : displayMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            NO
          </Button>
          <Button onClick={onOk} color="primary">
            YES
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default ConfirmationDialog