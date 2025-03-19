import React, { useState } from 'react'
import { useMovieById } from '../hooks/useMovieById';
import { useSelector } from "react-redux";
import { FaSpinner } from 'react-icons/fa';

const VideoBackground = ({ movieId, bool }) => {
    const trailerMovie = useSelector(store => store.movie.trailerMovie);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useMovieById(movieId);

    const handleIframeLoad = () => {
        setLoading(false);
    };

    const handleIframeError = () => {
        setLoading(false);
        setError(true);
    };

    return (
        <div className='w-full h-full overflow-hidden relative'>
            {/* Loading indicator */}
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <FaSpinner className="animate-spin text-red-600 text-4xl" />
                </div>
            )}

            {/* Error fallback */}
            {error && (
                <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
                    <p className="text-white text-lg">Unable to load video</p>
                </div>
            )}

            {/* YouTube iframe */}
            <iframe
                className={`${bool ? "w-full h-screen object-cover" : "w-screen aspect-video"}`}
                src={`https://www.youtube.com/embed/${trailerMovie?.key}?si=HorxQfzFY2_TAO1W&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${trailerMovie?.key}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={handleIframeLoad}
                onError={handleIframeError}
            ></iframe>

            {/* Overlay to prevent interaction with the video */}
            <div className="absolute inset-0 pointer-events-none"></div>
        </div>
    )
}

export default VideoBackground