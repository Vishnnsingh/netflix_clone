import { useEffect } from 'react';
import useNowPlayingMovies from './useNowPlayingMovies';
import usePopularMovies from './usePopularMovies';
import useTopRatedMovies from './useTopRatedMovies';

const useMovieData = () => {
    useEffect(() => {
        // Initialize all API calls
        useNowPlayingMovies();
        usePopularMovies();
        useTopRatedMovies();
    }, []);
};

export default useMovieData; 