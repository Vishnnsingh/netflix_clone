import axios from "axios";
import { getTrailerMovie } from '../redux/movieSlice';
import { OMDB_API_KEY, OMDB_BASE_URL } from '../utils/constant';
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const useMovieById = (movieId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getMovieById = async () => {
            try {
                // Get the OMDb movie data
                const res = await axios.get(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${movieId}&plot=full`);

                if (res.data && res.data.Response === "True") {
                    // Since OMDb doesn't provide trailer info, we'll create a mock trailer object
                    // The key can be any YouTube video ID related to the movie
                    // Here we're using a generic movie trailer - in production you'd need to find relevant trailers
                    const trailerKey = "EXeTwQWrcwY"; // A generic movie trailer

                    dispatch(getTrailerMovie({
                        key: trailerKey,
                        name: res.data.Title,
                        type: "Trailer"
                    }));
                } else {
                    // Set a default trailer
                    dispatch(getTrailerMovie({
                        key: "EXeTwQWrcwY", // Generic trailer
                        name: "Movie Trailer",
                        type: "Trailer"
                    }));
                }
            } catch (error) {
                // Set a default trailer
                dispatch(getTrailerMovie({
                    key: "EXeTwQWrcwY", // Generic trailer
                    name: "Movie Trailer",
                    type: "Trailer"
                }));
            }
        };

        if (movieId) {
            getMovieById();
        }
    }, [movieId, dispatch]);
};

// Keeping default export for backward compatibility
export default useMovieById;