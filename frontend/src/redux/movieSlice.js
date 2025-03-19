import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        nowPlayingMovies: null,
        popularMovies: null,
        topRatedMovies: null,
        upcomingMovies: null,
        trailerMovie: null,
        movieId: null,
        open: false,
    },
    reducers: {
        getNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        getPopularMovie: (state, action) => {
            state.popularMovies = action.payload;
        },
        getTopRatedMovie: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        getUpcomingMovie: (state, action) => {
            state.upcomingMovies = action.payload;
        },
        getTrailerMovie: (state, action) => {
            state.trailerMovie = action.payload;
        },
        getId: (state, action) => {
            state.movieId = action.payload;
        },
        setOpen: (state, action) => {
            state.open = action.payload;
        }
    }
});

export const {
    getNowPlayingMovies,
    getPopularMovie,
    getTopRatedMovie,
    getUpcomingMovie,
    getTrailerMovie,
    getId,
    setOpen
} = movieSlice.actions;

export default movieSlice.reducer; 