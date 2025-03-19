import React, { useRef, useState, useEffect, useMemo } from 'react'
import MovieCard from './MovieCard'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

/**
 * MovieList Component - Displays a horizontal scrollable list of movies with navigation controls
 * Developed by Sunny Kumar
 * Features:
 * - Horizontal scrolling with left/right navigation
 * - Responsive design for different screen sizes
 * - Loading skeleton while content is being fetched
 * - Smooth scrolling animation
 */
const MovieList = ({ title, movies, searchMovie = false }) => {
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const sliderRef = useRef(null);

    // Memoize the movies to prevent unnecessary re-renders
    const memoizedMovies = useMemo(() => movies || [], [movies]);

    // Check if movies are loaded
    useEffect(() => {
        if (memoizedMovies && memoizedMovies.length > 0) {
            // Add a small delay to ensure smooth transition
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [memoizedMovies]);

    /**
     * Checks the scroll position of the container and updates the state
     * to determine if the left/right navigation buttons should be enabled
     */
    const checkScrollPosition = () => {
        const container = sliderRef.current;
        if (!container) return;

        // Check if we can scroll left
        setCanScrollLeft(container.scrollLeft > 20);

        // Check if we can scroll right
        setCanScrollRight(
            container.scrollLeft < container.scrollWidth - container.clientWidth - 20
        );
    };

    useEffect(() => {
        const container = sliderRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollPosition);
            // Initial check
            checkScrollPosition();

            // Force a check after a short delay to ensure accurate initial state
            setTimeout(() => {
                checkScrollPosition();
            }, 500);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', checkScrollPosition);
            }
        };
    }, [memoizedMovies]);

    /**
     * Renders a loading skeleton UI while the movie data is being fetched
     * Shows placeholder cards with loading spinners
     */
    const renderSkeleton = () => {
        return Array(6).fill(0).map((_, index) => (
            <div
                key={`skeleton-${index}`}
                className="flex-shrink-0 w-36 sm:w-40 md:w-48 h-52 sm:h-60 md:h-72 bg-gray-800 rounded-md overflow-hidden"
            >
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-gray-700 border-t-red-600 rounded-full animate-spin"></div>
                </div>
            </div>
        ));
    };

    // If movies is undefined or null, show a placeholder
    if (!memoizedMovies || memoizedMovies.length === 0) {
        return (
            <div className='px-4 sm:px-6 mb-12'>
                <h1 className={`${searchMovie ? "text-black" : "text-white"} text-2xl sm:text-3xl py-3 font-bold`}>{title}</h1>
                <div className='flex overflow-x-auto no-scrollbar pb-8 pt-2 gap-4'>
                    {renderSkeleton()}
                </div>
            </div>
        );
    }

    /**
     * Handles the scrolling logic when navigation buttons are clicked
     * Scrolls the container left or right by a fixed amount
     * @param {string} direction - The direction to scroll ('left' or 'right')
     */
    const slide = (direction) => {
        const container = sliderRef.current;
        if (!container) return;

        // Calculate card width (approximate)
        const cardWidth = 200; // Approximate width of a card including gap
        const scrollAmount = direction === 'left'
            ? container.scrollLeft - (cardWidth * 3) // Scroll 3 cards left
            : container.scrollLeft + (cardWidth * 3); // Scroll 3 cards right

        container.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });

        // Update scroll buttons after animation completes
        setTimeout(() => {
            checkScrollPosition();
        }, 500);
    };

    return (
        <div className='mb-12 relative'>
            <h1 className={`${searchMovie ? "text-black" : "text-white"} text-2xl sm:text-3xl py-3 font-bold px-4 sm:px-0`}>{title}</h1>

                      {/* Navigation Controls Container */}
                        <div className="relative mx-8">
                            {/* Left Arrow - Hidden on mobile, visible on medium screens and up */}
                            <button
                                className="hidden md:block absolute -left-8 top-1/2 transform -translate-y-1/2 z-30 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-colors duration-300"
                                onClick={() => slide('left')}
                                aria-label="Scroll left"
                                style={{ opacity: canScrollLeft ? 1 : 0.5 }}
                                disabled={!canScrollLeft}
                            >
                                <IoIosArrowBack size={24} />
                            </button>
            
                            {/* Right Arrow - Hidden on mobile, visible on medium screens and up */}
                            <button
                                className="hidden md:block absolute -right-8 top-1/2 transform -translate-y-1/2 z-30 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-colors duration-300"
                                onClick={() => slide('right')}
                                aria-label="Scroll right"
                                style={{ opacity: canScrollRight ? 1 : 0.5 }}
                                disabled={!canScrollRight}
                            >
                                <IoIosArrowForward size={24} />
                            </button>
                {/* 
                 * Horizontal scrollable container for movie cards
                 * Uses custom scrollbar hiding and smooth scrolling behavior
                 * Displays either loading skeletons or movie cards based on loading state
                 */}
                <div
                    ref={sliderRef}
                    className='flex overflow-x-auto no-scrollbar pb-8 pt-2 scroll-smooth gap-4 px-1'
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch'
                    }}
                >
                    {isLoading ? renderSkeleton() :
                        memoizedMovies.map((movie) => (
                            <div
                                key={movie.id || `movie-${Math.random()}`}
                                className="flex-shrink-0 transition-transform duration-300 hover:z-10"
                            >
                                <MovieCard
                                    movieId={movie.id}
                                    posterPath={movie.poster_path}
                                    title={movie.title}
                                    rating={movie.vote_average}
                                    overview={movie.overview}
                                    year={movie.year}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default MovieList