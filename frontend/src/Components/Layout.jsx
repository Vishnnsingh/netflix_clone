import React, { Suspense } from 'react'
import { Outlet } from "react-router-dom"
import Footer from './Footer'
import { Toaster } from 'react-hot-toast'
import { Loader } from 'lucide-react'
const Layout = () => {
  return (
   <>
    	{/* <Suspense fallback={<LoadingScreen />}>
				<Outlet />
			</Suspense> */}
      <Outlet />
    <Footer />
    <Toaster />
   </>
  )
}
// Loading Fallback Component
const LoadingScreen = () => (
	<div className="h-screen flex justify-center items-center bg-black">
		<Loader className="animate-spin text-red-600 size-10" />
	</div>
);
export default Layout
