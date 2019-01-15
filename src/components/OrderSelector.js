import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Menu,
  Button,
  MenuItem,
} from '@material-ui/core'
import {
  setSortingFieldId,
} from '../actions/sortingListings'

class OrderSelector extends Component {
  state = {
    anchorEl: null,
  }
  componentDidMount() {
    if (!this.props.sortingListings) {
      //this.props.changeListOrder(this.state.orderList[0])
    }
  }
  handleOpen = (e) => {
    this.setState({ anchorEl: e.currentTarget })
  }
  handleClose = () => {
    this.setState({ anchorEl: null })
  }
  handleClick = (item) => {
    this.setState({
      anchorEl: null,
    })
    this.props.setSortingFieldId(item)
  }
  render() {
    const { anchorEl } = this.state
    const { sortingList, selectedSorting } = this.props
    return (
      <div className='align-right'>
        <Button
          color='inherit'
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleOpen}
        >
          Order by: {selectedSorting && selectedSorting.label}
        </Button>
        <Menu id='buttonAnchor' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
          {sortingList && sortingList.map((item, index) => 
            <MenuItem key={index} onClick={() => this.handleClick(item.id)}>{item.label}</MenuItem>
          )}
        </Menu>
      </div>
    )
  }
}

function mapStateToProps ({sortingList, selectedSortingId}) {
  const sortingListArray = Object.values(sortingList)
  const selectedSorting = sortingListArray.filter((item) => item.id === selectedSortingId)[0]
  return {
    sortingList: sortingListArray,
    selectedSorting
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setSortingFieldId: (id) => dispatch(setSortingFieldId(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSelector)