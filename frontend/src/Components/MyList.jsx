import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useSelector } from 'react-redux';
import Footer from './Footer';
import { FaSpinner } from 'react-icons/fa';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';

const MyList = () => {
    const [initialLoading, setInitialLoading] = useState(true);

    // Get my list from Redux store
    const myList = useSelector(state => state.myList.items);

    useEffect(() => {
        // Simulate loading for a smoother transition
        const timer = setTimeout(() => {
            setInitialLoading(false);
        }, 800);

        window.scrollTo(0, 0);

        return () => clearTimeout(timer);
    }, []);

    // Show loading spinner during initial load
    if (initialLoading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center">
                <FaSpinner className="animate-spin text-red-600 text-5xl mb-4" />
                <p className="text-white text-xl">Loading your list...</p>
            </div>
        );
    }

    return (
        <div className="relative bg-black min-h-screen">
            <Header />

            {/* Hero Banner */}
            <div className="w-full h-[40vh] relative">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">My List</h1>
                </div>
            </div>

            {/* My List Content */}
            <div className="relative z-10 pb-16 -mt-20">
                <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
                    {myList.length > 0 ? (
                        <div>
                            <h2 className="text-white text-2xl font-bold mb-6">Your Saved Titles</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                                {myList.map((item) => (
                                    <div key={item.id} className="transition-transform duration-300">
                                        <MovieCard
                                            movieId={item.id}
                                            posterPath={item.poster_path}
                                            title={item.title}
                                            overview={item.overview}
                                            year={item.year}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <h2 className="text-white text-2xl font-bold mb-4">Your list is empty</h2>
                            <p className="text-gray-400 mb-8">Add movies and TV shows to your list by clicking the + button on any title</p>
                            <Link
                                to="/browse"
                                className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
                            >
                                Browse Content
                            </Link>
                        </div>
                    )}
                </div>
            </div>

         
        </div>
    );
};

export default MyList; 