import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { OMDB_API_KEY, OMDB_BASE_URL } from '../utils/constant';
import MovieCard from './MovieCard';
import Header from './Header';
import Footer from './Footer';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import { MdError } from 'react-icons/md';

const SearchResults = () => {
    const location = useLocation();
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get search query from URL
    const query = new URLSearchParams(location.search).get('q');

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query) {
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${query}&type=movie`);

                if (response.data && response.data.Response === 'True') {
                    // Transform data format to match our app's structure
                    const formattedResults = response.data.Search.map(movie => ({
                        id: movie.imdbID,
                        title: movie.Title,
                        poster_path: movie.Poster !== 'N/A' ? movie.Poster : null,
                        overview: `${movie.Title} (${movie.Year})`,
                        year: movie.Year,
                        rating: movie.imdbRating
                    }));

                    setSearchResults(formattedResults);
                } else {
                    setError(response.data?.Error || 'No results found');
                    setSearchResults([]);
                }
            } catch (err) {
                console.error('Search error:', err);
                setError('Failed to search movies');
                setSearchResults([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    return (
        <div className="min-h-screen bg-black">
            <Header />

            <main className="pt-24 px-4 sm:px-8 md:px-12 max-w-[1800px] mx-auto">
                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-6 flex items-center">
                    {loading ? (
                        <>
                            <FaSpinner className="animate-spin mr-3 text-red-600" />
                            <span>Searching...</span>
                        </>
                    ) : (
                        <>
                            <FaSearch className="mr-3 text-red-600" />
                            <span>Results for "{query}"</span>
                        </>
                    )}
                </h1>

                {error && (
                    <div className="bg-gray-900 rounded-lg p-6 mb-8 text-center">
                        <MdError className="text-red-600 text-5xl mx-auto mb-4" />
                        <p className="text-red-500 text-xl mb-2">{error}</p>
                        <p className="text-gray-400">Try searching for a different movie title</p>
                    </div>
                )}

                {!loading && !error && searchResults.length === 0 && (
                    <div className="bg-gray-900 rounded-lg p-6 mb-8 text-center">
                        <FaSearch className="text-gray-600 text-5xl mx-auto mb-4" />
                        <p className="text-white text-xl mb-2">No movies found for "{query}"</p>
                        <p className="text-gray-400">Try checking your spelling or using different keywords</p>
                    </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                    {searchResults.map(movie => (
                        <div key={movie.id} className="flex justify-center">
                            <MovieCard
                                movieId={movie.id}
                                posterPath={movie.poster_path}
                                title={movie.title}
                                rating={movie.rating}
                            />
                        </div>
                    ))}
                </div>

                {/* Loading skeleton */}
                {loading && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                        {[...Array(12)].map((_, index) => (
                            <div key={index} className="animate-pulse bg-gray-800 rounded-md h-64 sm:h-72 md:h-80"></div>
                        ))}
                    </div>
                )}
            </main>

           
        </div>
    );
};

export default SearchResults; 