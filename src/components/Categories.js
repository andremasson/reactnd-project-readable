import React, { Component } from 'react'
import { connect } from 'react-redux'

class Categories extends Component {
  render() {
    const { categories } = this.props
    return (
      <div>
        <h3>Categories</h3>
        <ul>
          {categories && categories.map(cat => <li key={cat.path}>{cat.name}</li>)}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({categories}) => {
  return {
    ...categories
  }
}

export default connect(mapStateToProps)(Categories)