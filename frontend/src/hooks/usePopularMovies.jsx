import axios from "axios";
import { getPopularMovie } from '../redux/movieSlice';
import { OMDB_API_KEY, OMDB_BASE_URL, OMDB_CATEGORIES } from '../utils/constant';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { mockMovies } from "../utils/mockData";

export const usePopularMovies = () => {
    const dispatch = useDispatch();
    const existingMovies = useSelector(state => state.movie?.popularMovies);

    useEffect(() => {
        // Skip fetching if we already have movies in the store
        if (existingMovies && existingMovies.length > 0) {
            return;
        }

        const fetchMovies = async () => {
            try {
                // Fetch multiple movies from OMDb to create a collection
                const popularMovies = [];
                let fetchSuccess = false;

                // Fetch movies based on popular search terms
                for (const searchTerm of OMDB_CATEGORIES.popular) {
                    try {
                        // Add a small delay between requests to avoid rate limiting
                        if (popularMovies.length > 0) {
                            await new Promise(resolve => setTimeout(resolve, 300));
                        }

                        const res = await axios.get(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${searchTerm}&type=movie`, {
                            timeout: 5000 // 5 second timeout
                        });

                        if (res.data && res.data.Response === "True" && res.data.Search) {
                            // Map OMDb response to match our expected format
                            const movies = res.data.Search.map((movie, index) => ({
                                id: movie.imdbID || `popular-${index}`,
                                title: movie.Title,
                                poster_path: movie.Poster !== "N/A" ? movie.Poster : null,
                                overview: `${movie.Title} (${movie.Year})`, // OMDb search doesn't include plot
                                year: movie.Year
                            }));

                            popularMovies.push(...movies);
                            fetchSuccess = true;
                        }
                    } catch (searchError) {
                        // Continue with next search term
                    }
                }

                if (popularMovies.length > 0) {
                    dispatch(getPopularMovie(popularMovies));
                } else {
                    dispatch(getPopularMovie(mockMovies.popularMovies));
                }
            } catch (error) {
                // Use mock data when API fails
                dispatch(getPopularMovie(mockMovies.popularMovies));
            }
        };

        fetchMovies();
    }, [dispatch, existingMovies]);
};

// Keeping default export for backward compatibility
export default usePopularMovies;