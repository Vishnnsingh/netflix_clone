import React, { useEffect, useState } from 'react';
import Header from './Header';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';
import { mockMovies } from '../utils/mockData';
import Footer from './Footer';
import { FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { OMDB_API_KEY, OMDB_BASE_URL } from '../utils/constant';

const TVShows = () => {
    const [initialLoading, setInitialLoading] = useState(true);
    const [tvShows, setTvShows] = useState([]);
    const [popularTVShows, setPopularTVShows] = useState([]);
    const [topRatedTVShows, setTopRatedTVShows] = useState([]);

    // Fetch TV shows data
    useEffect(() => {
        const fetchTVShows = async () => {
            try {
                // Popular TV shows search terms
                const popularSearchTerms = ["game of thrones", "stranger things", "breaking bad"];
                const topRatedSearchTerms = ["the wire", "sopranos", "true detective"];

                const popularShows = [];
                const topRatedShows = [];

                // Fetch popular TV shows
                for (const term of popularSearchTerms) {
                    try {
                        const res = await axios.get(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${term}&type=series`);
                        if (res.data && res.data.Response === "True" && res.data.Search) {
                            const shows = res.data.Search.map((show, index) => ({
                                id: show.imdbID || `tv-popular-${index}`,
                                title: show.Title,
                                poster_path: show.Poster !== "N/A" ? show.Poster : null,
                                overview: `${show.Title} (${show.Year})`,
                                year: show.Year
                            }));
                            popularShows.push(...shows);
                        }
                    } catch (error) {
                        console.error(`Error fetching popular TV shows for term "${term}":`, error);
                    }
                }

                // Fetch top rated TV shows
                for (const term of topRatedSearchTerms) {
                    try {
                        const res = await axios.get(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${term}&type=series`);
                        if (res.data && res.data.Response === "True" && res.data.Search) {
                            const shows = res.data.Search.map((show, index) => ({
                                id: show.imdbID || `tv-toprated-${index}`,
                                title: show.Title,
                                poster_path: show.Poster !== "N/A" ? show.Poster : null,
                                overview: `${show.Title} (${show.Year})`,
                                year: show.Year
                            }));
                            topRatedShows.push(...shows);
                        }
                    } catch (error) {
                        console.error(`Error fetching top rated TV shows for term "${term}":`, error);
                    }
                }

                setPopularTVShows(popularShows);
                setTopRatedTVShows(topRatedShows);
                setTvShows([...popularShows, ...topRatedShows]);
            } catch (error) {
                console.error("Error fetching TV shows:", error);
            } finally {
                setInitialLoading(false);
            }
        };

        fetchTVShows();
        window.scrollTo(0, 0);
    }, []);

    // Show loading spinner during initial load
    if (initialLoading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center">
                <FaSpinner className="animate-spin text-red-600 text-5xl mb-4" />
                <p className="text-white text-xl">Loading TV shows for you...</p>
            </div>
        );
    }

    return (
        <div className="relative bg-black min-h-screen">
            <Header />

            {/* Hero Banner */}
            <div className="w-full h-[80vh] relative">
                <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
                <img
                    src="https://wallpapercave.com/wp/wp4056410.jpg"
                    alt="TV Shows Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-1/2 left-12 transform -translate-y-1/2 z-20 max-w-xl text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">TV Shows</h1>
                    <p className="text-lg md:text-xl mb-6">
                        Discover the best TV series from around the world. Binge-worthy dramas, comedies, and more.
                    </p>
                </div>
            </div>

            {/* TV Shows Lists */}
            <div className="relative z-10 pb-16 -mt-20">
                <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-8 md:space-y-12">
                        <MovieList title="Popular TV Shows" movies={popularTVShows} />
                        <MovieList title="Top Rated TV Shows" movies={topRatedTVShows} />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TVShows; 