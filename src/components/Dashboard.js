import React from 'react'
import Posts from '../components/Posts'
import AddButton from '../components/AddButton'
import TopBar from './TopBar';

const Dashboard = (props) => {
  return (
    <div>
      <TopBar />
      <Posts {...props} />
      <AddButton props={props} />
    </div>
  )
}

export default Dashboard