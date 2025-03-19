import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { OMDB_API_KEY, OMDB_BASE_URL } from '../utils/constant';
import Header from './Header';
import { IoPlay } from 'react-icons/io5';
import { BiInfoCircle } from 'react-icons/bi';
import VideoBackground from './VideoBackground';
import Footer from './Footer';
import netflixIcon from '../assets/netflix-icon.png';
import TrailerModal from './TrailerModal';

const MovieDetails = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (!movieId) return;

            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${movieId}&plot=full`
                );

                if (response.data && response.data.Response === 'True') {
                    setMovie(response.data);
                } else {
                    setError(response.data?.Error || 'Movie details not found');
                }
            } catch (err) {
                console.error('Error fetching movie details:', err);
                setError('Failed to load movie details');
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    // Handle play button click
    const handlePlayClick = () => {
        setShowTrailer(true);
    };

    // Close trailer modal
    const closeTrailer = () => {
        setShowTrailer(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black">
                <Header />
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-pulse h-32 w-32 rounded-full bg-red-600"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black">
                <Header />
                <div className="pt-24 px-8 text-white">
                    <h1 className="text-3xl mb-4">Error</h1>
                    <p className="text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="min-h-screen bg-black">
                <Header />
                <div className="pt-24 px-8 text-white">
                    <h1 className="text-3xl mb-4">Movie Not Found</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <Header />

            {/* Hero Section with Video Background */}
            <div className="relative">
                <VideoBackground movieId={movieId} bool={true} />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>

                {/* Content overlay */}
                <div className="absolute inset-0 flex items-center px-12">
                    <div className="w-1/2">
                        <h1 className="text-white text-5xl font-bold mb-4">{movie.Title}</h1>
                        <div className="flex items-center mb-4 text-gray-400">
                            <span className="mr-3">{movie.Year}</span>
                            <span className="mr-3 border px-1 text-xs">{movie.Rated}</span>
                            <span>{movie.Runtime}</span>
                        </div>
                        <p className="text-white text-lg mb-6 line-clamp-3">{movie.Plot}</p>
                        <div className="flex space-x-4 mb-6">
                            <button
                                onClick={handlePlayClick}
                                className="flex items-center justify-center bg-white text-black py-2 px-6 rounded-md font-bold hover:bg-opacity-80"
                            >
                                <IoPlay className="mr-2 text-xl" /> Play
                            </button>
                            <button className="flex items-center justify-center bg-gray-600 bg-opacity-70 text-white py-2 px-6 rounded-md font-bold hover:bg-opacity-90">
                                <BiInfoCircle className="mr-2 text-xl" /> More Info
                            </button>
                        </div>

                        <div className="text-white">
                            <p><span className="text-gray-400">Cast:</span> {movie.Actors}</p>
                            <p><span className="text-gray-400">Director:</span> {movie.Director}</p>
                            <p><span className="text-gray-400">Genre:</span> {movie.Genre}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Movie Details Section */}
            <div className="px-12 py-8 text-white mt-[30vh]">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                        <img
                            src={movie.Poster !== 'N/A' ? movie.Poster : netflixIcon}
                            alt={movie.Title}
                            className="w-full rounded-md shadow-lg"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = netflixIcon;
                            }}
                        />
                    </div>

                    <div className="md:w-2/3">
                        <h2 className="text-3xl font-bold mb-4">About {movie.Title}</h2>
                        <p className="mb-6">{movie.Plot}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p><span className="text-gray-400">Released:</span> {movie.Released}</p>
                                <p><span className="text-gray-400">Runtime:</span> {movie.Runtime}</p>
                                <p><span className="text-gray-400">Rated:</span> {movie.Rated}</p>
                                <p><span className="text-gray-400">Genre:</span> {movie.Genre}</p>
                            </div>

                            <div>
                                <p><span className="text-gray-400">Director:</span> {movie.Director}</p>
                                <p><span className="text-gray-400">Writer:</span> {movie.Writer}</p>
                                <p><span className="text-gray-400">Actors:</span> {movie.Actors}</p>
                                <p><span className="text-gray-400">Language:</span> {movie.Language}</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-xl font-bold mb-2">Ratings</h3>
                            <div className="flex flex-wrap gap-4">
                                {movie.Ratings && movie.Ratings.map((rating, index) => (
                                    <div key={index} className="bg-gray-800 p-3 rounded-md">
                                        <p className="font-bold">{rating.Source}</p>
                                        <p>{rating.Value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           

            {/* Trailer Modal */}
            {showTrailer && (
                <TrailerModal
                    movieId={movieId}
                    title={movie.Title}
                    onClose={closeTrailer}
                />
            )}
        </div>
    );
};

export default MovieDetails; 