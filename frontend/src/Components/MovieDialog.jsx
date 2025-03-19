import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setOpen } from '../redux/movieSlice';
import { useMovieById } from '../hooks/useMovieById';

const MovieDialog = () => {
    const dispatch = useDispatch();
    const { open, movieId, trailerMovie } = useSelector(store => store.movie);

    // Use the hook properly
    useMovieById(movieId);

    // Handle dialog close
    const handleClose = () => {
        dispatch(setOpen(false));
    };

    // If dialog is not open or no trailer available, don't render
    if (!open || !trailerMovie) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
            <div className="relative w-3/4 h-3/4 max-w-4xl">
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-2 z-10"
                >
                    X
                </button>

                <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${trailerMovie.key}?autoplay=1`}
                    title="Movie Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default MovieDialog; 