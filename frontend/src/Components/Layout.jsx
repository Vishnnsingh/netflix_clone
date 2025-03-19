import React from 'react'
import { Outlet } from "react-router-dom"
import Footer from './Footer'
import { Toaster } from 'react-hot-toast'
// import { Loader } from 'lucide-react'

const Layout = () => {
  return (
   <>
    <Outlet />
    <Footer />
    <Toaster />
  
   </>
  )
}
export default Layout
