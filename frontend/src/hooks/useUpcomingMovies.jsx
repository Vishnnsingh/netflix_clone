import axios from "axios";
import { getUpcomingMovie } from "../redux/movieSlice";
import { OMDB_API_KEY, OMDB_BASE_URL, OMDB_CATEGORIES } from '../utils/constant';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { mockMovies } from "../utils/mockData";

export const useUpcomingMovies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Fetch multiple movies from OMDb to create a collection
                const upcomingMovies = [];
                let fetchSuccess = false;

                // Fetch movies based on upcoming search terms
                for (const searchTerm of OMDB_CATEGORIES.upcoming) {
                    try {
                        // Add a small delay between requests to avoid rate limiting
                        if (upcomingMovies.length > 0) {
                            await new Promise(resolve => setTimeout(resolve, 300));
                        }

                        const res = await axios.get(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${searchTerm}&type=movie&y=2023`, {
                            timeout: 5000 // 5 second timeout
                        });

                        if (res.data && res.data.Response === "True" && res.data.Search) {
                            // Map OMDb response to match our expected format
                            const movies = res.data.Search.map((movie, index) => ({
                                id: movie.imdbID || `upcoming-${index}`,
                                title: movie.Title,
                                poster_path: movie.Poster !== "N/A" ? movie.Poster : null,
                                overview: `${movie.Title} (${movie.Year})`, // OMDb search doesn't include plot
                                year: movie.Year
                            }));

                            upcomingMovies.push(...movies);
                            fetchSuccess = true;
                        }
                    } catch (searchError) {
                        // Continue with next search term
                    }
                }

                if (upcomingMovies.length > 0) {
                    dispatch(getUpcomingMovie(upcomingMovies));
                } else {
                    dispatch(getUpcomingMovie(mockMovies.upcomingMovies));
                }
            } catch (error) {
                dispatch(getUpcomingMovie(mockMovies.upcomingMovies));
            }
        };

        fetchMovies();
    }, [dispatch]);
};

// Keeping default export for backward compatibility
export default useUpcomingMovies;