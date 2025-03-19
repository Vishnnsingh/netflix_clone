import React from 'react'
import HomeScreen from './HomeScreen'
import AuthScreen from './AuthScreen'
import { userAuthstore } from '../../store/authUser';

const HomePage = () => {
  const {user} = userAuthstore();
  return (
   <>
    {user ? <HomeScreen /> : <AuthScreen />}
   </>
  )
} 

export default HomePage
