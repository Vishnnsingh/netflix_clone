import React, { useState, useEffect } from 'react'
import { OMDB_API_KEY } from '../utils/constant'
import { Link } from 'react-router-dom'
import { IoPlay } from 'react-icons/io5'
import { BiInfoCircle } from 'react-icons/bi'
import { AiFillStar } from 'react-icons/ai'
import { MdAdd, MdCheck } from 'react-icons/md'
import netflixIcon from '../assets/netflix-icon.png'
import { useDispatch, useSelector } from 'react-redux'
import { addToMyList, removeFromMyList } from '../redux/myListSlice'
import { toast } from 'react-hot-toast'
import TrailerModal from './TrailerModal'

/**
 * MovieCard Component - Displays individual movie cards with hover effects and actions
 * Developed by Sunny Kumar
 * Features:
 * - Interactive hover effects showing movie details
 * - Add/Remove from My List functionality
 * - Play trailer functionality
 * - Fallback image handling
 * - Responsive design for different screen sizes
 */
const MovieCard = ({ movieId, posterPath, title, rating, overview, year }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [showTrailer, setShowTrailer] = useState(false);
    const dispatch = useDispatch();

    // Get my list from Redux store
    const myList = useSelector(state => state.myList.items);
    const isInMyList = myList.some(item => item.id === movieId);

    // Ensure movieId is treated as a string
    const movieIdString = movieId ? String(movieId) : '';

    // Use title if provided, otherwise use ID as fallback
    const displayTitle = title || movieIdString;

    /**
     * Sets up the image source with proper error handling
     * Falls back to Netflix icon if poster path is invalid or unavailable
     */
    useEffect(() => {
        // Check if poster path is valid
        if (posterPath && posterPath !== "N/A") {
            if (posterPath.includes('http')) {
                setImageSrc(posterPath);
            } else {
                setImageSrc(netflixIcon);
                setImageLoaded(true); // Consider already loaded if using fallback
            }
        } else {
            setImageSrc(netflixIcon);
            setImageLoaded(true); // Consider already loaded if using fallback
        }
    }, [posterPath]);

    // Handle fallback image if poster is not available
    const handleImageError = (e) => {
        e.target.onerror = null; // Prevent infinite error loop
        e.target.src = netflixIcon; // Fallback to Netflix icon
        setImageError(true);
        setImageLoaded(true); // Consider the fallback as loaded
    };

    // Handle image load complete
    const handleImageLoaded = () => {
        setImageLoaded(true);
    };

    /**
     * Preloads the movie poster image to prevent flickering
     * Falls back to Netflix icon if the image fails to load
     */
    useEffect(() => {
        if (imageSrc && imageSrc !== netflixIcon) {
            const img = new Image();
            img.src = imageSrc;
            img.onload = handleImageLoaded;
            img.onerror = () => {
                setImageSrc(netflixIcon);
                setImageError(true);
                setImageLoaded(true);
            };
        }
    }, [imageSrc]);

    /**
     * Handles adding or removing a movie from the user's list
     * Dispatches Redux actions and shows toast notifications
     */
    const handleMyListClick = (e) => {
        e.preventDefault(); // Prevent navigation
        e.stopPropagation(); // Prevent event bubbling

        const movie = {
            id: movieId,
            title: displayTitle,
            poster_path: posterPath,
            overview: overview || `${displayTitle} (${year || 'N/A'})`,
            year: year
        };

        if (isInMyList) {
            dispatch(removeFromMyList(movieId));
            toast.success(`Removed "${displayTitle}" from My List`);
        } else {
            dispatch(addToMyList(movie));
            toast.success(`Added "${displayTitle}" to My List`);
        }
    };

    // Handle play button click
    const handlePlayClick = (e) => {
        e.preventDefault(); // Prevent navigation
        setShowTrailer(true);
    };

    // Close trailer modal
    const closeTrailer = () => {
        setShowTrailer(false);
    };

    /**
     * Renders the movie card with hover effects, loading states, and interactive elements
     * Includes skeleton loader, poster image, and hover overlay with action buttons
     */
    return (
        <>
            <div
                className="relative w-36 sm:w-40 md:w-48 transition-all duration-300 ease-in-out rounded-md overflow-hidden shadow-lg"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    zIndex: isHovered ? 30 : 0
                }}
            >
                {/* Skeleton loader - always visible until image loads */}
                <div className={`absolute inset-0 bg-gray-800 flex items-center justify-center transition-opacity duration-300 ${imageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                </div>

                <Link to={"/browse/" + movieIdString} className="block h-52 sm:h-60 md:h-72 bg-gray-900">
                    {imageSrc && (
                        <img
                            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            src={imageSrc}
                            alt={displayTitle}
                            loading="lazy"
                            onError={handleImageError}
                            onLoad={handleImageLoaded}
                        />
                    )}
                </Link>

                {/* Add to My List button - only visible when hovered */}
                {isHovered && (
                    <button
                        onClick={handleMyListClick}
                        className="absolute top-2 right-2 bg-black bg-opacity-70 text-white rounded-full p-1 z-30 transition-transform duration-300 hover:scale-110"
                        aria-label={isInMyList ? "Remove from My List" : "Add to My List"}
                    >
                        {isInMyList ? <MdCheck className="text-lg" /> : <MdAdd className="text-lg" />}
                    </button>
                )}

                {/* Hover overlay - only visible when this specific card is hovered */}
                {isHovered && (
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end p-3 transition-opacity duration-300"
                    >
                        <h3 className="text-white font-bold truncate mb-1 text-sm sm:text-base">
                            {displayTitle}
                        </h3>

                        {rating && (
                            <div className="flex items-center mb-2 text-xs sm:text-sm">
                                <AiFillStar className="text-yellow-500 mr-1" />
                                <span className="text-white">{rating}</span>
                            </div>
                        )}

                        <div className="flex space-x-2 mb-1">
                            <button
                                onClick={handlePlayClick}
                                className="bg-white text-black rounded-full p-1.5 sm:p-2 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors duration-300"
                                aria-label="Play Trailer"
                            >
                                <IoPlay className="text-sm sm:text-lg" />
                            </button>
                            <Link
                                to={"/browse/" + movieIdString}
                                className="border border-white text-white rounded-full p-1.5 sm:p-2 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300"
                                aria-label="More info"
                            >
                                <BiInfoCircle className="text-sm sm:text-lg" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Trailer Modal */}
            {showTrailer && (
                <TrailerModal
                    movieId={movieId}
                    title={displayTitle}
                    onClose={closeTrailer}
                />
            )}
        </>
    )
}

export default MovieCard