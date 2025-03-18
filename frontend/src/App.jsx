import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import Layout from "./Components/Layout"
import HomePage from "./Pages/home/HomePage"
import LoginPage from "./Pages/LoginPage"
import SignupPage from "./Pages/SignupPage"
import { userAuthstore } from "./store/authUser"
import {  useEffect } from "react"
// import { Children } from "react"


const AppRouter = (user) => 
   createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage />},
        { path: "/login", element: !user ? <LoginPage /> : <Navigate to="/"  />},
        { path: "/signup", element: !user ? <SignupPage /> : <Navigate to="/"   />}
      ]
    },
   
  ])
function App() {
   
  const { user,isCheckingAuth, authCheck } = userAuthstore();
  console.log("auth user is here:", user);

 
	// // Optimize authentication check
	// const checkAuth = useCallback(() => {
	// 	authCheck();
	// }, [authCheck]);

	useEffect(() => {
		authCheck();
	}, [authCheck]);

  if (isCheckingAuth) return <Layout />; // Show Layout with Loader
  return (

   <RouterProvider router={AppRouter()} />
  
  )
}

export default App
