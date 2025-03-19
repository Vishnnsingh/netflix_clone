import React, { useEffect, useState } from 'react';
import Header from './Header';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';
import { mockMovies } from '../utils/mockData';
import Footer from './Footer';
import { FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { OMDB_API_KEY, OMDB_BASE_URL } from '../utils/constant';

const NewAndPopular = () => {
    const [initialLoading, setInitialLoading] = useState(true);
    const [trendingContent, setTrendingContent] = useState([]);
    const [newReleases, setNewReleases] = useState([]);

    // Get now playing movies from Redux store with fallback to mock data
    const nowPlayingMovies = useSelector(store => store.movie?.nowPlayingMovies) || mockMovies.nowPlayingMovies;

    // Fetch trending and new content
    useEffect(() => {
        const fetchContent = async () => {
            try {
                // Trending content search terms
                const trendingSearchTerms = ["2023", "award winning", "blockbuster"];
                // New releases search terms (using current year)
                const currentYear = new Date().getFullYear();
                const newReleasesSearchTerms = ["new release", "premiere", "debut"];

                const trending = [];
                const newContent = [];

                // Fetch trending content
                for (const term of trendingSearchTerms) {
                    try {
                        const res = await axios.get(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${term}&y=2023`);
                        if (res.data && res.data.Response === "True" && res.data.Search) {
                            const content = res.data.Search.map((item, index) => ({
                                id: item.imdbID || `trending-${index}`,
                                title: item.Title,
                                poster_path: item.Poster !== "N/A" ? item.Poster : null,
                                overview: `${item.Title} (${item.Year})`,
                                year: item.Year,
                                type: item.Type
                            }));
                            trending.push(...content);
                        }
                    } catch (error) {
                        console.error(`Error fetching trending content for term "${term}":`, error);
                    }
                }

                // Fetch new releases
                for (const term of newReleasesSearchTerms) {
                    try {
                        const res = await axios.get(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${term}&y=${currentYear}`);
                        if (res.data && res.data.Response === "True" && res.data.Search) {
                            const content = res.data.Search.map((item, index) => ({
                                id: item.imdbID || `new-${index}`,
                                title: item.Title,
                                poster_path: item.Poster !== "N/A" ? item.Poster : null,
                                overview: `${item.Title} (${item.Year})`,
                                year: item.Year,
                                type: item.Type
                            }));
                            newContent.push(...content);
                        }
                    } catch (error) {
                        console.error(`Error fetching new releases for term "${term}":`, error);
                    }
                }

                setTrendingContent(trending);
                setNewReleases(newContent);
            } catch (error) {
                console.error("Error fetching content:", error);
            } finally {
                setInitialLoading(false);
            }
        };

        fetchContent();
        window.scrollTo(0, 0);
    }, []);

    // Show loading spinner during initial load
    if (initialLoading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center">
                <FaSpinner className="animate-spin text-red-600 text-5xl mb-4" />
                <p className="text-white text-xl">Discovering what's hot right now...</p>
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
                    src="https://wallpaperaccess.com/full/1076854.jpg"
                    alt="New & Popular Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-1/2 left-12 transform -translate-y-1/2 z-20 max-w-xl text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">New & Popular</h1>
                    <p className="text-lg md:text-xl mb-6">
                        Stay up to date with the latest releases and trending content that everyone's talking about.
                    </p>
                </div>
            </div>

            {/* Content Lists */}
            <div className="relative z-10 pb-16 -mt-20">
                <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-8 md:space-y-12">
                        <MovieList title="Trending Now" movies={trendingContent} />
                        <MovieList title="New Releases" movies={newReleases} />
                        <MovieList title="Now Playing" movies={nowPlayingMovies} />
                    </div>
                </div>
            </div>

         
        </div>
    );
};

export default NewAndPopular; 