import React, { useEffect, useState } from 'react';
import Header from './Header';
import MovieList from './MovieList';
import { usePopularMovies } from '../hooks/usePopularMovies';
import { useTopRatedMovies } from '../hooks/useTopRatedMovies';
import { useNowPlayingMovies } from '../hooks/useNowPlayingMovies';
import { useSelector } from 'react-redux';
import { mockMovies } from '../utils/mockData';
import { FaSpinner } from 'react-icons/fa';
import HomeScreen from '../Pages/home/HomeScreen';

const Browse = () => {
  const [initialLoading, setInitialLoading] = useState(true);

  // Initialize all hooks to fetch movie data
  usePopularMovies();
  useTopRatedMovies();
  useNowPlayingMovies();

  // Get movies from Redux store with fallback to mock data
  const popularMovies = useSelector(store => store.movie?.popularMovies) || mockMovies.popularMovies;
  const topRatedMovies = useSelector(store => store.movie?.topRatedMovies) || mockMovies.topRatedMovies;
  const nowPlayingMovies = useSelector(store => store.movie?.nowPlayingMovies) || mockMovies.nowPlayingMovies;

  // Check if data is still loading
  const isLoading = !popularMovies || !topRatedMovies || !nowPlayingMovies;

  // Scroll to top on component mount and set initial loading state
  useEffect(() => {
    window.scrollTo(0, 0);

    // Simulate initial loading for better UX
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Show loading spinner during initial load
  if (initialLoading || isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <FaSpinner className="animate-spin text-red-600 text-5xl mb-4" />
        <p className="text-white text-xl">Loading amazing content for you...</p>
      </div>
    );
  }

  return (
    <div className="relative bg-black min-h-screen">
      {/* Header is included in MainContainer */}

      {/* Hero section with video background */}
      <HomeScreen />

      {/* Movie Lists Section */}
      <div className="-mt-52 relative z-10 pb-16">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 md:space-y-12">
            <MovieList title="Popular on Netflix" movies={popularMovies} />
            <MovieList title="Top Rated" movies={topRatedMovies} />
            <MovieList title="Now Playing" movies={nowPlayingMovies} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
