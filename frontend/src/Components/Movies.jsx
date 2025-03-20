import React, { useEffect } from 'react';
import Header from './Header';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';
import { mockMovies } from '../utils/mockData';
import Footer from './Footer';
import { FaSpinner } from 'react-icons/fa';
import { usePopularMovies } from '../hooks/usePopularMovies';
import { useTopRatedMovies } from '../hooks/useTopRatedMovies';
import { useNowPlayingMovies } from '../hooks/useNowPlayingMovies';

const Movies = () => {
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

    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Show loading spinner during initial load
    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center">
                <FaSpinner className="animate-spin text-red-600 text-5xl mb-4" />
                <p className="text-white text-xl">Loading movies for you...</p>
            </div>
        );
    }

    return (
        <div className="relative bg-black min-h-screen">
            <Header />

            {/* Hero Banner */}
            <div className="w-full h-[80vh] relative">
                <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
                <img
                    src="https://wallpaperaccess.com/full/329617.jpg"
                    alt="Movies Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-1/2 left-12 transform -translate-y-1/2 z-20 max-w-xl text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Movies</h1>
                    <p className="text-lg md:text-xl mb-6">
                        Explore our vast collection of movies from blockbuster hits to indie gems and everything in between.
                    </p>
                </div>
            </div>

            {/* Movie Lists */}
            <div className="relative z-10 pb-16 -mt-20">
                <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-8 md:space-y-12">
                    <MovieList title="Now Playing" movies={nowPlayingMovies} />
                   <MovieList title="Popular on Netflix" movies={popularMovies} />
                   <MovieList title="Rated on Netflix" movies={topRatedMovies} />
                    </div>
                </div>
            </div>

           
        </div>
    );
};

export default Movies; 