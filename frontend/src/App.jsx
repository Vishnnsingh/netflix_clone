import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import Layout from "./Components/Layout"
import HomePage from "./Pages/home/HomePage"
import LoginPage from "./Pages/LoginPage"
import SignupPage from "./Pages/SignupPage"
import { userAuthstore } from "./store/authUser"
import {  useEffect } from "react"
import Browse from './Components/Browse'
import SearchResults from './Components/SearchResults'
// import ErrorBoundary from './Components/ErrorBoundary'
import MovieDetails from './Components/MovieDetails'
// import ProtectedRoute from './Components/ProtectedRoute'
import TVShows from './Components/TVShows'
import Movies from './Components/Movies'
import NewAndPopular from './Components/NewAndPopular'
import MyList from './Components/MyList'
// import { Children } from "react"


const AppRouter = (user) => 
   createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage />},
        { path: "/login", element: !user ? <LoginPage /> : <Navigate to="/"  />},
        { path: "/signup", element: !user ? <SignupPage /> : <Navigate to="/"   />},
        { path: "/home", element: !user ? <Browse /> : <Navigate to="/"   />},
        { path: "/browse/:movieId", element: !user ? <MovieDetails /> : <Navigate to="/"   />},
        { path: "/search", element: !user ? <SearchResults /> : <Navigate to="/"   />},
        { path: "/tv-shows", element: !user ? <TVShows /> : <Navigate to="/"   />},
        { path: "/movies", element: !user ? <Movies /> : <Navigate to="/"   />},
        { path: "/new-and-popular", element: !user ? <NewAndPopular /> : <Navigate to="/"   />},
        { path: "/my-list", element: !user ? <MyList /> : <Navigate to="/"   />},
        
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
