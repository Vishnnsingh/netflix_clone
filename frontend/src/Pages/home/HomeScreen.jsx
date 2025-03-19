import React, { useEffect, useState } from 'react'
import { userAuthstore } from '../../store/authUser'
import TrailerModal from '../../Components/TrailerModal'
import useNowPlayingMovies from '../../hooks/useNowPlayingMovies'
import VideoBackground from '../../Components/VideoBackground'
import { IoPlay } from 'react-icons/io5'
import { BiInfoCircle } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { FaSpinner } from 'react-icons/fa'
import Header from '../../Components/Header'
// import Header from '../../Components/Header'
// console.log(Header);
// import Navbar from '../../Components/Navbar'

const HomeScreen = () => {
  const { logout } = userAuthstore()

  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  useNowPlayingMovies();

  useEffect(() => {
      // Fetch featured movie data
      
      const fetchFeaturedMovie = async () => {
          try {
              setLoading(true);
              const response = await fetch('./mock/featuredMovie.json');
              const data = await response.json();
              setFeaturedMovie(data);
          } catch (error) {
              console.error('Error fetching featured movie:', error);
              // Fallback to a predefined featured movie
              setFeaturedMovie({
                  id: "tt0111161",
                  title: "The Shawshank Redemption",
                  overview: "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
                  release_date: "1994-09-23"
              });
          } finally {
              setLoading(false);
          }
      };

      fetchFeaturedMovie();
  }, []);

  // Handle play button click
  const handlePlayClick = (e) => {
      e.preventDefault(); // Prevent navigation
      setShowTrailer(true);
  };

  // Close trailer modal
  const closeTrailer = () => {
      setShowTrailer(false);
  };

  if (loading || !featuredMovie) {
      return (
          <div className="relative h-screen bg-gradient-to-b from-black">
              <Header />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <FaSpinner className="animate-spin text-red-600 text-5xl mb-4" />
                  <p className="text-white text-xl">Loading featured content...</p>
              </div>
          </div>
      );
  }
  return (
    // <div>
    //   homescreen
                 
    //   <button onClick={logout}>Logout</button>
    // </div>

    <div className="relative">
            <Header />
            <div className="relative h-screen">
                {/* Video will play in background */}
                <VideoBackground movieId={featuredMovie.id} bool={true} />

                {/* Gradient overlays for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                {/* Content overlay */}
                <div className="absolute inset-0 flex items-center px-4 sm:px-12">
                    <div className="w-full md:w-2/3 lg:w-1/2 max-w-2xl">
                        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 drop-shadow-lg">
                            {featuredMovie.title}
                        </h1>
                        <div className="flex items-center text-gray-300 text-sm sm:text-base mb-2 sm:mb-4">
                            <span className="mr-3">{featuredMovie.release_date?.substring(0, 4)}</span>
                            <span className="mr-3 border px-1 text-xs">PG-13</span>
                            <span>2h 22m</span>
                        </div>
                        <p className="text-white text-sm sm:text-base md:text-lg mb-4 sm:mb-6 line-clamp-3 drop-shadow-lg max-w-xl">
                            {featuredMovie.overview}
                        </p>
                        <div className="flex flex-wrap gap-3 sm:gap-4">
                            <button
                                onClick={handlePlayClick}
                                className="flex items-center justify-center bg-white text-black py-1.5 sm:py-2 px-4 sm:px-6 rounded-md font-bold hover:bg-opacity-80 transition-colors text-sm sm:text-base"
                            >
                                <IoPlay className="mr-2 text-lg sm:text-xl" /> Play
                            </button>
                            <Link
                                to={"/browse/" + featuredMovie.id}
                                className="flex items-center justify-center bg-gray-600 bg-opacity-70 text-white py-1.5 sm:py-2 px-4 sm:px-6 rounded-md font-bold hover:bg-opacity-90 transition-colors text-sm sm:text-base"
                            >
                                <BiInfoCircle className="mr-2 text-lg sm:text-xl" /> More Info
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom fade for smooth transition to content */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
            </div>

            {/* Trailer Modal */}
            {showTrailer && (
                <TrailerModal
                    movieId={featuredMovie.id}
                    title={featuredMovie.title}
                    onClose={closeTrailer}
                />
            )}
        </div>
  )
}

export default HomeScreen
