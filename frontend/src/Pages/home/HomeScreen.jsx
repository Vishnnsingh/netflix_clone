import React from 'react'
import { userAuthstore } from '../../store/authUser'

const HomeScreen = () => {
  const { logout } = userAuthstore()
  return (
    <div>
      homescreen

      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default HomeScreen
